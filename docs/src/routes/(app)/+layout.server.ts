import { parseUserConfigJson, USER_CONFIG_COOKIE_NAME } from "$lib/user-config.svelte.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sidebarState = cookies.get("sidebar_state") === "true" ? true : false;

	const userConfigCookie = cookies.get(USER_CONFIG_COOKIE_NAME);
	const userConfig = parseUserConfigJson(userConfigCookie);

	return { sidebarState, userConfig };
};
