import { blocks } from "../../../../../__registry__/blocks.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import type { EntryGenerator } from "./$types.js";
import { generateOgImage } from "$lib/og-image.js";

export const prerender = true;

export const entries: EntryGenerator = () => blocks.map((view) => ({ view }));

export const GET = async ({params}) => {
	const description = blockMeta[params.view as keyof typeof blockMeta].description

	return generateOgImage({title: params.view, description})
}