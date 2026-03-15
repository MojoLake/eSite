#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLOG_DIR="${ROOT_DIR}/src/lib/content/blogs/spanish"
TODAY="$(date +%F)"

if [[ ! -d "${BLOG_DIR}" ]]; then
  echo "Error: blog directory not found: ${BLOG_DIR}" >&2
  exit 1
fi

slugify() {
  local text="$1"
  text="$(printf '%s' "${text}" | tr '[:upper:]' '[:lower:]')"
  text="$(printf '%s' "${text}" | tr -cs 'a-z0-9' '-')"
  text="${text#-}"
  text="${text%-}"
  printf '%s\n' "${text}"
}

TITLE_INPUT="${*:-Spanish Blog Post (${TODAY})}"
SLUG_SUFFIX="$(slugify "${TITLE_INPUT}")"

if [[ -z "${SLUG_SUFFIX}" ]]; then
  SLUG_SUFFIX="spanish-blog"
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
tags: ["spanish"]
language: "es"
kind: "blog"
published: true
---

### Después de corregir con IA:


<br>

### Antes de corregir con IA:

EOF

echo "Created: ${FILE_PATH}"
