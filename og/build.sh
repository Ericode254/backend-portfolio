#!/usr/bin/env bash
# Rebuild public/og-image.png (the social link preview) from og/og-image.html.
set -euo pipefail
cd "$(dirname "$0")/.."
chromium --headless --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --virtual-time-budget=5000 --screenshot=public/og-image.png "file://$PWD/og/og-image.html"
file public/og-image.png
