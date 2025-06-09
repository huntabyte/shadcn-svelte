import { getDoc } from "$lib/docs.js";
import type { HighlightedBlock } from "../../../api/block/[block]/+server.js";
import type { EntryGenerator, PageLoad } from "./$types.js";

export const prerender = true;

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

export const load: PageLoad = async ({ params, fetch }) => {
	const doc = await getDoc(params.slug);
	if (params.slug.includes("components/")) {
		const name = params.slug.replaceAll("components/", "");
		const res = await fetch(`/api/block/${name}`);
		const item = (await res.json().catch(() => null)) as HighlightedBlock | null;

		return { ...doc, viewerData: item };
	}

	return { ...doc, viewerData: null };
};
