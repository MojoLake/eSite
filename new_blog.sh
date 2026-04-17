#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLOG_DIR="${ROOT_DIR}/src/lib/content/blogs"
TODAY="$(date +%F)"

if [[ ! -d "${BLOG_DIR}" ]]; then
  echo "Error: blog directory not found: ${BLOG_DIR}" >&2
  exit 1
fi

usage() {
  cat <<'EOF'
Usage: ./new_blog.sh --name "Post title"

Creates a new draft blog post in src/lib/content/blogs.
EOF
}

slugify() {
  local text="$1"
  text="$(printf '%s' "${text}" | tr '[:upper:]' '[:lower:]')"
  text="$(printf '%s' "${text}" | tr -cs 'a-z0-9' '-')"
  text="${text#-}"
  text="${text%-}"
  printf '%s\n' "${text}"
}

TITLE_INPUT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)
      if [[ $# -lt 2 || -z "${2}" ]]; then
        echo "Error: --name requires a value." >&2
        usage >&2
        exit 1
      fi
      TITLE_INPUT="$2"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "Error: unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -z "${TITLE_INPUT}" ]]; then
  echo "Error: --name is required." >&2
  usage >&2
  exit 1
fi

SLUG_SUFFIX="$(slugify "${TITLE_INPUT}")"

if [[ -z "${SLUG_SUFFIX}" ]]; then
  SLUG_SUFFIX="blog-post"
fi

BASE_FILENAME="${TODAY}-${SLUG_SUFFIX}"
FILE_PATH="${BLOG_DIR}/${BASE_FILENAME}.svx"

counter=2
while [[ -e "${FILE_PATH}" ]]; do
  FILE_PATH="${BLOG_DIR}/${BASE_FILENAME}-${counter}.svx"
  ((counter++))
done

cat > "${FILE_PATH}" <<EOF
---
title: "${TITLE_INPUT}"
date: "${TODAY}"
summary: ""
tags: []
published: false
---

EOF

echo "Created: ${FILE_PATH}"
