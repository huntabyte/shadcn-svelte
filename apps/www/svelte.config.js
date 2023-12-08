import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { mdsvex } from "mdsvex";
import { mdsvexOptions } from "./mdsvex.config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		mdsvex(mdsvexOptions),
		vitePreprocess({
			style: {
				css: {
					postcss: join(__dirname, "postcss.config.cjs")
				}
			}
		})
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
			"@/*": "src/lib/*"
		}
	}
};

export default config;
