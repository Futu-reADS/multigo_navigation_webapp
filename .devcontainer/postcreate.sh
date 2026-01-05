#!/bin/bash
set -e

# gemini-cli インストール
npm install -g @google/gemini-cli
# spec-kit インストール
pip install uv
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
# T.B.D. インストールできたかチェック