import fs from "node:fs";
import path from "node:path";
import { detect, resolveCommand } from "package-manager-detector";

const SHADCN_SVELTE = "shadcn-svelte";

type CliCommand = "add" | "apply" | "init" | "mcp" | "registry" | "update";

export async function resolveShadcnCommand(
	command: CliCommand,
	args: string[] = [],
	cwd = process.cwd()
) {
	const pm = (await detect({ cwd }))?.agent ?? "npm";
	// Prefer the version installed in the project over the registry's latest.
	const local = isInstalled(cwd, SHADCN_SVELTE);
	const pkg = local ? SHADCN_SVELTE : `${SHADCN_SVELTE}@latest`;
	const cliArgs = [pkg, command, ...args];
	const resolved = resolveCommand(pm, local ? "execute-local" : "execute", cliArgs);
	if (!resolved) {
		return `npx ${cliArgs.join(" ")}`;
	}

	return [resolved.command, ...resolved.args].join(" ");
}

function isInstalled(cwd: string, depName: string) {
	for (let dir = path.resolve(cwd); ; dir = path.dirname(dir)) {
		if (fs.existsSync(path.join(dir, "node_modules", depName, "package.json"))) {
			return true;
		}
		if (dir === path.dirname(dir)) {
			return false;
		}
	}
}
