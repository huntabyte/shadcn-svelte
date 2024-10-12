import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";
import { detect, resolveCommand } from "package-manager-detector";
import { loadProjectPackageInfo } from "./get-package-info.js";

// if it's a SvelteKit project, run `svelte-kit sync` if the `.svelte-kit` dir is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		if (fs.existsSync(path.join(cwd, ".svelte-kit"))) return;

		let agent = await detect({ cwd });

		agent ??= { agent: "npm", name: "npm" };

		const cmd = resolveCommand(agent.agent, "execute", ["svelte-kit", "sync"]);
		if (cmd) {
			await execa(cmd.command, cmd.args, {
				cwd,
			});
		}
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
