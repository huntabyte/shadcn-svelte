import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types.js";
import { getAllBlockIds, isBlock } from "$lib/blocks.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

export const prerender = true;

export const entries: EntryGenerator = async () => {
	console.info("Prerendering /blocks/[name]");
	const blockIds = getAllBlockIds();

	return blockIds.map((name) => ({ name }));
};

export const load: PageServerLoad = async (event) => {
	const { name } = event.params;
	if (!isBlock(name)) error(404, "Block not found");

	const { className, iframeHeight } = blockMeta[name];

	return {
		block: {
			name,
			container: {
				height: iframeHeight,
				className,
			},
		},
	};
};
