# Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

**Note:** Run these commands from the repository root. The script itself works from any directory – it changes to the repository root before diffing – but the path used to invoke it must match the form above so it stays within the allowlist granted by the [regenerate workflow](../../../../.github/workflows/regenerate-connector-api-reference.yml).

Default command (full diff output):

```bash
.claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.sh
```

File paths only (no diff content):

```bash
.claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.sh --no-diff
```

Optional base ref override:

```bash
.claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.sh origin/main
.claude/skills/connector-api-changelog-entry/scripts/detect-changed-connector-api-files.sh --no-diff origin/main
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
