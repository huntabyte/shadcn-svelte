import type { PageServerLoad } from "./$types.js";
import { getAllBlockIds, getBlock } from "$lib/blocks.js";
import { blockNames } from "$lib/registry/schema.js";
import { styles } from "$lib/registry/styles.js";

export const prerender = true;

export const load: PageServerLoad = async () => {
	const blocks = [];
	const blockIds = getAllBlockIds();

	for (const style of styles) {
		const styledBlocks = await Promise.all(blockIds.map((name) => getBlock(name, style.name)));

		// `blockNames` is the order in-which the blocks should appear
		for (const name of blockNames) {
			const block = styledBlocks.find((b) => b.name === name);
			if (!block) throw new Error(`Missing block ${name} for style ${style.name}`);

			blocks.push(block);
		}
	}

	return {
		blocks,
	};
};
