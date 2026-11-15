#!/usr/bin/env bash
# Build and deploy the site to the VPS.
# Usage:
#   ./deploy.sh <vps-user@host> [ssh-key-path]
# Example:
#   ./deploy.sh ubuntu@129.151.x.x ~/.ssh/oracle_key

set -euo pipefail

HOST="${1:?Usage: ./deploy.sh <user@host> [ssh-key]}"
KEY="${2:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_DIR="$SCRIPT_DIR/../web"
REMOTE_DIR="/var/www/coastal-heritage"

cd "$WEB_DIR"
echo ">> Installing deps & building..."
npm ci
# Set these to enable Umami analytics in the build:
# export VITE_UMAMI_URL=https://analytics.yourdomain.co.za
# export VITE_UMAMI_WEBSITE_ID=xxxx
npm run build

SSH_OPTS=()
[ -n "$KEY" ] && SSH_OPTS+=(-i "$KEY")

echo ">> Uploading to $HOST:$REMOTE_DIR ..."
if command -v rsync >/dev/null 2>&1; then
  rsync -az --delete -e "ssh ${KEY:+-i $KEY}" "$WEB_DIR/dist/" "$HOST:$REMOTE_DIR/"
else
  ssh "${SSH_OPTS[@]}" "$HOST" "rm -rf $REMOTE_DIR/*"
  scp -r "${SSH_OPTS[@]}" "$WEB_DIR/dist/." "$HOST:$REMOTE_DIR/"
fi

echo ">> Done. Site deployed to $HOST:$REMOTE_DIR"
