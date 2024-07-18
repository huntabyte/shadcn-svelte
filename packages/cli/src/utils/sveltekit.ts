import fs from "node:fs";
import { execa } from "execa";
import { getPackageManager } from "./get-package-manager.js";
import { loadProjectPackageInfo } from "./get-package-info.js";

// if it's a SvelteKit project, run `svelte-kit sync` if the `.svelte-kit` dir is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		if (fs.existsSync(".svelte-kit")) return;

		const packageManager = await getPackageManager(cwd);
		await execa(packageManager === "npm" ? "npx" : packageManager, ["svelte-kit", "sync"], {
			cwd,
		});
	}
}

/**
 * Loads the user's `package.json` and check if `@sveltejs/kit` is a dependency.
 */
export function isUsingSvelteKit(cwd: string): boolean {
	const packageJSON = loadProjectPackageInfo(cwd);
	const deps = { ...packageJSON.devDependencies, ...packageJSON.dependencies };
	return deps["@sveltejs/kit"] !== undefined;
}
