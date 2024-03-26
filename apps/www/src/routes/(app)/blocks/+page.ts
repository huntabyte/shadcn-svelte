import { getAllBlockIds, getBlock } from "$lib/blocks.js";

export const prerender = true;

export const load = async () => {
	const blockIds = await getAllBlockIds();
	const defaultBlocks = blockIds.map(async (name) => getBlock(name, "default"));
	const newYorkBlocks = blockIds.map(async (name) => getBlock(name, "new-york"));
	const blocks = await Promise.all([...defaultBlocks, ...newYorkBlocks]);

	blocks.sort((a, b) => {
		const prefixA = a.name.split("-")[0];
		const prefixB = b.name.split("-")[0];
		if (prefixA === "dashboard" && prefixB === "authentication") {
			return -1;
		}
		if (prefixA === "authentication" && prefixB === "dashboard") {
			return 1;
		}
		return a.name.localeCompare(b.name);
	});

	return {
		blocks,
	};
};
