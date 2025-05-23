import semver from "semver";
import * as p from "@clack/prompts";
import { detectPM } from "./auto-detect.js";
import { getProjectPackageInfo } from "./get-package-info.js";
import { parseDependency } from "./utils.js";
import { exec } from "tinyexec";
import { resolveCommand } from "package-manager-detector";
import { error } from "./errors.js";

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
}: InstallOptions): Promise<void> {
	const pm = await detectPM(cwd, prompt);
	if (!pm) return;

	const pkg = getProjectPackageInfo(cwd);
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

	const task = p.taskLog({
		title: `Installing dependencies with ${pm}...`,
		limit: Math.ceil(process.stdout.rows / 2),
		spacing: 0,
		retainLog: true,
	});

	const install = (cmd: string, args: string[]) => {
		const proc = exec(cmd, args, { throwOnError: true, nodeOptions: { cwd } });

		proc.process?.stdout?.on("data", (data) => task.message(data.toString(), { raw: true }));
		proc.process?.stderr?.on("data", (data) => task.message(data.toString(), { raw: true }));

		return proc;
	};

	try {
		if (deps.length > 0) {
			await install(addDeps.command, addDeps.args);
		}

		if (devDeps.length > 0) {
			await install(addDevDeps.command, addDevDeps.args);
		}

		task.success("Successfully installed dependencies");
	} catch {
		task.error("Failed to install dependencies");
		p.cancel("Operation failed.");
		process.exit(2);
	}
}
