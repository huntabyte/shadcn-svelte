#!/usr/bin/env bash
# Sets up skilless (https://skilless.dev) so agents can manage and install
# skills for this project. Authentication is via the SKILLESS_TOKEN environment
# variable (add it as an environment secret); the skilless CLI reads the token
# directly from the environment, so no interactive `skilless auth` is needed.
#
# This step is best-effort: it must never block the core environment install,
# so callers invoke it non-fatally.
set -eo pipefail

# `pnpm`/`npx` come from the corepack shim; avoid interactive download prompts.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
	# shellcheck disable=SC1091
	. "$NVM_DIR/nvm.sh"
	export PATH="$(dirname "$(nvm which default)"):$PATH"
fi

# Create the local skilless library (idempotent).
npx --yes skilless@latest init

# Install the skills added to this project. This requires authentication, so
# only run it when a token is configured.
if [ -n "${SKILLESS_TOKEN:-}" ]; then
	npx --yes skilless@latest install
else
	echo "skilless: SKILLESS_TOKEN not set; skipping 'skilless install'. Add the SKILLESS_TOKEN secret to enable skill install/sync."
fi
