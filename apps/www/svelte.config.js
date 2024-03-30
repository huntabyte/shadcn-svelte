import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsx } from "mdsx";
import { mdsxConfig } from "./mdsx.config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsx(mdsxConfig),
		vitePreprocess({
			style: {
				css: {
					postcss: join(__dirname, "postcss.config.cjs"),
				},
			},
		}),
	],
	extensions: [".svelte", ".md"],

	kit: {
		// https://kit.svelte.dev/docs/adapter-cloudflare#options
		adapter: adapter({
			routes: {
				// Since we have so many static assets, we'll manually define
				// the globs for them to save our 100 include/exclude limit
				exclude: [
					"<build>",
					// prerendered content
					"/docs/*",
					"/blocks/*",
					"/blocks.html",
					"/docs.html",
					// static
					"/registry/*",
					"/fonts/*",
					"/avatars/*",
					"/images/*",
					"/android-chrome-192x192.png",
					"/android-chrome-512x512.png",
					"/apple-touch-icon.png",
					"/favicon-16x16.png",
					"/favicon-32x32.png",
					"/favicon.ico",
					"/og.png",
					"/schema.json",
					"/site.webmanifest",
				],
			},
		}),
		prerender: {
			handleMissingId: (details) => {
				if (details.id === "#") return;
				console.warn(details.message);
			},
		},
	},
};

export default config;
