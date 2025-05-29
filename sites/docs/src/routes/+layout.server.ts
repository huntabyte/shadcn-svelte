import { parseConfigCookie } from "$lib/config-state.js";
import { parsePackageManagerCookie } from "$lib/package-manager.js";

export async function load({ cookies }) {
	const config = parseConfigCookie(cookies);
	const packageManager = parsePackageManagerCookie(cookies);

	return {
		config,
		packageManager,
	};
}
