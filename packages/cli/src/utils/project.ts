import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { exec } from "tinyexec";
import type { PackageJson } from "type-fest";
import { detect, resolveCommand } from "package-manager-detector";
import { readJSONSync } from "./get-package-info.js";
import { CLIError } from "./errors.js";
import type * as cliConfig from "./config/schema.js";
import type * as registry from "./registry/index.js";

export async function getComponents({
	registryIndex,
	config,
}: {
	registryIndex: Awaited<ReturnType<typeof registry.getRegistryIndex>>;
	config: cliConfig.ResolvedConfig;
}) {
	const dirs = {
		ui: config.resolvedPaths.ui,
		components: config.resolvedPaths.components,
		hooks: config.resolvedPaths.hooks,
	};

	const existingComponents: typeof registryIndex = [];
	for (const dir of Object.values(dirs)) {
		if (!existsSync(dir)) continue;

		const files = await fs.readdir(dir, { withFileTypes: true });
		for (const file of files) {
			if (file.isDirectory()) {
				const item = registryIndex.find((item) => item.name === file.name);
				// is a valid shadcn item
				if (item) existingComponents.push(item);
			}
		}
	}

	// Always offer to update the `utils`
	const utilsItem = registryIndex.find((item) => item.name === "utils");
	if (utilsItem) {
		existingComponents.push(utilsItem);
	}

	return existingComponents;
}

// if it's a SvelteKit project, run `svelte-kit sync` if the `.svelte-kit` dir is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		if (existsSync(path.join(cwd, ".svelte-kit"))) return;

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
	const packageJSON = getPackageInfo(cwd);
	const deps = { ...packageJSON.devDependencies, ...packageJSON.dependencies };
	return deps["@sveltejs/kit"] !== undefined;
}

export function getPackageInfo(cwd: string) {
	const packageJsonPath = path.resolve(cwd, "package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}
