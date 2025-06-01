import { getDoc } from "$lib/docs.js";
import type { EntryGenerator } from "./$types.js";

export async function load({ params }) {
	return await getDoc(params.slug);
}

export const entries: EntryGenerator = () => {
	console.info("Prerendering /docs");
	const modules = import.meta.glob("/content/**/*.md");
	const entries = [];

	for (const path of Object.keys(modules)) {
		const slug = path.replace("/content/", "").replace(".md", "").replace("/index", "");
		entries.push({ slug });
	}

	return entries;
};
