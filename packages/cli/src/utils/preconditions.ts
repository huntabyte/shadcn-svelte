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

	if (pkg.dependencies) {
		for (const [name, version] of Object.entries(pkg.dependencies)) {
			const peerDepVersion = peerDependencies[name];

			if (!peerDepVersion || !version) continue;

			if (!semver.satisfies(version, peerDepVersion)) {
				log.warn(
					`This version of ${color.bold("shadcn-svelte")} is intended for use with ${name}@${peerDepVersion}. Use at your own risk.`
				);
			}
		}
	}

	if (pkg.devDependencies) {
		for (const [name, version] of Object.entries(pkg.devDependencies)) {
			const peerDepVersion = peerDependencies[name];

			if (!peerDepVersion || !version) continue;

			if (!semver.satisfies(version, peerDepVersion)) {
				log.warn(
					`${color.bold("shadcn-svelte")} is intended for use with ${name}@${peerDepVersion}. Use at your own risk.`
				);
			}
		}
	}
};
