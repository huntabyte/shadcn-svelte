import { parseInstallationTypeCookie } from "$lib/installation-type.js";
import { parseLayoutCookie } from "$lib/layout.js";
import { parsePackageManagerCookie } from "$lib/package-manager.js";
import { parseColorFormatCookie } from "$lib/color-format.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const activeTheme = cookies.get("active_theme");
	const packageManager = parsePackageManagerCookie(cookies);
	const installationType = parseInstallationTypeCookie(cookies);
	const layout = parseLayoutCookie(cookies);
	const colorFormat = parseColorFormatCookie(cookies);

	return {
		activeTheme,
		packageManager,
		installationType,
		layout,
		colorFormat,
	};
};
