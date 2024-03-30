import { redirect } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types.js";
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
	};
};

export const entries: EntryGenerator = () => {
	console.info("Prerendering /docs");
	const modules = import.meta.glob("/src/content/**/*.md");
	const entries = [];

	for (const path of Object.keys(modules)) {
		const slug = path.replace("/src/content/", "").replace(".md", "").replace("/index", "");
		entries.push({ slug });
	}

	return entries;
};
