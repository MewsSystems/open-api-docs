# Git input strategy

Use this decision order to automatically discover input:

1. Staged and unstaged changes in the current workspace.
2. If none exist, branch diff against `main` (prefer `origin/main` when present).

Default command:

```bash
scripts/detect-changed-connector-api-files.sh
```

Optional base ref override:

```bash
scripts/detect-changed-connector-api-files.sh origin/main
```

Manual equivalent command sequence:

```bash
git diff --name-only --cached
git diff --name-only
git rev-parse --verify origin/main
git diff --name-only origin/main...HEAD
```

Interpretation rules:

- Combine staged and unstaged file lists, then de-duplicate.
- If combined local list is non-empty, do not fall back to `main` diff.
- Use triple-dot branch diff (`origin/main...HEAD`) so only current-branch changes are considered.
- Scope output to `connector-api/` files only.
