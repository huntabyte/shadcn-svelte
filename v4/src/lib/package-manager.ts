import { createConfig } from "./config.js";
import { resolveCommand } from "package-manager-detector/commands";
import type { Agent, Command, ResolvedCommand } from "package-manager-detector";

export const PACKAGE_MANAGERS: Agent[] = ["pnpm", "npm", "bun", "yarn"] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const packageManagerConfig = createConfig({
	key: "scn-package-manager",
	values: PACKAGE_MANAGERS,
	defaultValue: "npm",
});

export const PackageManagerContext = packageManagerConfig.context;
export const parsePackageManagerCookie = packageManagerConfig.parseFromCookie;
export const setPackageManagerContext = packageManagerConfig.setContext;

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
