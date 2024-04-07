import type { PageServerLoad } from "./$types.js";
import { getAllBlockIds, getBlock } from "$lib/blocks.js";
import { blockNames } from "$lib/registry/schema.js";

export const prerender = true;

export const load: PageServerLoad = async () => {
	const blockIds = await getAllBlockIds();
	const defaultBlocks = await Promise.all(blockIds.map((name) => getBlock(name, "default")));
	const newYorkBlocks = await Promise.all(blockIds.map((name) => getBlock(name, "new-york")));

	const blocks = [];
	for (const name of blockNames) {
		const defaultBlock = defaultBlocks.find((b) => b.name === name);
		const newYorkBlock = newYorkBlocks.find((b) => b.name === name);
		if (!defaultBlock || !newYorkBlock) throw new Error("Missing blocks");

		blocks.push(defaultBlock, newYorkBlock);
	}

	return {
		blocks,
	};
};
