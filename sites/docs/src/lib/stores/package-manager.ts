import type { Agent, Command, ResolvedCommand } from "package-manager-detector";
import { resolveCommand } from "package-manager-detector/commands";
import { PersistedState, Context } from "runed";

const PackageManagerContext = new Context<PersistedState<Agent>>("PackageManagerContext");

export const PACKAGE_MANAGERS: Agent[] = ["pnpm", "npm", "bun", "yarn"] as const;

export function setPackageManager(initialValue: Agent = "npm") {
	return PackageManagerContext.set(new PersistedState<Agent>("packageManager", initialValue));
}

export function getPackageManager() {
	return PackageManagerContext.get();
}

export type PackageManagerCommand = Command | "create";

export function getCommand(
	pm: Agent,
	type: PackageManagerCommand,
	command: string | string[]
): ResolvedCommand {
	let args = [];
	if (typeof command === "string") {
		args = command.split(" ");
	} else {
		args = command;
	}

	// special handling for create
	if (type === "create") return { command: pm, args: ["create", ...args] };

	const cmd = resolveCommand(pm, type, args);

	// since docs are static any unresolved command is a code error
	if (cmd === null) throw new Error("Could not resolve command!");

	return cmd;
}
