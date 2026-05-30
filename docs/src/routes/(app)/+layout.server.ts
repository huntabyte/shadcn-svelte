import { USER_CONFIG_COOKIE_NAME, userConfigSchema } from "$lib/user-config.svelte.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sidebarState = cookies.get("sidebar_state") === "true" ? true : false;

	const userConfigCookie = cookies.get(USER_CONFIG_COOKIE_NAME);
	let userConfig = userConfigSchema.parse({});

	try {
		userConfig = userConfigSchema.parse(userConfigCookie ? JSON.parse(userConfigCookie) : {});
	} catch {
		userConfig = userConfigSchema.parse({});
	}

	return { sidebarState, userConfig };
};
