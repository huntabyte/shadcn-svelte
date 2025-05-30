// @ts-check
import { mdsx } from "mdsx";
import adapter from "@sveltejs/adapter-cloudflare";
import MagicString from "magic-string";
import { mdsxConfig } from "./mdsx.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [mdsx(mdsxConfig), componentPreviews()],
	extensions: [".svelte", ".md"],

	kit: {
		// https://kit.svelte.dev/docs/adapter-cloudflare#options
		adapter: adapter({
			routes: {
				// Since we have so many static assets, we'll manually define
				// the globs for them to save our 100 include/exclude limit
				exclude: [
					"<build>",
					// pre-rendered content
					"/docs/*",
					"/docs.html",
					"/blocks/*",
					"/blocks.html",
					"/view/*",
					// static
					"/registry/*",
					"/fonts/*",
					"/avatars/*",
					"/img/*",
					"/schema/*",
					"/android-chrome-192x192.png",
					"/android-chrome-512x512.png",
					"/apple-touch-icon.png",
					"/favicon-16x16.png",
					"/favicon-32x32.png",
					"/favicon.ico",
					"/og.png",
					"/schema.json",
					"/site.webmanifest",
					"/themes.css",
				],
			},
		}),
		prerender: {
			handleMissingId: (details) => {
				if (details.id === "#") return;
				console.warn(details.message);
			},
			handleHttpError: (details) => {
				// TODO: remove once all referenced pages are added
				console.warn(details.message);
			},
		},
		alias: {
			"$content/*": ".velite/*",
		},
	},
};

export default config;

/**
 * Detects the `name` of the previewing component, imports it directly and
 * passes it to the `ComponentPreview` as a prop.
 * @returns {import("svelte/compiler").PreprocessorGroup}
 */
function componentPreviews() {
	const TARGET = "<ComponentPreview";
	const camelize = (/** @type {string} */ s) => s.replace(/-./g, (w) => w[1].toUpperCase());

	return {
		name: "inject-component-preview",
		markup: ({ content, filename }) => {
			if (!filename?.endsWith(".md") || !content.includes(TARGET)) return;

			const ms = new MagicString(content);
			const results = content.matchAll(/<ComponentPreview name=["|']([^\s]*)["|']/g);
			const components = new Set();
			for (const exec of results) {
				const [, name] = exec;
				const insertIndex = exec.index + TARGET.length;
				const identifier = camelize(name);
				const prop = ` component={${identifier}}`;
				ms.appendRight(insertIndex, prop);

				components.add(name);
			}

			const importIndex = content.search("import {");
			for (const name of components) {
				const identifier = camelize(name);
				let importStatement = "";
				if (name.startsWith("chart") && !name.includes("demo")) {
					importStatement = `import ${identifier} from "$lib/registry/blocks/${name}.svelte";`;
				} else {
					importStatement = `import ${identifier} from "$lib/registry/examples/${name}.svelte";`;
				}

				ms.appendLeft(importIndex, importStatement);
			}

			return {
				code: ms.toString(),
				map: ms.generateMap(),
			};
		},
	};
}
