#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage: detect-changed-connector-api-files.sh [OPTIONS] [base-ref]

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
EOF
}

NO_DIFF=0
BASE_REF=''
# Newline-separated, because POSIX sh has no arrays. Paths in connector-api/ never contain
# whitespace, but the delimiter is a newline rather than a space so a future one would not split.
REQUESTED_PATHS=''

add_path() {
  case "$1" in
    connector-api/*) ;;
    *) echo "--path must be under connector-api/: $1" >&2; exit 1 ;;
  esac
  REQUESTED_PATHS="${REQUESTED_PATHS}${1}
"
}

while [ $# -gt 0 ]; do
  case "$1" in
    --help) usage; exit 0 ;;
    --no-diff) NO_DIFF=1 ;;
    --path)
      [ $# -ge 2 ] || { echo "--path requires a value" >&2; exit 1; }
      shift
      add_path "$1"
      ;;
    --path=*) add_path "${1#--path=}" ;;
    -*) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
    *)
      [ -z "$BASE_REF" ] || { echo "Unexpected argument: $1" >&2; usage >&2; exit 1; }
      BASE_REF="$1"
      ;;
  esac
  shift
done

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

# Build the pathspec as positional parameters. The _generator/ exclusion is appended last in both
# cases, so --path can only ever narrow the scope, never widen it past what this script documents.
if [ -n "$REQUESTED_PATHS" ]; then
  OLD_IFS=$IFS
  IFS='
'
  set -- $REQUESTED_PATHS
  IFS=$OLD_IFS
else
  set -- connector-api/
fi
set -- "$@" ':(exclude)connector-api/_generator/'

# Collect local changes scoped to connector-api.
if [ "$NO_DIFF" -eq 1 ]; then
  git diff --name-only --cached -- "$@" >> "$TMP_FILE"
  git diff --name-only        -- "$@" >> "$TMP_FILE"
else
  git diff --cached -- "$@" >> "$TMP_FILE"
  git diff          -- "$@" >> "$TMP_FILE"
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
  git diff --name-only "$BASE_REF"...HEAD -- "$@" | sort -u
else
  git diff "$BASE_REF"...HEAD -- "$@"
fi
