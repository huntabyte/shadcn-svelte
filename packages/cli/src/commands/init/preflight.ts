import * as p from "@clack/prompts";
import color from "picocolors";
import * as semver from "semver";
import { CLIError, error } from "../../utils/errors.js";
import { highlight } from "../../utils/utils.js";
import { TW3_SITE_BASE_URL, SITE_BASE_URL } from "../../constants.js";
import { getDependencyPackageInfo, getProjectPackageInfo } from "../../utils/get-package-info.js";

/**
 * Runs preflight checks for the `init` command.
 * `init` in this CLI version should only run if the user has a project that
 * is using Tailwind CSS v4 and Svelte v5.
 *
 * If the user is using Tailwind CSS v3 and/or Svelte v4, we need to let them
 * know that they need to upgrade their project in order to use this CLI.
 *
 * @param cwd - The current working directory.
 */
export function preflightInit(cwd: string, options: { force: boolean }) {
	const sveltePkg = getDependencyPackageInfo(cwd, "svelte")?.pkg;
	const tailwindPkg = getDependencyPackageInfo(cwd, "tailwindcss")?.pkg;

	const pkg = getProjectPackageInfo(cwd);
	const deps = { ...pkg.dependencies, ...pkg.devDependencies };

	const svelte = sveltePkg?.version ?? deps["svelte"];
	const tailwindcss = tailwindPkg?.version ?? deps["tailwindcss"];

	const result = checkInitDependencies({ svelte, tailwindcss });
	if (result.ok) return;

	if (!options.force) throw result.error;

	p.note(`${color.red(result.error.message)}\nContinuing initialization with ${color.bold("--force")}.`);
}

type CheckInitDependenciesResult =
	| {
			ok: true;
			error?: null;
	  }
	| {
			ok: false;
			error: CLIError;
	  };

function checkInitDependencies(
	dependencies: Partial<Record<string, string>>
): CheckInitDependenciesResult {
	if (!dependencies.tailwindcss || !dependencies.svelte) {
		return {
			ok: false,
			error: error(
				`This CLI version requires Tailwind CSS v4 and Svelte v5 to initialize a project.\n`
			),
		};
	}

	const isTailwind3 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^3.0.0");
	const isTailwind4 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^4.0.0");
	const isSvelte4 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^4.0.0");
	const isSvelte5 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^5.0.0");

	// if running Tailwind v3 and Svelte v5, we throw an error with a helpful message because
	// `init` is only supported for Tailwind v4 and Svelte v5
	if (isTailwind3 && isSvelte5) {
		return {
			ok: false,
			error: error(
				`Initializing a project with Tailwind v3 is not supported.\n\n` +
					`This CLI version requires Tailwind v4 and Svelte v5 for the ` +
					`${highlight("init")} command.\n\n` +
					`You have two options:\n` +
					`1. Update Tailwind CSS to v4 and try again.\n` +
					`2. Use ${highlight("shadcn-svelte@1.0.0-next.10")} that supports initializing projects with Tailwind v3.\n\n` +
					`References:\n` +
					`Tailwind v4 Guide: ${color.underline(`${SITE_BASE_URL}/docs/migration/tailwind-v4`)}\n` +
					`Legacy Tailwind v3 Docs: ${color.underline(`${TW3_SITE_BASE_URL}/docs`)}\n\n`
			),
		};
	}

	// if running Tailwind v3 and Svelte v4, we throw a different message. This will be useful when
	// we move this branch into `main` to point people in the right direction.
	// TODO: add link to upgrade guide?
	if (isTailwind3 && isSvelte4) {
		return {
			ok: false,
			error: error(
				`Initializing a project with Tailwind v3 and Svelte v4 is not supported.\n\n` +
					`This CLI version requires Tailwind v4 and Svelte v5 for the ${highlight("init")} command.\n\n` +
					`Please use ${highlight("shadcn-svelte@0.14")} that supports Tailwind v3 + Svelte v4.\n\n`
			),
		};
	}

	// if not Tailwind v4 and Svelte v5 by this point, they are using Tailwind v4 and Svelte v4
	// which is kinda cursed
	if (!isTailwind4 || !isSvelte5) {
		return {
			ok: false,
			error: error(
				`This CLI version requires Tailwind CSS v4 and Svelte v5 to initialize a project.\n`
			),
		};
	}

	return {
		ok: true,
	};
}
