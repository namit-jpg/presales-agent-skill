#!/usr/bin/env bash
# Installs the presales-agent skill for Claude Code (macOS / Linux).
#
#   curl -fsSL https://raw.githubusercontent.com/namit-jpg/presales-agent-skill/main/install.sh | bash
#
# No git required. Installs to ~/.claude/skills/presales-agent, which both the
# Claude Code CLI and the desktop app read.

set -euo pipefail

REPO="namit-jpg/presales-agent-skill"
BRANCH="${BRANCH:-main}"
NAME="presales-agent"
BASE="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
TARGET="$BASE/skills/$NAME"
INNER="presales-agent-skill-$BRANCH/plugins/$NAME/skills/$NAME"

say()  { printf '  %s\n' "$1"; }
fail() { printf '\n  Error: %s\n\n' "$1" >&2; exit 1; }

printf '\n  Installing the presales-agent skill\n\n'

command -v curl >/dev/null 2>&1 || fail "curl is required but was not found."

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

say "Downloading $REPO ($BRANCH)…"
curl -fsSL "https://codeload.github.com/$REPO/zip/refs/heads/$BRANCH" -o "$TMP/skill.zip" \
  || fail "Download failed. Check your connection, or that the repo and branch exist."

say "Extracting…"
if command -v unzip >/dev/null 2>&1; then
  unzip -q "$TMP/skill.zip" -d "$TMP"
elif command -v tar >/dev/null 2>&1; then
  tar -xf "$TMP/skill.zip" -C "$TMP"
else
  fail "Need either 'unzip' or 'tar' to extract the download."
fi

[ -f "$TMP/$INNER/SKILL.md" ] || fail "Archive layout unexpected — SKILL.md not found at $INNER."

if [ -d "$TARGET" ]; then
  BACKUP="$TARGET.backup-$(date +%Y%m%d%H%M%S)"
  say "Existing install found — moving it to $(basename "$BACKUP")"
  mv "$TARGET" "$BACKUP"
fi

mkdir -p "$(dirname "$TARGET")"
cp -R "$TMP/$INNER" "$TARGET"
say "Installed to $TARGET"

if command -v npm >/dev/null 2>&1; then
  say "Installing the Excel dependency…"
  if npm install --prefix "$TARGET/scripts" --silent --no-audit --no-fund >/dev/null 2>&1; then
    say "Excel export ready."
  else
    say "Excel dependency failed to install. JSON output still works."
    say "Retry later with: npm install --prefix \"$TARGET/scripts\""
  fi
else
  say "Node/npm not found — JSON output works, Excel export does not."
  say "Install Node 18+, then run: npm install --prefix \"$TARGET/scripts\""
fi

cat <<EOF

  Done. Restart Claude Code, then try:

      start a new engagement for Contoso Manufacturing

  To remove it:  rm -rf "$TARGET"

EOF
