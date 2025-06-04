import type { LayoutServerLoad } from "./$types.js";
import { parseUserConfig, USER_CONFIG_COOKIE_NAME } from "$lib/user-config.svelte.js";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const userConfig = parseUserConfig(cookies.get(USER_CONFIG_COOKIE_NAME) ?? "");

	return {
		userConfig,
	};
};
