import { error } from "@sveltejs/kit";
import type { Component } from "svelte";

type ViewResolver = () => Promise<{ default: Component }>;

export async function getView(name: string) {
	let modules: Record<string, () => Promise<unknown>>;

	if (name.startsWith("demo-")) {
		modules = import.meta.glob("src/lib/registry/blocks/demo-*.svelte");
	} else {
		modules = import.meta.glob("src/lib/registry/blocks/**/+page.svelte");
	}

	let match: { path?: string; resolver?: ViewResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.includes(name)) {
			match = { path, resolver: resolver as unknown as ViewResolver };
			break;
		}
	}

	const comp = await match?.resolver?.();

	if (!comp) error(404, "Block not found");

	return {
		component: comp.default,
	};
}
