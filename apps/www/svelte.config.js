import adapter from "@sveltejs/adapter-cloudflare";
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
	},
};

export default config;
