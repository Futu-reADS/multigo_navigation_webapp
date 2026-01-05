
#!/bin/bash
set -e

# Create authentication directories for GitHub CLI and Gemini CLI
# These directories will be mounted to persist credentials across container rebuilds

# Determine the home directory (Unix/WSL or Windows)
HOME_DIR="${HOME:-$USERPROFILE}"

# Create .config subdirectories
mkdir -p "$HOME_DIR/.config/gh" 2>/dev/null || true
mkdir -p "$HOME_DIR/.config/gcloud" 2>/dev/null || true
mkdir -p "$HOME_DIR/.gemini" 2>/dev/null || true

echo "Authentication directories and files ready: $HOME_DIR/.config/gh, $HOME_DIR/.config/gcloud, $HOME_DIR/.gemini"
