import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		mdsvex({ extensions: [".md"], layout: "./src/lib/components/docs/mdsvex/Layout.svelte" })
	],

	extensions: [".svelte", ".md"],

	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/lib/components",
			"$components/*": "src/lib/components/*",
			$ui: "src/lib/components/ui",
			"$ui/*": "src/lib/components/ui/*"
		}
	}
};

export default config;
