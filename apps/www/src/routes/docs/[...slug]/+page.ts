import type { PageLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
import { getDoc } from "$lib/utils.js";

export const load: PageLoad = async (event) => {
	if (event.params.slug === "components") {
		redirect(303, "/docs/components/accordion");
	}

	const { component, title, metadata } = await getDoc(event.params.slug);

	return {
		component,
		metadata,
		title,
		...event.data,
	};
};
