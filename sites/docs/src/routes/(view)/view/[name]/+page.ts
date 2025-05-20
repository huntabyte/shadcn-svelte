import { getAllBlockIds, isBlock } from "$lib/blocks.js";
import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageLoad } from "./$types.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { Blocks } from "../../../../__registry__/blocks.js";

export const prerender = true;

export const entries: EntryGenerator = async () => {
	console.info("Prerendering /view/[name]");
	const blockIds = getAllBlockIds();

	return blockIds.map((name) => ({ name }));
};

export const load: PageLoad = async (event) => {
	const { name } = event.params;
	if (!isBlock(name)) error(404, "Block not found");

	const meta = blockMeta[name];
	const component = await Blocks[name].component();

	return {
		block: {
			name,
			container: {
				height: meta?.iframeHeight,
				className: meta?.className,
			},
			component,
		},
	};
};
