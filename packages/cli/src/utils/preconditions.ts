import * as semver from "semver";
import color from "picocolors";
import * as p from "@clack/prompts";
import { getDependencyPackageInfo, getProjectPackageInfo } from "./get-package-info.js";
import * as cliConfig from "./get-config.js";
import { CLIError, error } from "./errors.js";
import { highlight } from "./utils.js";
import { SITE_BASE_URL, TW3_SITE_BASE_URL } from "../constants.js";

// accepts either a `RawConfig` or `ResolvedConfig`
type PreconditionOptions<Config extends cliConfig.RawConfig> = {
	cwd: string;
	config: Config;
	force: boolean;
};

/** Checks preconditions and updates the config if necessary. */
export function checkPreconditions<Config extends cliConfig.RawConfig>({
	cwd,
	config,
	force,
}: PreconditionOptions<Config>): Config {
	const sveltePkg = getDependencyPackageInfo(cwd, "svelte")?.pkg;
	const tailwindPkg = getDependencyPackageInfo(cwd, "tailwindcss")?.pkg;

	// covers the case where `npm install` hasn't been executed yet
	const pkg = getProjectPackageInfo(cwd);
	const fallback = { ...pkg.dependencies, ...pkg.devDependencies };

	const svelte = sveltePkg?.version ?? fallback["svelte"];
	const tailwindcss = tailwindPkg?.version ?? fallback["tailwindcss"];

	const result = checkDependencies({ svelte, tailwindcss }, cwd, config);
	if (result.ok) return result.config;

	if (!force) throw result.error;

	p.note(`${color.red(result.error.message)}\nContinuing with ${color.bold("--force")}.`);

	return result.config;
}

type CheckDependenciesResult<Config extends cliConfig.RawConfig> =
	| {
			ok: true;
			config: Config;
			error?: null;
	  }
	| {
			ok: false;
			config: Config;
			error: CLIError;
	  };

/** Checks dependencies and updates config if necessary. */
function checkDependencies<Config extends cliConfig.RawConfig>(
	dependencies: Record<string, string | undefined>,
	cwd: string,
	config: Config
): CheckDependenciesResult<Config> {
	if (!dependencies.tailwindcss || !dependencies.svelte) {
		return {
			ok: false,
			config,
			error: error(`This CLI requires Tailwind CSS and Svelte to be installed.\n`),
		};
	}

	const isTailwind3 = semver.satisfies(semver.coerce(dependencies.tailwindcss) ?? "", "^3.0.0");
	const isTailwind4 = semver.satisfies(semver.coerce(dependencies.tailwindcss) ?? "", "^4.0.0");
	const isSvelte5 = semver.satisfies(semver.coerce(dependencies.svelte) ?? "", "^5.0.0");

	// supported versions (tailwind v4 + svelte v5)
	if (isTailwind4 && isSvelte5) {
		// no config to update
		if (!config) return { ok: true, config };

		const host = new URL(config.registry).host;
		if (host === "next.shadcn-svelte.com") {
			// update from `next` registry and schema urls
			config.$schema = cliConfig.DEFAULT_CONFIG.$schema;
			config.registry = cliConfig.DEFAULT_CONFIG.registry;
			cliConfig.writeConfig(cwd, config);
			p.log.step(`Config file ${highlight("components.json")} updated`);
		}
		return { ok: true, config };
	}

	// legacy (tailwind v3 + svelte v5)
	if (isTailwind3 && isSvelte5) {
		// no config to update
		if (!config) return config;

		// if no `style` field, then we can assume their components.json is already updated
		if (!config.style) return { ok: true, config };

		config.registry = `${TW3_SITE_BASE_URL}/registry/${config.style}`;
		cliConfig.writeConfig(cwd, config);
		p.log.step(`Config file ${highlight("components.json")} updated`);
		return { ok: true, config };
	}

	// incompatible
	return {
		ok: false,
		config,
		error: error(
			`This CLI version requires Tailwind CSS (v3 or v4) and Svelte v5.\n\n` +
				`If you are on Svelte v4, use ${highlight("shadcn-svelte@0.14 add")} instead, or consider migrating to Svelte 5: ${SITE_BASE_URL}/docs/migration/svelte-5`
		),
	};
}
