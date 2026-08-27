import path from "node:path";
import { existsSync, promises as fs, readFileSync } from "node:fs";
import semver from "semver";
import { detect, resolveCommand } from "package-manager-detector";
import { exec } from "tinyexec";
import { CLIError } from "./errors.js";
import { getDependencyPackageInfo, readJSONSync } from "./get-package-info.js";
import type * as cliConfig from "./config/schema.js";
import type * as registry from "./registry/index.js";
import type { PackageJson } from "type-fest";

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

// if it's a SvelteKit project, run `svelte-kit sync` if its generated config is missing
export async function syncSvelteKit(cwd: string) {
	const isSvelteKit = isUsingSvelteKit(cwd);
	if (isSvelteKit) {
		// we'll exit early since syncing is rather slow
		const generatedConfig = isUsingSvelteKitV3(cwd)
			? path.join(cwd, "node_modules", "$app", "tsconfig.json")
			: path.join(cwd, ".svelte-kit");
		if (existsSync(generatedConfig)) return;

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

export function isUsingSvelteKitV3(cwd: string): boolean {
	const packageJSON = getPackageInfo(cwd);
	const deps = { ...packageJSON.devDependencies, ...packageJSON.dependencies };
	const declaredVersion = deps["@sveltejs/kit"];
	if (typeof declaredVersion !== "string") return false;

	const declaredRange = semver.validRange(declaredVersion);
	if (declaredRange) {
		const rangeOptions = { includePrerelease: true };
		const allowsV2 = semver.intersects(declaredRange, ">=2.0.0-0 <3.0.0-0", rangeOptions);
		const allowsV3 = semver.intersects(declaredRange, ">=3.0.0-0 <4.0.0-0", rangeOptions);
		if (allowsV2 !== allowsV3) return allowsV3;
	}

	for (const filename of ["tsconfig.json", "jsconfig.json"]) {
		const configPath = path.join(cwd, filename);
		if (!existsSync(configPath)) continue;

		const contents = readFileSync(configPath, "utf8");
		if (/"extends"\s*:\s*"\$app\/tsconfig(?:\.json)?"/.test(contents)) return true;
		if (/"extends"\s*:\s*"(?:\.\/)?\.svelte-kit\/tsconfig(?:\.json)?"/.test(contents)) {
			return false;
		}
	}

	const installedVersion = getDependencyPackageInfo(cwd, "@sveltejs/kit")?.pkg.version;
	return (
		typeof installedVersion === "string" &&
		semver.valid(installedVersion) !== null &&
		semver.major(installedVersion) === 3
	);
}

export function getPackageInfo(cwd: string) {
	const packageJsonPath = path.resolve(cwd, "package.json");
	return readJSONSync(packageJsonPath) as PackageJson;
}
