import type { EntryGenerator } from "./$types.js";
import type { RequestHandler } from "@sveltejs/kit";
import { getDocMetadata } from "$lib/docs.js";
import { generateOgImage } from "$lib/og-image.js";

export const prerender = true;

export const entries: EntryGenerator = () => {
	console.info("Prerendering / docs / og.png");
	const modules = import.meta.glob("/content/**/*.md");
	const entries = [];

	for (const path of Object.keys(modules)) {
		const slug = path.replace("/content/", "").replace(".md", "").replace("/index", "");
		entries.push({ slug });
	}

	return entries;
};

export const GET: RequestHandler = async ({ params }) => {
	const metadata = getDocMetadata(params.slug as string);
	return generateOgImage({
		title: metadata?.title,
		description: metadata?.description,
	});
};
