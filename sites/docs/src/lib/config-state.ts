import type { Theme } from "$lib/registry/themes.js";
import type { Cookies } from "@sveltejs/kit";
import { PersistedState, Context, watch } from "runed";
import { useCookie } from "./hooks/use-cookie.svelte.js";

type Config = {
	theme: Theme["name"];
	radius: number;
};

const DEFAULT_CONFIG: Config = {
	theme: "zinc",
	radius: 0.5,
};

export const ConfigContext = new Context<PersistedState<Config>>("ConfigContext");

export function parseConfigCookie(cookies: Cookies) {
	const config = cookies.get("scn_config");
	if (!config) return DEFAULT_CONFIG;
	try {
		return JSON.parse(config) as Config;
	} catch {
		return DEFAULT_CONFIG;
	}
}

export function setConfigContext(config: () => Config) {
	const configState = ConfigContext.set(new PersistedState<Config>("scn-config", config()));

	watch.pre(
		() => config(),
		() => {
			configState.current = config();
		}
	);

	useCookie({
		value: () => configState.current,
		name: "scn_config",
	});

	return configState;
}
