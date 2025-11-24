import type { EntryGenerator } from "./$types.js";
import type { RequestHandler } from "@sveltejs/kit";
import { ImageResponse } from "@ethercorps/sveltekit-og";
import ShadcnOG from "./shadcn-og.svelte";
import { GoogleFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";
import { getDocMetadata } from "$lib/docs.js";

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

const fonts = [
	new GoogleFont("Geist", { weight: 400 }),
	new GoogleFont("Geist", { weight: 600 }),
	new GoogleFont("Geist Mono", { weight: 400 }),
];

export const GET: RequestHandler = async ({ params }) => {
	const metadata = getDocMetadata(params.slug as string);
	return new ImageResponse(
		ShadcnOG,
		{
			height: 630,
			width: 1200,
			fonts: await resolveFonts(fonts),
		},
		{
			title: metadata?.title || "",
			description: metadata?.description || "",
		}
	);
};
