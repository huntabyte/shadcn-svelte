import { getBlock } from "$lib/blocks.js";
import { isStyle } from "$lib/registry/styles.js";
import { error } from "@sveltejs/kit";

export const load = async (event) => {
	const { name, style } = event.params;
	if (!isStyle(style)) error(404, "Style not found");

	const block = await getBlock(name, style);

	const component = block.component ? await block.component() : null;

	if (!block) error(404, "Block not found");

	return {
		block: {
			...block,
			component,
		},
	};
};
