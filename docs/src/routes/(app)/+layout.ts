import { browser } from "$app/environment";
import { parseUserConfig } from "$lib/user-config.svelte.js";
import type { LayoutLoad } from "./$types.js";

export const load: LayoutLoad = ({ data }) => {
	if (!browser) return { userConfig: data.userConfig };

	return { userConfig: parseUserConfig(document.cookie) };
};
