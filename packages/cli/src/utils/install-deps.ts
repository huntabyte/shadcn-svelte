import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import * as p from "@clack/prompts";
import semver from "semver";
import { resolveCommand, type Agent } from "package-manager-detector";
import { exec } from "tinyexec";
import * as project from "./project.js";
import { detectPM } from "./auto-detect.js";
import { error } from "./errors.js";
import { silentOutput } from "./node-utils.js";
import type { PackageJson } from "type-fest";

type InstallOptions = {
	dependencies: string[];
	devDependencies: string[];
	cwd: string;
	prompt: boolean;
	silent?: boolean;
	/**
	 * When `false`, write deps to package.json without running the package manager install.
	 * @default `true`
	 */
	install?: boolean;
};

type NeededDep = {
	name: string;
	version: string;
	section?: DepSection;
};

type DepSection = "dependencies" | "devDependencies";

export async function installDependencies({
	cwd,
	prompt,
	dependencies,
	devDependencies,
	silent,
	install = true,
}: InstallOptions): Promise<void> {
	const pm = await detectPM(cwd, prompt);

	const pkg = project.getPackageInfo(cwd);

	const mapNeededDep = (dep: string, preferred?: DepSection): NeededDep | undefined => {
		const { name, version } = parseDependency(dep);
		const inDeps = pkg.dependencies?.[name];
		const inDevDeps = pkg.devDependencies?.[name];
		const existing = inDeps ?? inDevDeps;
		const depVersion = semver.coerce(existing);

		// If the dependency is already installed and satisfies the requested version, skip it.
		if (depVersion && semver.satisfies(depVersion, version, { loose: true })) {
			return;
		}

		// Stay in the existing section when present; otherwise use the preferred target.
		if (inDeps !== undefined) return { name, version, section: "dependencies" };
		if (inDevDeps !== undefined) return { name, version, section: "devDependencies" };

		return { name, version, section: preferred };
	};

	if (!install) {
		const needed = [
			...dependencies.map((dep) => mapNeededDep(dep, "dependencies")),
			...devDependencies.map((dep) => mapNeededDep(dep, "devDependencies")),
		].filter((dep) => dep !== undefined);

		if (needed.length === 0) return;

		await writeDependencies({
			cwd,
			pm,
			dependencies: needed.filter((d) => d.section === "dependencies"),
			devDependencies: needed.filter((d) => d.section === "devDependencies"),
			silent,
		});
		return;
	}

	const neededDevDeps = devDependencies.map((d) => mapNeededDep(d)).filter((d) => d !== undefined);
	const neededDeps = dependencies.map((d) => mapNeededDep(d)).filter((d) => d !== undefined);

	if (!pm || (neededDeps.length === 0 && neededDevDeps.length === 0)) return;

	// Deno requires the `npm:` specifier
	const pkgSpecifier = pm === "deno" ? "npm:" : "";
	const deps = neededDeps.map((d) => `${pkgSpecifier}${d.name}@${d.version}`);
	const devDeps = neededDevDeps.map((d) => `${pkgSpecifier}${d.name}@${d.version}`);

	const addDevDeps = resolveCommand(pm, "add", ["-D", ...devDeps]);
	const addDeps = resolveCommand(pm, "add", deps);

	if (!addDevDeps || !addDeps) throw error(`Could not detect a package manager in ${cwd}.`);

	const task = p.taskLog({
		title: `Installing dependencies with ${pm}...`,
		limit: Math.ceil(process.stdout.rows / 2),
		spacing: 0,
		retainLog: true,
		output: silent ? silentOutput : process.stdout,
	});

	const runInstall = (cmd: string, args: string[]) => {
		const proc = exec(cmd, args, { throwOnError: true, nodeOptions: { cwd } });

		proc.process?.stdout?.on("data", (data) => task.message(data.toString(), { raw: true }));
		proc.process?.stderr?.on("data", (data) => task.message(data.toString(), { raw: true }));

		return proc;
	};

	try {
		if (deps.length > 0) {
			await runInstall(addDeps.command, addDeps.args);
		}

		if (devDeps.length > 0) {
			await runInstall(addDevDeps.command, addDevDeps.args);
		}

		task.success("Successfully installed dependencies");
	} catch {
		task.error("Failed to install dependencies");
		throw error("Operation failed.");
	}
}

type WriteDependenciesOptions = {
	cwd: string;
	pm?: Agent;
	dependencies: NeededDep[];
	devDependencies: NeededDep[];
	silent?: boolean;
};

async function writeDependencies({
	cwd,
	pm,
	dependencies,
	devDependencies,
	silent,
}: WriteDependenciesOptions): Promise<void> {
	const task = p.taskLog({
		title: "Adding dependencies to package.json...",
		limit: Math.ceil(process.stdout.rows / 2),
		spacing: 0,
		retainLog: true,
		output: silent ? silentOutput : process.stdout,
	});

	try {
		const resolveWriteVersion = async ({ name, version }: NeededDep) => {
			if (semver.validRange(version, { loose: true })) {
				return version;
			}

			const resolved = await resolveDependencyVersion({ cwd, pm, name, version });
			// If the dependency's version is resolvable via the package manager,
			// then we'll return the resolved version with a caret prefix.
			return resolved ? `^${resolved}` : version;
		};

		const resolvedDeps = await Promise.all(
			dependencies.map(async (dep) => ({
				name: dep.name,
				version: await resolveWriteVersion(dep),
			}))
		);
		const resolvedDevDeps = await Promise.all(
			devDependencies.map(async (dep) => ({
				name: dep.name,
				version: await resolveWriteVersion(dep),
			}))
		);

		writePackageDependencies(cwd, resolvedDeps, resolvedDevDeps);
		task.success("Successfully added dependencies to package.json");
	} catch (e) {
		task.error("Failed to add dependencies to package.json");
		throw e;
	}
}

function writePackageDependencies(
	cwd: string,
	dependencies: NeededDep[],
	devDependencies: NeededDep[]
): void {
	// TODO: perhaps use find.up("package.json", { cwd }) instead?
	const packageJsonPath = path.resolve(cwd, "package.json");
	const raw = fs.readFileSync(packageJsonPath, "utf8");
	const pkg = JSON.parse(raw) as PackageJson;

	if (dependencies.length > 0) {
		pkg.dependencies ??= {};
		for (const dep of dependencies) {
			pkg.dependencies[dep.name] = dep.version;
		}
		pkg.dependencies = sortDependencies(pkg.dependencies as Record<string, string>);
	}

	if (devDependencies.length > 0) {
		pkg.devDependencies ??= {};
		for (const dep of devDependencies) {
			pkg.devDependencies[dep.name] = dep.version;
		}
		pkg.devDependencies = sortDependencies(pkg.devDependencies as Record<string, string>);
	}

	const indent = detectIndent(raw);
	const trailingNewline = raw.endsWith("\n") ? "\n" : "";
	fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, indent) + trailingNewline, "utf8");
}

/** Sorts dependencies by package name in alphabetical order */
function sortDependencies(deps: Record<string, string>): Record<string, string> {
	return Object.fromEntries(Object.entries(deps).sort(([a], [b]) => a.localeCompare(b)));
}

function detectIndent(content: string): string {
	const match = content.match(/\n([\t ]+)\S/);
	return match?.[1] ?? "\t";
}

type ResolveDependencyVersionOptions = {
	cwd: string;
	pm?: Agent;
	name: string;
	version: string;
};

async function resolveDependencyVersion({
	cwd,
	pm,
	name,
	version,
}: ResolveDependencyVersionOptions): Promise<string | undefined> {
	if (pm && pm !== "deno") {
		const resolved = await runViewCommand(cwd, getViewCommand(pm, name, version));
		if (resolved) return resolved;
	}

	if (pm !== "npm") {
		const resolved = await runViewCommand(cwd, {
			command: "npm",
			args: ["view", `${name}@${version}`, "version"],
		});
		if (resolved) return resolved;
	}
}

function getViewCommand(
	pm: Agent,
	name: string,
	tag: string
): { command: string; args: string[] } | undefined {
	switch (pm) {
		case "npm":
			return { command: "npm", args: ["view", `${name}@${tag}`, "version"] };
		case "pnpm":
		case "pnpm@6":
			return { command: "pnpm", args: ["view", `${name}@${tag}`, "version"] };
		case "yarn":
			return { command: "yarn", args: ["info", `${name}@${tag}`, "version"] };
		case "yarn@berry":
			return {
				command: "yarn",
				args: ["npm", "info", `${name}@${tag}`, "--fields", "version"],
			};
		case "bun":
			return { command: "bun", args: ["info", `${name}@${tag}`, "version"] };
		case "deno":
		default:
			return;
	}
}

async function runViewCommand(
	cwd: string,
	cmd: { command: string; args: string[] } | undefined
): Promise<string | undefined> {
	if (!cmd) return undefined;

	try {
		const result = await exec(cmd.command, cmd.args, { throwOnError: true, nodeOptions: { cwd } });
		return extractVersion(result.stdout);
	} catch {
		return undefined;
	}
}

function extractVersion(stdout: string): string | undefined {
	const trimmed = stdout.trim();
	if (!trimmed) return undefined;

	// Prefer a top-level JSON `version` field (yarn berry --json, etc.)
	try {
		const lines = trimmed.split("\n").filter((line) => line.trim().startsWith("{"));
		for (const line of lines) {
			const parsed = JSON.parse(line) as { version?: unknown; data?: { version?: unknown } };
			const version = parsed.version ?? parsed.data?.version;
			if (typeof version === "string" && semver.valid(version)) {
				return version;
			}
		}
	} catch {
		// fall through to line scanning
	}

	const lines = trimmed
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
	for (let i = lines.length - 1; i >= 0; i--) {
		const line = lines[i]!;
		if (semver.valid(line)) return line;
	}
}

export function parseDependency(dep: string) {
	let name: string | undefined = dep;
	let version: string | undefined = "latest";

	if (dep.startsWith("@")) {
		if (dep.includes("@", 1)) {
			[, name, version] = dep.split(/(.*)(?:@)(.*)/);
		}
	} else {
		if (dep.includes("@", 1)) {
			[name, version] = dep.split("@");
		}
	}

	if (!name || !version) throw error(`Failed to parse dependency: ${dep}`);

	return { name, version };
}
