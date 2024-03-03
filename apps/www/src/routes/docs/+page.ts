import type { DocResolver } from "$lib/types/docs.js";
import type { PageLoad } from "./$types.js";
import { error } from "@sveltejs/kit";
import { slugFromPath } from "$lib/utils.js";

export const load: PageLoad = async () => {
	// there's definitely a better way to do this for the index page
	// but I'll sort this out later - works for now :)
	const modules = import.meta.glob(`/src/content/**/index.md`);

	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === "index") {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	const doc = await match?.resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}
	return {
		component: doc.default,
		metadata: doc.metadata,
		title: doc.metadata.title,
	};
};
