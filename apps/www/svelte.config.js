import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import { mdsvexOptions } from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexOptions),
		vitePreprocess(),
	],

	extensions: [".svelte", ".md"],

	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/lib/components",
			"$components/*": "src/lib/components/*"
		}
	}
};

export default config;
