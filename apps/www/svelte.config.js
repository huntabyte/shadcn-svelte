import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import { mdsvexOptions } from "./mdsvex.config.js";
import sequence from "svelte-sequential-preprocessor";
import { preprocessMeltUI } from "@melt-ui/pp";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([
		mdsvex(mdsvexOptions),
		vitePreprocess(),
		preprocessMeltUI()
	]),

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
