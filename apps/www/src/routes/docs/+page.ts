import { error } from "@sveltejs/kit";
import type { DocResolver } from "$lib/types/docs.js";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	// there's definitely a better way to do this for the index page
	// but I'll sort this out later - works for now :)
	const modules = import.meta.glob(`/src/content/**/index.md`);

	let resolver;

	for (const [path, res] of Object.entries(modules)) {
		if (path === "/src/content/index.md") {
			resolver = res as DocResolver;
			break;
		}
	}

	const doc = await resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}
	return {
		component: doc.default,
		metadata: doc.metadata,
		title: doc.metadata.title,
	};
};
