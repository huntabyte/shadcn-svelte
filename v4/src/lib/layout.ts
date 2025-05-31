import type { Cookies } from "@sveltejs/kit";
import { Context, PersistedState, watch } from "runed";
import { useCookie } from "./hooks/use-cookie.svelte.js";

export const LAYOUTS = ["fixed", "full"] as const;

export type Layout = (typeof LAYOUTS)[number];

export const LayoutContext = new Context<PersistedState<Layout>>("LayoutContext");

export function parseLayoutCookie(cookies: Cookies): Layout {
	const layout = cookies.get("scn_layout");
	if (!layout) return "full";
	return layout as Layout;
}

export function setLayoutContext(getLayout: () => Layout) {
	const layout = LayoutContext.set(new PersistedState<Layout>("scn-layout", "full"));

	watch.pre(
		() => getLayout(),
		() => {
			layout.current = getLayout();
		}
	);

	useCookie({
		value: () => layout.current,
		name: "scn_layout",
	});

	return layout;
}
