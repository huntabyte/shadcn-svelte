import { error } from "@sveltejs/kit";
import type { EntryGenerator } from "./$types.js";
import type { Component } from "svelte";
import { blocks } from "../../../../__registry__/blocks.js";

export const prerender = true;

export const entries: EntryGenerator = () => blocks.map((view) => ({ view }));

type ViewResolver = () => Promise<{ default: Component }>;

export async function load({ params }) {
	let modules: Record<string, () => Promise<unknown>>;

	if (params.view.startsWith("demo-")) {
		modules = import.meta.glob("/src/lib/registry/blocks/demo-*.svelte");
	} else {
		modules = import.meta.glob("/src/lib/registry/blocks/**/+page.svelte");
	}

	let match: ViewResolver | undefined;

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(params.view)) {
			match = resolver as unknown as ViewResolver;
			break;
		}
	}

	const comp = await match?.();

	if (!comp) error(404, "Block not found");

	return {
		component: comp.default,
	};
}
