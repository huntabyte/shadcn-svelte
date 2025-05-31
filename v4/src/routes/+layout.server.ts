import { parseInstallationTypeCookie } from "$lib/installation-type.js";
import { parsePackageManagerCookie } from "$lib/package-manager.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const activeTheme = cookies.get("active_theme");
	const packageManager = parsePackageManagerCookie(cookies);
	const installationType = parseInstallationTypeCookie(cookies);

	return {
		activeTheme,
		packageManager,
		installationType,
	};
};
