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

  This choice is made across all of connector-api/, not per --path, so narrowing
  changes what is printed without changing what it is compared against.
EOF
}

NO_DIFF=0
BASE_REF=''
# Newline-separated, because POSIX sh has no arrays. Paths in connector-api/ never contain
# whitespace, but the delimiter is a newline rather than a space so a future one would not split.
REQUESTED_PATHS=''

add_path() {
  case "$1" in
    # Reject traversal before the prefix test: git normalizes '..' in a pathspec before matching,
    # so 'connector-api/../.github' passes a prefix check and then resolves outside the scope.
    *..*) echo "--path must not contain '..': $1" >&2; exit 1 ;;
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

EXCLUDE=':(exclude)connector-api/_generator/'

# Decide local-versus-branch across the whole of connector-api/, before any --path narrowing.
# Deciding it per request would let successive --path calls answer from different comparison bases:
# a path with no working-tree change would fall through to the branch diff while another path still
# had local changes, so the documented "--no-diff, then --path per file" flow could mix the two.
if [ -n "$(git diff --name-only --cached -- connector-api/ "$EXCLUDE"; git diff --name-only -- connector-api/ "$EXCLUDE")" ]; then
  USE_LOCAL=1
else
  USE_LOCAL=0
fi

# Build the pathspec as positional parameters. set -f disables pathname expansion across the split,
# so a --path value cannot be glob-expanded into paths the caller never asked for. The _generator/
# exclusion is appended last, so --path can only narrow the scope, never widen it.
if [ -n "$REQUESTED_PATHS" ]; then
  OLD_IFS=$IFS
  IFS='
'
  set -f
  set -- $REQUESTED_PATHS
  set +f
  IFS=$OLD_IFS
else
  set -- connector-api/
fi
set -- "$@" "$EXCLUDE"

if [ "$USE_LOCAL" -eq 1 ]; then
  if [ "$NO_DIFF" -eq 1 ]; then
    { git diff --name-only --cached -- "$@"; git diff --name-only -- "$@"; } | sort -u
  else
    git diff --cached -- "$@"
    git diff          -- "$@"
  fi
  exit 0
fi

# No local changes anywhere in connector-api/, so compare the branch against the base ref.
if ! git rev-parse --verify --quiet "$BASE_REF" >/dev/null; then
  echo "Base ref not found: $BASE_REF" >&2
  exit 1
fi

if [ "$NO_DIFF" -eq 1 ]; then
  git diff --name-only "$BASE_REF"...HEAD -- "$@" | sort -u
else
  git diff "$BASE_REF"...HEAD -- "$@"
fi
