import { getContext, setContext } from "svelte";
import { persisted } from "svelte-persisted-store";
import type { Agent, Command, ResolvedCommand } from "package-manager-detector";
import { resolveCommand } from "package-manager-detector/commands";

export const PACKAGE_MANAGERS: Agent[] = ["pnpm", "npm", "bun", "yarn"] as const;

const PACKAGE_MANAGER = Symbol("packageManager");

export function setPackageManager(initialValue: Agent = "npm") {
	const packageManager = createPackageManagerStore("packageManager", initialValue);
	setContext(PACKAGE_MANAGER, packageManager);
	return packageManager;
}

export function getPackageManager(): ReturnType<typeof setPackageManager> {
	return getContext(PACKAGE_MANAGER);
}

function createPackageManagerStore(key: string, initialValue: Agent) {
	const store = persisted(key, initialValue);
	return store;
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
