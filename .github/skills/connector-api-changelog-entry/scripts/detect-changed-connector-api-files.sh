#!/bin/sh
set -eu

# Prints changed files scoped to connector-api/.
# Priority:
# 1) staged + unstaged local changes
# 2) if none, diff current branch against BASE_REF...HEAD
#
# Usage:
#   ./scripts/detect-changed-connector-api-files.sh [base-ref]
# Examples:
#   ./scripts/detect-changed-connector-api-files.sh
#   ./scripts/detect-changed-connector-api-files.sh origin/main

BASE_REF=${1:-}

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

# Collect local changes scoped to connector-api.
git diff --name-only --cached -- connector-api/ >> "$TMP_FILE"
git diff --name-only -- connector-api/ >> "$TMP_FILE"

if [ -s "$TMP_FILE" ]; then
  sort -u "$TMP_FILE"
  exit 0
fi

# Fallback to branch diff if no local changes are present.
if ! git rev-parse --verify --quiet "$BASE_REF" >/dev/null; then
  echo "Base ref not found: $BASE_REF" >&2
  exit 1
fi

git diff --name-only "$BASE_REF"...HEAD -- connector-api/ | sort -u
