import semver from "semver";
import { detectPM } from "./auto-detect.js";
import { loadProjectPackageInfo } from "./get-package-info.js";
import { highlight, parseDependency } from "./utils.js";
import { exec } from "tinyexec";
import { resolveCommand } from "package-manager-detector";
import { error } from "./errors.js";
import type { Task } from "@clack/prompts";

type InstallOptions = {
	dependencies: string[];
	devDependencies: string[];
	cwd: string;
	prompt: boolean;
};
export async function installDependencies({
	cwd,
	prompt,
	dependencies,
	devDependencies,
}: InstallOptions): Promise<Task | undefined> {
	const pm = await detectPM(cwd, prompt);
	if (!pm) return;

	const pkg = loadProjectPackageInfo(cwd);
	const projectDeps = { ...pkg.dependencies, ...pkg.devDependencies };

	const validateDep = (dep: string) => {
		const { name, version } = parseDependency(dep);
		const depVersion = semver.coerce(projectDeps[name]);
		if (depVersion && semver.satisfies(depVersion, version, { loose: true })) {
			return undefined;
		}
		return `${name}@${version}`;
	};

	const devDeps = devDependencies.map(validateDep).filter((d) => d !== undefined);
	const addDevDeps = resolveCommand(pm, "add", ["-D", ...devDeps]);

	const deps = dependencies.map(validateDep).filter((d) => d !== undefined);
	const addDeps = resolveCommand(pm, "add", deps);

	if (!addDevDeps || !addDeps) throw error(`Could not detect a package manager in ${cwd}.`);
	return {
		title: `${highlight(pm)}: Installing dependencies`,
		enabled: deps.length > 0 || devDeps.length > 0,
		async task() {
			if (deps.length > 0) {
				await exec(addDeps.command, addDeps.args, {
					throwOnError: true,
					nodeOptions: { cwd },
				});
			}
			if (devDeps.length > 0) {
				await exec(addDevDeps.command, addDevDeps.args, {
					throwOnError: true,
					nodeOptions: { cwd },
				});
			}
			return `Dependencies installed with ${highlight(pm)}`;
		},
	};
}
