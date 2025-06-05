import { error } from "@sveltejs/kit";
import type { EntryGenerator } from "./$types.js";
import { getAllBlockIds } from "$lib/blocks.js";

export const prerender = true;

export const entries: EntryGenerator = async () => {
	console.info("Prerendering /view/[name]");
	const blockIds = getAllBlockIds();

	return blockIds.map((name) => ({ name }));
};

export async function load({ params }) {
	const modules = import.meta.glob("/src/lib/registry/blocks/**/+page.svelte");
	const blockName = params.name;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let match: { path?: string; resolver?: () => Promise<any> } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(blockName)) {
			match = { path, resolver };
			break;
		}
	}

	const comp = await match?.resolver?.();

	if (!comp) error(404, "Block not found");

	return {
		component: comp.default,
	};
}
