# Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

**Note:** Run these commands from the repository root, exactly as written below. The script itself works from any directory – it changes to the repository root before diffing – but do not rewrite the path used to invoke it. Automated callers may be permitted to run only this one literal invocation, so an equivalent-but-different path can be refused.

Default command (full diff output):

```bash
node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs
```

File paths only (no diff content):

```bash
node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs --no-diff
```

One file at a time, to stay under the output limit on a large change set (repeatable, must be under `connector-api/`):

```bash
node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs --path connector-api/operations/reservations.md
```

Optional base ref override:

```bash
node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs origin/main
node .claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.mjs --no-diff origin/main
```

Manual equivalent command sequence:

```bash
# Check for local staged/unstaged changes
git diff --cached -- connector-api/ ':(exclude)connector-api/_generator/'
git diff          -- connector-api/ ':(exclude)connector-api/_generator/'

# If no local changes, determine base ref and show branch diff
if git rev-parse --verify --quiet origin/main >/dev/null; then
  git diff origin/main...HEAD -- connector-api/ ':(exclude)connector-api/_generator/'
else
  git diff main...HEAD -- connector-api/ ':(exclude)connector-api/_generator/'
fi
```

Interpretation rules:

- Combine staged and unstaged output; if non-empty, use it and skip the branch diff.
- If combined local output is empty, fall back to branch diff against the preferred base ref (`origin/main` if it exists, otherwise `main`).
- Use triple-dot branch diff so only current-branch changes are considered.
- `connector-api/_generator/` is excluded from all output.
- Untracked files never appear – every command here is a `git diff`. Stage them first with `git add -A -- connector-api/` so new operations pages are picked up as additions.
- `--path` can only narrow the scope. Each value is resolved and must land inside `connector-api/`, so `..` and absolute paths are rejected rather than pattern-matched, and the `_generator/` exclusion is always applied last. It cannot be used to reach excluded or unrelated files.
- Whether the output comes from local changes or from the branch diff is decided across all of `connector-api/`, not per `--path`. Narrowing therefore changes what is printed, never what it is compared against.
