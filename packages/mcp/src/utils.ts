import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { AGENTS, detect, resolveCommand, type AgentName } from "package-manager-detector";
import { LOCKS } from "package-manager-detector/constants";

const SHADCN_SVELTE = "shadcn-svelte";

type CliCommand = "add" | "apply" | "init" | "mcp" | "registry" | "update";

export async function resolveShadcnCommand(
	command: CliCommand,
	args: string[] = [],
	cwd = process.cwd()
) {
	const pm = (await detect({ cwd }))?.agent ?? "npm";
	// Prefer the version installed in the project over the registry's latest, unless it's
	// yarn@berry, because it wants to be quirky and different from the rest so we're just
	// going to make them use the latest version from the registry instead.
	const local = pm !== "yarn@berry" && isInstalled(cwd, SHADCN_SVELTE);
	const pkg = local ? SHADCN_SVELTE : `${SHADCN_SVELTE}@latest`;
	return resolveCommand(pm, local ? "execute-local" : "execute", [pkg, command, ...args])!;
}

// Stop at the directory with the lockfile since that's where the package manager installs the bin.
// A few package managers (yarn@1 and pnpm) wouldn't be able to find it above this directory.
function isInstalled(cwd: string, depName: string) {
	for (let dir = path.resolve(cwd); ; dir = path.dirname(dir)) {
		if (fs.existsSync(path.join(dir, "node_modules", depName, "package.json"))) {
			return true;
		}
		const hasLockfile = Object.keys(LOCKS).some((file) => fs.existsSync(path.join(dir, file)));
		if (hasLockfile || dir === path.dirname(dir)) {
			return false;
		}
	}
}

/** The package managers whose commands are on the `PATH`. */
export function getInstalledAgents(): AgentName[] {
	return AGENTS.filter((agent): agent is AgentName => !agent.includes("@")).filter((agent) =>
		commandExists(resolveCommand(agent, "install", [])!.command)
	);
}

function commandExists(command: string): boolean {
	// `command -v` is built into every POSIX shell and `where` comes with Windows.
	const check = process.platform === "win32" ? "where" : "command -v";
	try {
		execSync(`${check} ${command}`, { stdio: "ignore" });
		return true;
	} catch {
		return false;
	}
}
