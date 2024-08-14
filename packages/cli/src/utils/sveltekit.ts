import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";
import { detect } from "package-manager-detector";
import { loadProjectPackageInfo } from "./get-package-info.js";

// if it's a SvelteKit project, run `svelte-kit sync` if the `.svelte-kit` dir is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		if (fs.existsSync(path.join(cwd, ".svelte-kit"))) return;

		const packageManager = await detect({ cwd });
		const agent = (packageManager?.agent || "npm").split('@')[0] as string;
		await execa(agent === "npm" ? "npx" : agent, ["svelte-kit", "sync"], {
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
