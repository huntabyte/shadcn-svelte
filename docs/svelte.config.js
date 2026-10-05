// @ts-check
import adapter from "@sveltejs/adapter-cloudflare";
import MagicString from "magic-string";
import { mdsx } from "mdsx";
import { PRESET_STYLES } from "shadcn-svelte/preset";
import { mdsxConfig } from "./mdsx.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [mdsx(mdsxConfig), componentPreviews()],
	extensions: [".svelte", ".md"],

	kit: {
		// https://kit.svelte.dev/docs/adapter-cloudflare#options
		adapter: adapter(),
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
		typescript: {
			config: (config) => {
				config.include.push("../mdsx.config.js", "../velite.config.js", "../.velite/**/*");
				return config;
			},
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
			const results = content.matchAll(/<ComponentPreview\b([^>]*)>/g);
			/** @type {Map<string, string | undefined>} */
			const components = new Map();
			for (const exec of results) {
				const attrs = exec[1] ?? "";
				// This preprocessor runs again on its own output. The first pass inserts
				// `component=`, which the old `name=`-first regex missed; skip those tags.
				if (/\bcomponent=/.test(attrs)) continue;
				const name = attrs.match(/\bname=["']([^"'\s]+)["']/)?.[1];
				if (!name || name.includes("sidebar")) continue;
				const insertIndex = exec.index + TARGET.length;
				const identifier = camelize(name);
				ms.appendRight(insertIndex, ` component={${identifier}}`);
				if (!components.has(name)) components.set(name, previewStyle(attrs));
			}

			const importIndex = content.search("import ComponentPreview");
			for (const [name, style] of components) {
				const identifier = camelize(name);
				const query = style ? `?flattened=${style}` : "";
				let importStatement;
				if (name.startsWith("chart") && !name.includes("demo")) {
					importStatement = `import ${identifier} from "$lib/registry/blocks/${name}.svelte${query}";`;
				} else if (name.includes("sidebar") || name.includes("Sidebar")) {
					continue;
				} else if (/^calendar-\d+$/.test(name)) {
					importStatement = `import ${identifier} from "$lib/registry/blocks/${name}.svelte${query}";`;
				} else {
					importStatement = `import ${identifier} from "$lib/registry/examples/${name}.svelte${query}";`;
				}

				ms.appendLeft(importIndex, importStatement);
			}

			return { code: ms.toString(), map: ms.generateMap() };
		},
	};
}

const previewStylePattern = new RegExp(
	`(?<![\\w-])style-(${[...PRESET_STYLES].sort((a, b) => b.length - a.length).join("|")})(?![\\w-])`
);

/**
 * Style to flatten a preview with, taken from a `style-*` class on
 * `previewClassName` or `class`. Absent means the docs default (nova).
 * @param {string} attrs
 */
function previewStyle(attrs) {
	const classes = [...attrs.matchAll(/\b(?:previewClassName|class)=["']([^"']*)["']/g)]
		.map((match) => match[1])
		.join(" ");
	return classes.match(previewStylePattern)?.[1];
}
