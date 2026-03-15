import { getChangelogPages, getDoc } from "$lib/docs.js";
import type { HighlightedBlock } from "../../../../api/block/[block]/+server.js";
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

/**
 * Any components / blocks that won't have a .json file associated with them.
 */
const ITEMS_TO_IGNORE = ["combobox", "date-picker", "typography"];

export const load: PageLoad = async ({ params, fetch }) => {
	const doc = await getDoc(params.slug);
	const isChangelogIndex = params.slug === "changelog";

	if (isChangelogIndex) {
		const changelogPages = await getChangelogPages();

		return {
			...doc,
			viewerData: null,
			changelogIndex: {
				latestPages: changelogPages.slice(0, 5),
				olderPages: changelogPages.slice(5),
			},
		};
	}

	const name = doc.metadata.slug;
	if (params.slug.includes("components/") && !ITEMS_TO_IGNORE.includes(name)) {
		const res = await fetch(`/api/block/${name}`);
		const item: HighlightedBlock = await res.json();

		return { ...doc, viewerData: item, changelogIndex: null };
	}

	return { ...doc, viewerData: null, changelogIndex: null };
};
