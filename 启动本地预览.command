#!/bin/zsh
cd "$(dirname "$0")"
if ! command -v node >/dev/null; then
  echo '请先安装 Node.js 22 LTS，再打开此文件。'
  read
  exit 1
fi
node scripts/serve.mjs --open
