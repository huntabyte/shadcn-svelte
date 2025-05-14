import * as semver from "semver";
import { loadProjectPackageInfo } from "../../utils/get-package-info.js";
import { error } from "../../utils/errors.js";

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
export function preflightInit(cwd: string) {
	const pkg = loadProjectPackageInfo(cwd);

	const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

	checkInitDependencies(dependencies);
}

function checkInitDependencies(dependencies: Partial<Record<string, string>>) {
	if (!dependencies.tailwindcss || !dependencies.svelte) {
		throw error(`This CLI version requires Tailwind CSS v4 and Svelte v5.\n`);
	}

	const isTailwind3 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^3.0.0");
	const isTailwind4 = semver.satisfies(semver.coerce(dependencies.tailwindcss) || "", "^4.0.0");
	const isSvelte4 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^4.0.0");
	const isSvelte5 = semver.satisfies(semver.coerce(dependencies.svelte) || "", "^5.0.0");

	// if running Tailwind v3 and Svelte v5, we throw an error with a helpful message because
	// `init` is only supported for Tailwind v4 and Svelte v5
	if (isTailwind3 && isSvelte5) {
		throw error(
			`You are using Tailwind CSS v3 with Svelte v5.\n\n` +
				`You have two options:\n` +
				`1. Update Tailwind CSS to v4 and try again.\n` +
				`2. Use shadcn-svelte@<TODO: version> that supports Tailwind v3.\n\n`
		);
	}

	// if running Tailwind v3 and Svelte v4, we throw a different message. This will be useful when
	// we move this branch into `main` to point people in the right direction.
	// TODO: add link to upgrade guide?
	if (isTailwind3 && isSvelte4) {
		throw error(
			`You are using Tailwind CSS v3 with Svelte v4.\n\n` +
				`This CLI version requires Tailwind CSS v4 and Svelte v5.\n` +
				`Please use shadcn-svelte@<TODO: version> that supports Tailwind v3 + Svelte v4.\n\n`
		);
	}

	// if not Tailwind v4 and Svelte v5 by this point, they are using Tailwind v4 and Svelte v4
	// which is kinda cursed
	if (!isTailwind4 || !isSvelte5) {
		throw error(`This CLI version requires Tailwind CSS v4 and Svelte v5.\n`);
	}
}
