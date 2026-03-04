#!/usr/bin/env bash
set -euo pipefail

staged_files=$(git diff --cached --name-only --diff-filter=ACMR)
if [[ -z "${staged_files}" ]]; then
  exit 0
fi

pattern='(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----|client_secret["'"'"'[:space:]]*[:=]["'"'"'][^"'"'"']{8,}["'"'"']|access_token["'"'"'[:space:]]*[:=]["'"'"'][^"'"'"']{8,}["'"'"']|refresh_token["'"'"'[:space:]]*[:=]["'"'"'][^"'"'"']{8,}["'"'"'])'

has_match=0
while IFS= read -r file; do
  if [[ ! -f "$file" ]]; then
    continue
  fi

  if grep -EIn -- "$pattern" "$file" >/dev/null 2>&1; then
    echo "Potential secret detected in: $file"
    grep -EIn -- "$pattern" "$file" || true
    has_match=1
  fi
done <<< "$staged_files"

if [[ "$has_match" -eq 1 ]]; then
  echo
  echo "Commit blocked by local secret scan."
  echo "If this is a false positive, remove sensitive-looking literals or commit carefully after review."
  exit 1
fi

exit 0
