import { getAllBlockIds, getBlock } from "$lib/blocks.js";

export const load = async () => {
	const blockIds = await getAllBlockIds();
	const defaultBlocks = blockIds.map(async (name) => getBlock(name, "default"));
	const newYorkBlocks = blockIds.map(async (name) => getBlock(name, "new-york"));
	const blocks = await Promise.all([...defaultBlocks, ...newYorkBlocks]);

	return {
		blocks,
	};
};
