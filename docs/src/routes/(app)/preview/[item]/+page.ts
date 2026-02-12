import { error } from "@sveltejs/kit";
import { examples } from "$lib/registry/examples/create/index.js";

export function load({ params }) {
	const { item } = params;

	const example = examples.find((example) => example.name === item);
	if (!example) {
		error(404, "Example not found");
	}

	return { example };
}
