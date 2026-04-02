#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage: detect-changed-connector-api-files.sh [OPTIONS] [base-ref]

Print changes to connector-api/ between the current state and a base ref.

Options:
  --no-diff   Print changed file paths only instead of a full diff
  --help      Show this help message and exit

Arguments:
  base-ref    Git ref to diff against (default: origin/main or main)

Output:
  By default, prints a unified diff of all changed connector-api/ files,
  excluding connector-api/_generator/. With --no-diff, prints one file path
  per line.

Priority:
  1) Staged and unstaged local changes
  2) If none, branch diff against base-ref (triple-dot: base-ref...HEAD)
EOF
}

NO_DIFF=0
for arg in "$@"; do
  case "$arg" in
    --help) usage; exit 0 ;;
    --no-diff) NO_DIFF=1 ;;
    -*) echo "Unknown option: $arg" >&2; usage >&2; exit 1 ;;
  esac
done

BASE_REF=$(printf '%s\n' "$@" | grep -v '^--' | head -1)

if [ -z "$BASE_REF" ]; then
  if git rev-parse --verify --quiet origin/main >/dev/null; then
    BASE_REF=origin/main
  else
    BASE_REF=main
  fi
fi

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

TMP_FILE=$(mktemp "${TMPDIR:-/tmp}/connector-api-changes.XXXXXX")
cleanup() {
  rm -f "$TMP_FILE"
}
trap cleanup EXIT HUP INT TERM

EXCLUDE=':(exclude)connector-api/_generator/'

# Collect local changes scoped to connector-api.
if [ "$NO_DIFF" -eq 1 ]; then
  git diff --name-only --cached -- connector-api/ "$EXCLUDE" >> "$TMP_FILE"
  git diff --name-only        -- connector-api/ "$EXCLUDE" >> "$TMP_FILE"
else
  git diff --cached -- connector-api/ "$EXCLUDE" >> "$TMP_FILE"
  git diff          -- connector-api/ "$EXCLUDE" >> "$TMP_FILE"
fi

if [ -s "$TMP_FILE" ]; then
  if [ "$NO_DIFF" -eq 1 ]; then
    sort -u "$TMP_FILE"
  else
    cat "$TMP_FILE"
  fi
  exit 0
fi

# Fallback to branch diff if no local changes are present.
if ! git rev-parse --verify --quiet "$BASE_REF" >/dev/null; then
  echo "Base ref not found: $BASE_REF" >&2
  exit 1
fi

if [ "$NO_DIFF" -eq 1 ]; then
  git diff --name-only "$BASE_REF"...HEAD -- connector-api/ "$EXCLUDE" | sort -u
else
  git diff "$BASE_REF"...HEAD -- connector-api/ "$EXCLUDE"
fi
