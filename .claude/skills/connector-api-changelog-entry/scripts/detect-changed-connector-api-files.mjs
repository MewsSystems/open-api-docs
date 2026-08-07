// Print changes to connector-api/ between the current state and a base ref.
//
// Run as `node <this file>`. There is deliberately no shebang and no executable bit: one invocation
// form means callers that allowlist a literal command need to grant exactly one string.
//
// This was POSIX sh until three review rounds found the same class of bug: --path values escaped
// their containment check through shell mechanics rather than through the check itself — git's
// normalization of '..', pathspec glob expansion, and field splitting on the newline that stood in
// for an array POSIX sh does not have. Each fix was another pattern arm guarding a symptom.
//
// Node removes the class instead: execFileSync passes argv directly with no shell, so there is no
// field splitting and no globbing to guard, and resolving a path against the scope root is a
// stronger check than any number of arms. Node is already required to work in this repository —
// see connector-api/_generator — so this adds no dependency.

import { execFileSync } from 'node:child_process';
import { isAbsolute, relative, resolve, sep } from 'node:path';

const USAGE = `Usage: node detect-changed-connector-api-files.mjs [OPTIONS] [base-ref]

Print changes to connector-api/ between the current state and a base ref.

Options:
  --no-diff     Print changed file paths only instead of a full diff
  --path PATH   Limit output to PATH (repeatable, must be under connector-api/)
  --help        Show this help message and exit

Arguments:
  base-ref    Git ref to diff against (default: origin/main or main)

Output:
  By default, prints a unified diff of all changed connector-api/ files,
  excluding connector-api/_generator/. With --no-diff, prints one file path
  per line.

  A full regeneration diff can exceed the output limit of the tool reading it,
  and a truncated diff is indistinguishable from a complete one. To stay under
  the limit, list the changed files with --no-diff, then request them one at a
  time with --path.

Priority:
  1) Staged and unstaged local changes
  2) If none, branch diff against base-ref (triple-dot: base-ref...HEAD)

  This choice is made across all of connector-api/, not per --path, so narrowing
  changes what is printed without changing what it is compared against.
`;

const SCOPE = 'connector-api';
const EXCLUDE = `:(exclude)${SCOPE}/_generator/`;

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

// A generated reference diff runs to tens of megabytes in the worst case, well past the 1 MB
// execFileSync default, and exceeding it throws rather than truncating.
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
}

function refExists(ref) {
  try {
    git(['rev-parse', '--verify', '--quiet', ref]);
    return true;
  } catch {
    return false;
  }
}

const repoRoot = git(['rev-parse', '--show-toplevel']).trim();
process.chdir(repoRoot);
const scopeRoot = resolve(repoRoot, SCOPE);

// Resolve before comparing, so '..', absolute paths, and redundant separators are all normalized
// the way git itself would normalize them. Returns a repo-relative pathspec, always inside SCOPE.
function toScopedPathspec(value) {
  const rel = relative(scopeRoot, resolve(repoRoot, value));
  if (rel !== '' && (rel.startsWith('..') || isAbsolute(rel))) {
    fail(`--path must be under ${SCOPE}/: ${value}`);
  }
  return rel === '' ? `${SCOPE}/` : `${SCOPE}/${rel.split(sep).join('/')}`;
}

let noDiff = false;
let baseRef = '';
const requestedPaths = [];

const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (arg === '--help') {
    process.stdout.write(USAGE);
    process.exit(0);
  } else if (arg === '--no-diff') {
    noDiff = true;
  } else if (arg === '--path') {
    if (i + 1 >= argv.length) fail('--path requires a value');
    i += 1;
    requestedPaths.push(toScopedPathspec(argv[i]));
  } else if (arg.startsWith('--path=')) {
    requestedPaths.push(toScopedPathspec(arg.slice('--path='.length)));
  } else if (arg.startsWith('-')) {
    fail(`Unknown option: ${arg}\n${USAGE}`);
  } else if (baseRef !== '') {
    fail(`Unexpected argument: ${arg}\n${USAGE}`);
  } else {
    baseRef = arg;
  }
}

if (baseRef === '') {
  baseRef = refExists('origin/main') ? 'origin/main' : 'main';
}

const fullScope = [`${SCOPE}/`, EXCLUDE];
// The exclusion goes last, so --path can only narrow the scope, never widen it.
const pathspec = requestedPaths.length > 0 ? [...requestedPaths, EXCLUDE] : fullScope;

function printFiles(outputs) {
  const files = [...new Set(outputs.flatMap((out) => out.split('\n')).filter(Boolean))].sort();
  if (files.length > 0) process.stdout.write(`${files.join('\n')}\n`);
}

// Decide local-versus-branch across the whole of connector-api/, before any --path narrowing.
// Deciding it per request would let successive --path calls answer from different comparison bases:
// a path with no working-tree change would fall through to the branch diff while another path still
// had local changes, so the documented "--no-diff, then --path per file" flow could mix the two.
const hasLocalChanges =
  `${git(['diff', '--name-only', '--cached', '--', ...fullScope])}${git(['diff', '--name-only', '--', ...fullScope])}`.trim() !==
  '';

// Nothing below may call process.exit. stdout is asynchronous when it is a pipe, which is how the
// caller reads this, and process.exit discards writes still queued past the 64 KB pipe buffer — a
// silent truncation with exit status 0, the exact failure this script's Priority notes warn about.
// Letting the process end naturally lets Node flush first.
if (hasLocalChanges) {
  if (noDiff) {
    printFiles([
      git(['diff', '--name-only', '--cached', '--', ...pathspec]),
      git(['diff', '--name-only', '--', ...pathspec]),
    ]);
  } else {
    process.stdout.write(git(['diff', '--cached', '--', ...pathspec]));
    process.stdout.write(git(['diff', '--', ...pathspec]));
  }
} else {
  // No local changes anywhere in connector-api/, so compare the branch against the base ref.
  if (!refExists(baseRef)) fail(`Base ref not found: ${baseRef}`);

  if (noDiff) {
    printFiles([git(['diff', '--name-only', `${baseRef}...HEAD`, '--', ...pathspec])]);
  } else {
    process.stdout.write(git(['diff', `${baseRef}...HEAD`, '--', ...pathspec]));
  }
}
