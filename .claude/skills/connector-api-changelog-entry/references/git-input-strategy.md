# Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

**Note:** These commands are relative to the skill's directory.

Default command (full diff output):

```bash
scripts/detect-changed-connector-api-files.sh
```

File paths only (no diff content):

```bash
scripts/detect-changed-connector-api-files.sh --no-diff
```

Optional base ref override:

```bash
scripts/detect-changed-connector-api-files.sh origin/main
scripts/detect-changed-connector-api-files.sh --no-diff origin/main
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
