import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	return {
		title: "Dashboard Example",
	};
};
