import { error } from "@sveltejs/kit";
import { examples } from "$lib/registry/examples/create/index.js";
import { DEFAULT_ITEM } from "../lib/utils.js";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = ({ url }) => {
	const item = url.searchParams.get("item")?.trim() || DEFAULT_ITEM;
	if (!examples.some((example) => example.name === item)) error(404, "Example not found");
	return { item };
};
