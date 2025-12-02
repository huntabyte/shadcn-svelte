import fs from "node:fs";
import path from "node:path";
import { exec } from "tinyexec";
import { detect, resolveCommand } from "package-manager-detector";
import { getProjectPackageInfo } from "./get-package-info.js";
import { CLIError } from "./errors.js";

// if it's a SvelteKit project, run `svelte-kit sync` if the `.svelte-kit` dir is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		if (fs.existsSync(path.join(cwd, ".svelte-kit"))) return;

		const agent = (await detect({ cwd }))?.agent ?? "npm";
		const cmd = resolveCommand(agent, "execute-local", ["svelte-kit", "sync"])!;

		try {
			await exec(cmd.command, cmd.args, { throwOnError: true, nodeOptions: { cwd } });
		} catch (e) {
			const failedCmd = `${cmd.command} ${cmd.args.join(" ")}`;
			const install = resolveCommand(agent, "install", [])!;
			const installCmd = `${install.command} ${install.args.join(" ")}`;

			throw new CLIError(
				`Failed to run '${failedCmd}'. Ensure that your dependencies have been installed first with '${installCmd}' and try again.`,
				{ cause: e }
			);
		}
	}
}

/**
 * Loads the user's `package.json` and check if `@sveltejs/kit` is a dependency.
 */
export function isUsingSvelteKit(cwd: string): boolean {
	const packageJSON = getProjectPackageInfo(cwd);
	const deps = { ...packageJSON.devDependencies, ...packageJSON.dependencies };
	return deps["@sveltejs/kit"] !== undefined;
}
