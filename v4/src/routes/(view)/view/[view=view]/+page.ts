import { error } from "@sveltejs/kit";
import type { EntryGenerator } from "./$types.js";
import type { Component } from "svelte";
import { blocks } from "../../../../__registry__/blocks.js";

export const prerender = true;

export const entries: EntryGenerator = () => blocks.map((view) => ({ view }));

export async function load({ params }) {
	let comp: { default: Component } | undefined;

	if (params.view.startsWith("demo-")) {
		comp = await import(`../../../../lib/registry/blocks/${params.view}.svelte`);
	} else {
		comp = await import(`../../../../lib/registry/blocks/${params.view}/+page.svelte`);
	}

	if (!comp) error(404, "Block not found");

	return { component: comp.default };
}
