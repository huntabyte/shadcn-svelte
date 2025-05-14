import color from "chalk";
import * as semver from "semver";
import { loadProjectPackageInfo } from "../../utils/get-package-info.js";
import { ConfigError, error } from "../../utils/errors.js";
import * as cliConfig from "../../utils/get-config.js";
import { TW3_SITE_BASE_URL } from "../../constants.js";
import { highlight } from "../../utils/utils.js";

/**
 * Runs preflight checks for the `add` command.
 * `add` in this CLI version should work for both Tailwind CSS v3 and v4 and Svelte 5,
 * but fail for Svelte 4.
 *
 * @param cwd - The current working directory.
 */
export async function preflightAdd(cwd: string) {
	const pkg = loadProjectPackageInfo(cwd);
	const config = await cliConfig.getRawConfig(cwd);
	if (!config) {
		throw new ConfigError(
			`Configuration file is missing. Please run ${color.green("init")} to create a ${highlight("components.json")} file.`
		);
	}

	const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

	checkAddDependencies(dependencies, cwd, config);
}

/**
 * Checks the dependencies of the user's project to ensure that the project is compatible
 * with the expected dependencies.
 */
function checkAddDependencies(
	dependencies: Partial<Record<string, string>>,
	cwd: string,
	config: cliConfig.RawConfig
) {
	if (!dependencies.tailwindcss || !dependencies.svelte) {
		throw error(`This CLI version requires Tailwind CSS (v3 or v4) and Svelte v5.\n`);
	}

	const isSvelte5 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^5.0.0");
	const isTailwind4 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^4.0.0");
	const isTailwind3 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^3.0.0");

	// this is the happy path
	if (isTailwind4 && isSvelte5) return;

	if (isTailwind3 && isSvelte5) {
		// if no `style` field, then we can assume their components.json is already updated
		if (!config.style) return;

		updateLegacyConfig(cwd, config);
		return;
	}

	// if incompatible, throw error
	throw error(`This CLI version requires Tailwind CSS (v3 or v4) and Svelte v5.\n`);
}

/**
 * Updates a legacy config (Tailwind v3 / Svelte v5) to be compatible with the new CLI.
 * It does so by updating the `registry` field to point to the Tailwind v3/Svelte v5 registry
 * based on their `style` field and removes the `style` field before writing the config back.
 */
function updateLegacyConfig(cwd: string, config: cliConfig.RawConfig) {
	// should we just write the config back here or prompt them to confirm?
	cliConfig.writeConfig(cwd, {
		...config,
		registry: `${TW3_SITE_BASE_URL}/registry/${config.style}`,
	});
}
