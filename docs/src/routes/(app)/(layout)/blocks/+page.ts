import type { PageLoad } from "./$types.js";
import type { HighlightedBlock } from "../../../api/block/[block]/+server.js";

export const prerender = true;

const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"];

export const load: PageLoad = async ({ fetch }) => {
	const loadItems = FEATURED_BLOCKS.map(async (block) => {
		const resp = await fetch(`/api/block/${block}`);
		return (await resp.json()) as HighlightedBlock;
	});

	const result = await Promise.all(loadItems);

	return {
		blocks: result.sort(
			(a, b) => FEATURED_BLOCKS.indexOf(a.name) - FEATURED_BLOCKS.indexOf(b.name)
		),
	};
};
