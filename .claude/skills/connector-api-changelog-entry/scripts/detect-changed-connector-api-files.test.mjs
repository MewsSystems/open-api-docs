// Tests for detect-changed-connector-api-files.mjs. No dependencies and no runner config:
//
//   node --test .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.test.mjs
//
// Every case here corresponds to a bug that reached review at least once, so treat a failure as a
// regression rather than a style disagreement. Each test builds a throwaway git repository shaped
// like this one — connector-api/operations, connector-api/_generator, and a .github/ directory to
// escape into — and runs the script inside it.
//
// The script is always invoked through execFileSync, whose stdout is a pipe. That is deliberate:
// stdout is asynchronous on a pipe but synchronous to a file, and an earlier revision truncated at
// the 64 KB pipe buffer while looking perfectly correct when redirected to a file.

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, openSync, closeSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'detect-changed-connector-api-files.mjs');
const MAX_BUFFER = 512 * 1024 * 1024;
const repos = [];

after(() => {
  for (const dir of repos) rmSync(dir, { recursive: true, force: true });
});

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: MAX_BUFFER });
}

function write(dir, relativePath, contents) {
  writeFileSync(join(dir, relativePath), contents);
}

// A file large enough that its diff cannot fit in a single pipe buffer.
function bigContents(marker) {
  return `${Array.from({ length: 3000 }, (_, i) => `line ${i} ${marker}`).join('\n')}\n`;
}

function makeRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'detect-connector-api-'));
  repos.push(dir);
  git(dir, ['init', '-q', '-b', 'main']);
  git(dir, ['config', 'user.email', 'test@example.com']);
  git(dir, ['config', 'user.name', 'Test']);
  git(dir, ['config', 'commit.gpgsign', 'false']);
  mkdirSync(join(dir, 'connector-api/operations'), { recursive: true });
  mkdirSync(join(dir, 'connector-api/_generator'), { recursive: true });
  mkdirSync(join(dir, '.github/workflows'), { recursive: true });
  write(dir, 'connector-api/operations/reservations.md', 'original\n');
  write(dir, 'connector-api/operations/bills.md', 'original\n');
  write(dir, 'connector-api/_generator/types.yaml', 'original\n');
  write(dir, '.github/workflows/ci.yml', 'original\n');
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-qm', 'base']);
  return dir;
}

function run(cwd, args = []) {
  const stdout = execFileSync(process.execPath, [SCRIPT, ...args], {
    cwd,
    encoding: 'utf8',
    maxBuffer: MAX_BUFFER,
  });
  return stdout;
}

function runExpectingFailure(cwd, args) {
  try {
    const stdout = run(cwd, args);
    assert.fail(`expected a non-zero exit, got:\n${stdout}`);
  } catch (error) {
    assert.equal(error.status, 1, `expected exit 1, got ${error.status}: ${error.stderr ?? error.message}`);
    return error.stderr ?? '';
  }
}

function lines(stdout) {
  return stdout.split('\n').filter(Boolean);
}

test('--no-diff lists changed connector-api files and nothing else', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');
  write(dir, 'connector-api/_generator/types.yaml', 'changed\n');
  write(dir, '.github/workflows/ci.yml', 'changed\n');

  assert.deepEqual(lines(run(dir, ['--no-diff'])), ['connector-api/operations/reservations.md']);
});

test('untracked pages are invisible until staged', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/resourcecategories.md', 'brand new page\n');

  // git diff does not see untracked files. This is why the workflow stages before invoking the
  // agent: a new OpenAPI tag produces a new page, which is the most changelog-worthy change there is.
  assert.deepEqual(lines(run(dir, ['--no-diff'])), []);

  git(dir, ['add', '-A', '--', 'connector-api/']);
  assert.deepEqual(lines(run(dir, ['--no-diff'])), ['connector-api/operations/resourcecategories.md']);
});

test('--path narrows the output, in both spellings', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');
  write(dir, 'connector-api/operations/bills.md', 'changed\n');

  assert.deepEqual(lines(run(dir, ['--path', 'connector-api/operations/bills.md', '--no-diff'])), [
    'connector-api/operations/bills.md',
  ]);
  assert.deepEqual(lines(run(dir, ['--path=connector-api/operations/bills.md', '--no-diff'])), [
    'connector-api/operations/bills.md',
  ]);
});

test('--path is repeatable', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');
  write(dir, 'connector-api/operations/bills.md', 'changed\n');

  const args = [
    '--path',
    'connector-api/operations/bills.md',
    '--path',
    'connector-api/operations/reservations.md',
    '--no-diff',
  ];
  assert.deepEqual(lines(run(dir, args)), [
    'connector-api/operations/bills.md',
    'connector-api/operations/reservations.md',
  ]);
});

test('--path rejects traversal out of connector-api', () => {
  const dir = makeRepo();
  write(dir, '.github/workflows/ci.yml', 'changed\n');

  const stderr = runExpectingFailure(dir, ['--path', 'connector-api/../.github/workflows', '--no-diff']);
  assert.match(stderr, /must be under connector-api\//);
});

test('--path rejects an absolute path', () => {
  const dir = makeRepo();
  const stderr = runExpectingFailure(dir, ['--path', '/etc', '--no-diff']);
  assert.match(stderr, /must be under connector-api\//);
});

test('a --path value containing a newline stays one path and cannot escape', () => {
  const dir = makeRepo();
  write(dir, '.github/workflows/ci.yml', 'changed\n');
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');

  // Under the previous shell implementation this split into two pathspecs, only the first validated.
  const stdout = run(dir, ['--path', 'connector-api/operations\n.github/workflows', '--no-diff']);
  assert.equal(stdout.includes('.github'), false, 'must not reach .github');
  assert.deepEqual(lines(stdout), []);
});

test('--path cannot reach into the excluded _generator directory', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/_generator/types.yaml', 'changed\n');
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');

  assert.deepEqual(lines(run(dir, ['--path', 'connector-api/_generator/types.yaml', '--no-diff'])), []);
});

test('git pathspec globbing still works inside the scope', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/reservations.md', 'changed\n');
  write(dir, 'connector-api/operations/bills.md', 'changed\n');

  assert.deepEqual(lines(run(dir, ['--path', 'connector-api/operations/*.md', '--no-diff'])), [
    'connector-api/operations/bills.md',
    'connector-api/operations/reservations.md',
  ]);
});

test('--path does not switch the comparison base', () => {
  const dir = makeRepo();
  git(dir, ['checkout', '-q', '-b', 'feature']);
  write(dir, 'connector-api/operations/bills.md', 'committed on the branch\n');
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-qm', 'branch change']);
  // A local change exists somewhere in connector-api/, so local wins for every --path...
  write(dir, 'connector-api/operations/reservations.md', 'local change\n');

  // ...including a path whose only change is on the branch. Deciding per path would answer this
  // from BASE_REF...HEAD and report bills.md, mixing two comparison bases across successive calls.
  assert.deepEqual(lines(run(dir, ['--path', 'connector-api/operations/bills.md', '--no-diff'])), []);
  assert.deepEqual(lines(run(dir, ['--no-diff'])), ['connector-api/operations/reservations.md']);
});

test('falls back to the branch diff when the tree is clean', () => {
  const dir = makeRepo();
  git(dir, ['checkout', '-q', '-b', 'feature']);
  write(dir, 'connector-api/operations/bills.md', 'committed on the branch\n');
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-qm', 'branch change']);

  assert.deepEqual(lines(run(dir, ['--no-diff', 'main'])), ['connector-api/operations/bills.md']);
});

test('a full diff is not truncated when read through a pipe', () => {
  const dir = makeRepo();
  write(dir, 'connector-api/operations/reservations.md', bigContents('original'));
  write(dir, 'connector-api/operations/bills.md', bigContents('original'));
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-qm', 'big base']);
  write(dir, 'connector-api/operations/reservations.md', bigContents('CHANGED'));
  write(dir, 'connector-api/operations/bills.md', bigContents('CHANGED'));

  const piped = run(dir, []);
  assert.ok(
    piped.length > 64 * 1024,
    `fixture must exceed one 64 KB pipe buffer to be meaningful, got ${piped.length} bytes`,
  );

  // stdout is synchronous to a file, so this is the uncorrupted reference to compare against.
  const referencePath = join(dir, 'reference.diff');
  const fd = openSync(referencePath, 'w');
  try {
    execFileSync(process.execPath, [SCRIPT], { cwd: dir, stdio: ['ignore', fd, 'pipe'] });
  } finally {
    closeSync(fd);
  }

  assert.equal(piped, readFileSync(referencePath, 'utf8'));
  assert.match(piped.trimEnd().split('\n').at(-1), /line 2999 CHANGED$/);
});

test('a missing --path value, unknown options and a second base ref are all rejected', () => {
  const dir = makeRepo();

  assert.match(runExpectingFailure(dir, ['--path']), /--path requires a value/);
  assert.match(runExpectingFailure(dir, ['--bogus']), /Unknown option: --bogus/);
  assert.match(runExpectingFailure(dir, ['main', 'HEAD']), /Unexpected argument: HEAD/);
});

test('an unknown base ref is reported rather than silently returning nothing', () => {
  const dir = makeRepo();
  assert.match(runExpectingFailure(dir, ['no-such-ref']), /Base ref not found: no-such-ref/);
});

test('--help prints usage and exits zero', () => {
  const dir = makeRepo();
  assert.match(run(dir, ['--help']), /^Usage: node detect-changed-connector-api-files\.mjs/);
});
