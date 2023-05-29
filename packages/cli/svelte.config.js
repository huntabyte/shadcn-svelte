// for testing purposes only

import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import { mdsvexOptions } from "./mdsvex.config.js";

const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexOptions)
	],
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/lib/components",
			"$components/*": "src/lib/components/*"
		}
	},
	shadcn: {
		componentPath: "./src/lib/components/ui"
	}
};
export default config;
