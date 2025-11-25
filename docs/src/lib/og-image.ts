import { ImageResponse } from "@ethercorps/sveltekit-og";
import ShadcnOG from "./components/shadcn-og.svelte";
import { GoogleFont, resolveFonts } from "@ethercorps/sveltekit-og/fonts";
import type { ComponentProps } from "svelte";
import type { RequestHandler } from "@sveltejs/kit";

type OgImageMetadata = ComponentProps<typeof ShadcnOG>

const fonts = [
	new GoogleFont("Geist", { weight: 400 }),
	new GoogleFont("Geist", { weight: 600 }),
	new GoogleFont("Geist Mono", { weight: 400 }),
];

export const generateOgImage = async ( metadata: OgImageMetadata) => {
	console.log("Generating OG image with metadata:", metadata);
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

export const createOgImageHandler = (metadata: OgImageMetadata): RequestHandler => {
	return async () => {
		try {
			const res = await generateOgImage(metadata);
			// If ImageResponse is already a Response-compatible object, return it directly.
			return res;
		} catch (error) {
			console.error("Error generating OG image:", error);
			// Return a simple 500 on failure (customize if you like)
			return new Response("Failed to generate OG image", { status: 500, statusText: 'Failed to generate OG image' } );
		}
	};
};

export const routesOgMetadata: Record<string, OgImageMetadata> = {
	'colors': {
		title: "Colors",
		description: "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.",
	},
	'examples': {
		title: "Examples",
		description: "Check out some example apps build using the components.",
	},
	'examples/playground': {
		title: "Playground",
		description: "The OpenAI Playground build using the components.",
	},
}
