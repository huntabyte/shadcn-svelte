import { error } from "@sveltejs/kit";
import type { EntryGenerator, PageServerLoad } from "./$types.js";
import { getAllBlockIds, isBlock } from "$lib/blocks.js";
import { blockMeta } from "$lib/config/blocks.js";
import { isStyle, styles } from "$lib/registry/styles.js";

export const prerender = true;

export const entries: EntryGenerator = async () => {
	console.info("Prerendering /blocks/[style]/[name]");
	const blockIds = getAllBlockIds();
	const entries = styles.flatMap((style) => {
		return blockIds.map((name) => ({ name, style: style.name }));
	});

	return entries;
};

export const load: PageServerLoad = async (event) => {
	const { name, style } = event.params;
	if (!isStyle(style)) error(404, "Style not found");
	if (!isBlock(name)) error(404, "Block not found");

	const { className, iframeHeight } = blockMeta[style][name];

	return {
		block: {
			name,
			style,
			container: {
				height: iframeHeight,
				className,
			},
		},
	};
};
