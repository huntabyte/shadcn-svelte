#!/usr/bin/env bash
# Runs the shadcn-svelte documentation site (SvelteKit) dev server on :5173.
# Uses the same nvm-managed Node selected during install.
set -eo pipefail

# `pnpm` is a corepack shim; let it fetch the pinned version non-interactively.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
	# shellcheck disable=SC1091
	. "$NVM_DIR/nvm.sh"
	export PATH="$(dirname "$(nvm which default)"):$PATH"
fi

cd "$(dirname "$0")/.."

exec pnpm -F docs dev
