import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	let layout = event.cookies.get("PaneForge:layout");
	let collapsed = event.cookies.get("PaneForge:collapsed");

	if (layout && collapsed) {
		layout = JSON.parse(layout);
		collapsed = JSON.parse(collapsed);
	}

	return { title: "Mail Example", layout, collapsed };
};
