# Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

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
git diff --cached -- connector-api/ ':(exclude)connector-api/_generator/'
git diff          -- connector-api/ ':(exclude)connector-api/_generator/'
git rev-parse --verify origin/main
git diff origin/main...HEAD -- connector-api/ ':(exclude)connector-api/_generator/'
```

Interpretation rules:

- Combine staged and unstaged output; if non-empty, use it and skip the branch diff.
- If combined local output is empty, fall back to branch diff against `main`.
- Use triple-dot branch diff (`origin/main...HEAD`) so only current-branch changes are considered.
- `connector-api/_generator/` is excluded from all output.
