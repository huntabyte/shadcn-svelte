import type { Cookies } from "@sveltejs/kit";
import { type Agent, type Command, type ResolvedCommand } from "package-manager-detector";
import { resolveCommand } from "package-manager-detector/commands";
import { Context, PersistedState, watch } from "runed";
import { useCookie } from "./hooks/use-cookie.svelte.js";

export const PACKAGE_MANAGERS: Agent[] = ["pnpm", "npm", "bun", "yarn"] as const;

export const PackageManagerContext = new Context<PersistedState<Agent>>("PackageManagerContext");

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

export function parsePackageManagerCookie(cookies: Cookies): Agent {
	const pm = cookies.get("scn_package_manager");
	if (!pm) return "npm";
	return pm as Agent;
}

export function setPackageManagerContext(pm: () => Agent) {
	const packageManager = PackageManagerContext.set(
		new PersistedState<Agent>("scn-package-manager", pm())
	);

	watch.pre(
		() => pm(),
		() => {
			packageManager.current = pm();
		}
	);

	useCookie({
		value: () => packageManager.current,
		name: "scn_package_manager",
	});

	return packageManager;
}
