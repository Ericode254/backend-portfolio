#!/usr/bin/env bash
# Rebuild public/Erick_Jillo_Resume.pdf from resume/resume.html with headless Chromium.
set -euo pipefail
cd "$(dirname "$0")/.."
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/Erick_Jillo_Resume.pdf "file://$PWD/resume/resume.html"
pdfinfo public/Erick_Jillo_Resume.pdf | grep Pages
