import type { RegistryItem, RegistryItemFile } from "@shadcn-svelte/registry";
import type { PageLoad } from "./$types.js";

export const prerender = true;

type Item = Omit<RegistryItem, "files"> & {
	files: (RegistryItemFile & {
		highlightedContent: Promise<string>;
		target: string;
	})[];
};

const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"];

export const load: PageLoad = async ({ fetch }) => {
	const loadItems = FEATURED_BLOCKS.map(async (block) => {
		const resp = await fetch(`/api/block/${block}`);
		return (await resp.json()) as Item;
	});

	const result = await Promise.all(loadItems);

	return {
		blocks: result.sort(
			(a, b) => FEATURED_BLOCKS.indexOf(a.name) - FEATURED_BLOCKS.indexOf(b.name)
		),
	};
};
