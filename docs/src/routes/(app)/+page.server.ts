import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (event) => {
	const collapsedCookie = event.cookies.get("PaneForge:collapsed");

	let collapsed: boolean | undefined;

	if (collapsedCookie) collapsed = JSON.parse(collapsedCookie);

	return { collapsed };
};
