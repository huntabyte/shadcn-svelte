import { detect, resolveCommand } from "package-manager-detector";

const SHADCN_SVELTE_CLI_COMMAND = "shadcn-svelte@latest";

export async function npxShadcnSvelte(command: string, cwd = process.cwd()) {
	const pm = (await detect({ cwd }))?.agent ?? "npm";
	const resolved = resolveCommand(pm, "execute", [
		SHADCN_SVELTE_CLI_COMMAND,
		...command.split(/\s+/).filter(Boolean),
	]);
	if (!resolved) {
		return `npx ${SHADCN_SVELTE_CLI_COMMAND} ${command}`;
	}

	return [resolved.command, ...resolved.args].join(" ");
}
