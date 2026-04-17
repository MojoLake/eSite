#!/usr/bin/env bash
set -euo pipefail

# Load deployment configuration
if [ ! -f ".deploy.config" ]; then
  echo "Error: .deploy.config file not found!"
  echo "Please create .deploy.config with HOST and APP_DIR variables."
  exit 1
fi

source .deploy.config

echo "Building locally..."
yarn install --frozen-lockfile
yarn build

echo "Syncing to server..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='.svelte-kit' \
  --exclude='build/client/__MACOSX' \
  --exclude='build/**/*.map' \
  build \
  package.json \
  "$HOST:$APP_DIR/"

echo "Restarting application..."
ssh -o StrictHostKeyChecking=accept-new "$HOST" 'bash -lc '"'"'
  set -euo pipefail
  cd "'"$APP_DIR"'"
  pm2 restart sveltekit || pm2 start build/index.js --name sveltekit
  pm2 save
'"'"

echo "Deployed!"
