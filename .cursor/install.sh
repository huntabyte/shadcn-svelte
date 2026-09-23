#!/usr/bin/env bash
# Cloud Agent install step for the shadcn-svelte monorepo.
# The default image's `node` is older than the `@shadcn-svelte/parity` engine
# requirement (>=22.18) and `.npmrc` sets `engine-strict=true`, so select the
# nvm-managed Node (preserved in the environment snapshot) before installing.
set -eo pipefail

# `pnpm` is a corepack shim; let it fetch the pinned version non-interactively.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
	# shellcheck disable=SC1091
	. "$NVM_DIR/nvm.sh"
	export PATH="$(dirname "$(nvm which default)"):$PATH"
fi

echo "Using node $(node -v) / pnpm $(pnpm -v)"

# `postinstall` builds the CLI and syncs the docs registry/content.
pnpm install

# Set up skilless (skill manager). Best-effort: never block the core install.
"$(dirname "$0")/skilless.sh" || echo "skilless setup skipped (non-fatal); see .cursor/skilless.sh"
