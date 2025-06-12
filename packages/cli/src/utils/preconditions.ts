import * as semver from "semver";
import { getDependencyPackageInfo, getProjectPackageInfo } from "./get-package-info.js";
import * as cliConfig from "./get-config.js";
import { error } from "./errors.js";
import { highlight } from "./utils.js";
import { SITE_BASE_URL, TW3_SITE_BASE_URL } from "../constants.js";

// we use this generic to allow passing either RawConfig or ResolvedConfig and getting the correct type back
type Options<Config extends cliConfig.RawConfig> = {
	cwd: string;
	config: Config | undefined;
};

/** Checks preconditions and updates the config if necessary. Returns updated config or null (if the config was not provided) */
export function checkPreconditions<Config extends cliConfig.RawConfig>({
	cwd,
	config,
}: Options<Config>): Config | null {
	const sveltePkg = getDependencyPackageInfo(cwd, "svelte")?.pkg;
	const tailwindPkg = getDependencyPackageInfo(cwd, "tailwindcss")?.pkg;

	const pkg = getProjectPackageInfo(cwd);
	const deps = { ...pkg.dependencies, ...pkg.devDependencies };

	const svelte = sveltePkg?.version ?? deps["svelte"];
	const tailwindcss = tailwindPkg?.version ?? deps["tailwindcss"];

	return checkDependencies({ svelte, tailwindcss }, cwd, config);
}

/** Checks dependencies and updates config if necessary. */
function checkDependencies<Config extends cliConfig.RawConfig>(
	dependencies: Partial<Record<string, string>>,
	cwd: string,
	config: Config | undefined
): Config | null {
	if (!dependencies.tailwindcss || !dependencies.svelte) {
		throw error(`This CLI version requires Tailwind and Svelte to initialize a project.\n`);
	}

	const isTailwind3 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^3.0.0");
	const isTailwind4 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^4.0.0");
	const isSvelte5 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^5.0.0");

	// supported versions (tailwind v4 + svelte v5)
	if (isTailwind4 && isSvelte5) {
		// no config to update
		if (!config) return null;

		const host = new URL(config.registry).host;
		if (host === "next.shadcn-svelte.com") {
			// update `next` registry and schema urls
			config.$schema = cliConfig.DEFAULT_CONFIG.$schema;
			config.registry = cliConfig.DEFAULT_CONFIG.registry;
			cliConfig.writeConfig(cwd, config);
		}
		return config;
	}

	// legacy (tailwind v3 + svelte v5)
	if (isTailwind3 && isSvelte5) {
		// no config to update
		if (!config) return null;

		// if no `style` field, then we can assume their components.json is already updated
		if (!config.style) return config;

		config.registry = `${TW3_SITE_BASE_URL}/registry/${config.style}`;
		cliConfig.writeConfig(cwd, config);
		return config;
	}

	// incompatible
	throw error(
		`This CLI version requires Tailwind CSS (v3 or v4) and Svelte v5.\n\n` +
			`If you are on Svelte v4, use ${highlight("shadcn-svelte@0.14 add")} instead, or consider migrating to Svelte 5: ${SITE_BASE_URL}/docs/migration/svelte-5`
	);
}
