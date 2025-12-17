import { error } from "@sveltejs/kit";
import { examples } from "../../(layout)/(create)/examples/index.js";

export function load({ params }) {
	const { item } = params;

	const example = examples.find((example) => example.name === item);
	if (!example) {
		error(404, "Example not found");
	}

	return { example };
}
