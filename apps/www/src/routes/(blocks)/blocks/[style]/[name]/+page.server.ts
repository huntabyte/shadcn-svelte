import { getAllBlockIds, getBlock, isDemo } from "$lib/blocks.js";
import { isStyle, styles } from "$lib/registry/styles.js";
import { error } from "@sveltejs/kit";
import type { EntryGenerator } from "./$types.js";

export const prerender = true;

export const entries: EntryGenerator = async () => {
	console.log("Prerendering /blocks/[style]/[name]");
	const blockIds = await getAllBlockIds();
	const entries = styles.flatMap((style) => {
		return blockIds.map((name) => ({ name, style: style.name }));
	});

	return entries;
};

export const load = async (event) => {
	const { name, style } = event.params;
	if (!isStyle(style)) error(404, "Style not found");
	if (!isDemo(name)) error(404, "Block not found");

	const block = await getBlock(name, style);

	return {
		block: {
			name: name,
			style: style,
			container: block.container,
		},
	};
};
