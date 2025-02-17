import color from "chalk";
import semver from "semver";
import { loadProjectPackageInfo } from "./get-package-info";
import { log } from "./prompts";

const peerDependencies: Record<string, string> = {
	svelte: "5.x",
	tailwindcss: "3.x",
};

export const checkPreconditions = (cwd: string) => {
	const pkg = loadProjectPackageInfo(cwd);

	checkDependencies(pkg.dependencies);
	checkDependencies(pkg.devDependencies);
};

/** Checks that all dependencies meet peer dependency requirements and logs a warning if they don't.
 *
 * @param dependencies
 */
const checkDependencies = (dependencies: Partial<Record<string, string>> | undefined) => {
	if (dependencies) {
		for (const [name, version] of Object.entries(dependencies)) {
			const peerDepVersion = peerDependencies[name];

			if (!peerDepVersion || !version) continue;

			if (!semver.satisfies(version, peerDepVersion)) {
				log.warn(
					`This version of ${color.bold("shadcn-svelte")} is intended for use with ${color.bold(`${name}@${peerDepVersion}`)}. Use at your own risk!`
				);
			}
		}
	}
};
