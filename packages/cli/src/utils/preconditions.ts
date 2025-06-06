import color from "chalk";
import * as semver from "semver";
import { getProjectPackageInfo } from "./get-package-info.js";
import { log } from "@clack/prompts";
import { getPadding } from "./prompt-helpers.js";

const peerDependencies: Record<string, string> = {
	svelte: "5.x.x",
	tailwindcss: "4.x.x",
};

export function checkPreconditions(cwd: string) {
	const pkg = getProjectPackageInfo(cwd);

	const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

	checkDependencies(dependencies);
}

/**
 * Checks that all dependencies meet peer dependency requirements and logs a warning if they don't.
 */
function checkDependencies(dependencies: Partial<Record<string, string>>) {
	const incompatible: [string, string][] = [];

	for (const [name, version] of Object.entries(dependencies)) {
		const targetVersion = peerDependencies[name];
		const currentVersion = semver.coerce(version);

		if (!targetVersion || !currentVersion) continue;

		if (!semver.satisfies(currentVersion, targetVersion)) {
			incompatible.push([
				`${color.bold(`${name}@`)}${color.greenBright.bold(targetVersion)}`,
				color.yellowBright.bold(currentVersion),
			]);
		}
	}

	if (incompatible.length > 0) {
		const padding = getPadding(incompatible.map(([target]) => target));

		const lines = incompatible
			.map(([target, current]) => `  need ${target.padEnd(padding)}  >>  found ${current}`)
			.join("\n");

		log.warn(
			`Incompatible dependency versions detected:\n\n${lines}\n\n${color.white.bold("Use at your own risk!")}`
		);
	}
}
