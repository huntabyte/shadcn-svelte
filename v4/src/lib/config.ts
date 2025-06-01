import type { Cookies } from "@sveltejs/kit";
import { Context, PersistedState, watch } from "runed";
import { useCookie } from "./hooks/use-cookie.svelte.js";

export type ConfigOptions<T extends readonly string[]> = {
	key: string;
	values: T;
	defaultValue: T[number];
};

export type ConfigManager<T extends string> = {
	context: Context<PersistedState<T>>;
	parseFromCookie: (cookies: Cookies) => T;
	setContext: (getValue: () => T) => PersistedState<T>;
};

export function createConfig<T extends readonly string[]>(
	options: ConfigOptions<T>
): ConfigManager<T[number]> {
	const { key, values, defaultValue } = options;
	const cookieKey = key.replace(/-/g, "_");

	type Value = T[number];

	const context = new Context<PersistedState<Value>>(`${key}Context`);

	function parseFromCookie(cookies: Cookies): Value {
		const value = cookies.get(cookieKey);
		if (!value || !values.includes(value as Value)) return defaultValue;
		return value as Value;
	}

	function setContext(getValue: () => Value): PersistedState<Value> {
		const state = context.set(new PersistedState<Value>(key, getValue()));

		watch.pre(
			() => getValue(),
			() => {
				state.current = getValue();
			}
		);

		useCookie({
			value: () => state.current,
			name: cookieKey,
		});

		return state;
	}

	return {
		context,
		parseFromCookie,
		setContext,
	};
}

export const siteConfig = {
	name: "shadcn-svelte",
	url: "https://shadcn-svelte.com",
	ogImage: "https://shadcn-svelte.com/og.png",
	description:
		"A set of beautifully-designed, accessible components and a code distribution platform. Open Source. Open Code.",
	links: {
		twitter: "https://x.com/huntabyte",
		github: "https://github.com/huntabyte/shadcn-svelte",
	},
	navItems: [
		{
			href: "/docs/installation",
			label: "Docs",
		},
		{
			href: "/docs/components",
			label: "Components",
		},
		{
			href: "/blocks",
			label: "Blocks",
		},
		{
			href: "/charts/area",
			label: "Charts",
		},
		{
			href: "/themes",
			label: "Themes",
		},
		{
			href: "/colors",
			label: "Colors",
		},
	],
};

export const META_THEME_COLORS = {
	light: "#ffffff",
	dark: "#09090b",
};
