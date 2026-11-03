import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ params, url }) => {
	const search = new URLSearchParams(url.search);
	search.set("item", params.item);
	redirect(308, `/create?${search}`);
};
