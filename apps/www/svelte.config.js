import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsx } from "mdsx";
import { mdsxConfig } from "./mdsx.config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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
		adapter: adapter(),
		alias: {
			$components: "src/lib/components",
			"$components/*": "src/lib/components/*",
			$primitives: "src/lib/primitives",
			"$primitives/*": "src/lib/primitives/*",
			"@": "src/lib",
			"@/*": "src/lib/*",
		},
	},
};

export default config;
