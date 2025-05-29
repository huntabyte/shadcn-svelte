import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const activeTheme = cookies.get("active_theme");

	return {
		activeTheme,
	};
};
