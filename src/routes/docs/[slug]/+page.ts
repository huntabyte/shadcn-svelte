import type { Metadata } from "$lib/types/doc";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
	try {
		const doc = await import(`../${event.params.slug}.md`);

		return {
			component: doc.default,
			meta: doc.metadata as Metadata
		};
	} catch (e) {
		throw error(404, "Not found");
	}
};
