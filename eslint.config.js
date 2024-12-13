import config, { DEFAULT_IGNORES } from "@huntabyte/eslint-config";

export default config({ svelte: true, ignorePatterns: [...DEFAULT_IGNORES, ".github/**/*"] });
