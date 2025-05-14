import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
	const sidebarState = cookies.get("sidebar_state") === "true" ? true : false;

	return {
		sidebarState,
	};
};
