//@ts-check
import { readFileSync } from "node:fs";
import process from "node:process";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "@prettier/sync";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import { getHighlighter } from "shiki";
import { defineConfig } from "mdsx";
import { Index } from "./src/__registry__/index.js";
import { codeBlockPrettierConfig } from "./other/code-block-prettier.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

/**
 * @type {import('rehype-pretty-code').Options}
 */
const prettyCodeOptions = {
	theme: JSON.parse(String(readFileSync(resolve(__dirname, "./other/themes/dark.json")))),
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			langs: [
				"plaintext",
				import("shiki/langs/javascript.mjs"),
				import("shiki/langs/typescript.mjs"),
				import("shiki/langs/css.mjs"),
				import("shiki/langs/svelte.mjs"),
				import("shiki/langs/shellscript.mjs"),
				import("shiki/langs/markdown.mjs"),
			],
		}),
	keepBackground: false,
	onVisitLine(node) {
		if (node.children.length === 0) {
			// @ts-expect-error - we're changing the node type
			node.children = { type: "text", value: " " };
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ["line--highlighted"];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["chars--highlighted"];
	},
};

export const mdsxConfig = defineConfig({
	extensions: [".md"],
	remarkPlugins: [remarkGfm, codeImport, remarkRemovePrettierIgnore],
	rehypePlugins: [
		rehypeSlug,
		rehypeComponentExample,
		rehypePreData,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata,
	],
	blueprints: {
		default: {
			path: resolve(__dirname, "./src/lib/components/docs/markdown/blueprint.svelte"),
		},
	},
});

/**
 * Removes `<!-- prettier-ignore -->` and `// prettier-ignore` from code blocks
 * before they are converted to HTML for syntax highlighting.
 *
 * We do this because sometimes we want to force a line break in code blocks, but
 * prettier removes them, however, we don't want to include the ignore statement
 * in the final code block.
 *
 * One caveat is that if you did want to include the ignore statement in the final
 * code block, you'd have to do some hacky stuff like including it in the comment
 * itself and checking for it in the code block, but that's not something we need
 * at the moment.
 *
 * @returns {MdastTransformer} - Unified Transformer
 */
function remarkRemovePrettierIgnore() {
	return async (tree) => {
		visit(tree, "code", (node) => {
			node.value = node.value
				.replaceAll("<!-- prettier-ignore -->\n", "")
				.replaceAll("// prettier-ignore\n", "");
		});
	};
}

/**
 *
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypePreData() {
	return (tree) => {
		visit(tree, (node) => {
			if (node?.type === "element" && node?.tagName === "pre") {
				const [codeEl] = node.children;
				if (codeEl.type !== "element") return;
				if (codeEl.tagName !== "code") return;

				if (
					codeEl.data &&
					"meta" in codeEl.data &&
					codeEl.data.meta &&
					typeof codeEl.data.meta === "string"
				) {
					// Extract event from meta and pass it down the tree.
					const regex = /event="([^"]*)"/;
					const match = codeEl.data?.meta.match(regex);
					if (match) {
						// @ts-expect-error - this is fine
						node.__event__ = match ? match[1] : null;
						codeEl.data.meta = codeEl.data.meta.replace(regex, "");
					}
				}

				// @ts-expect-error - this is fine
				node.__rawString__ = codeEl.children?.[0].value;
				// @ts-expect-error - this is fine
				node.__src__ = node.properties?.__src__;
				// @ts-expect-error - this is fine
				node.__style__ = node.properties?.__style__;
			}
		});
	};
}

const styles = [
	{
		name: "default",
		label: "Default",
	},
	{
		name: "new-york",
		label: "New York",
	},
];

/**
 *
 * @returns {HastTransformer} - Unified Transformer
 */
export function rehypeComponentExample() {
	return (tree) => {
		const nameRegex = /name="([^"]+)"/;
		visit(tree, (node, index, parent) => {
			// @ts-expect-error - this is fine
			if (node?.type === "raw" && node?.value?.startsWith("<ComponentPreview")) {
				// @ts-expect-error - this is fine
				const match = node.value.match(nameRegex);
				const name = match ? match[1] : null;

				if (!name) {
					return null;
				}

				try {
					for (const style of styles) {
						// @ts-expect-error - this is fine for now.
						const component = Index[style.name][name];
						const src = component.files[0].replace("/lib/", "/src/lib/");
						let sourceCode = getComponentSourceFileContent(src);
						if (!sourceCode || sourceCode === null) return;

						sourceCode = sourceCode.replaceAll(
							"$lib/registry/new-york/",
							"$lib/components/"
						);
						sourceCode = sourceCode.replaceAll(
							"$lib/registry/default/",
							"$lib/components/"
						);

						const sourceCodeNode = u("element", {
							tagName: "pre",
							properties: {
								__src__: src,
								__style__: style.name,
								className: ["code"],
							},
							children: [
								u("element", {
									tagName: "code",
									properties: {
										className: [`language-svelte`],
									},
									attributes: {},
									children: [
										{
											type: "text",
											value: sourceCode,
										},
									],
								}),
							],
						});
						if (!index) return;
						// @ts-expect-error - this is fine
						parent?.children.splice(index + 1, 0, sourceCodeNode);
					}
				} catch (e) {
					console.error(e);
				}
			}
		});
	};
}

/**
 * Adds `data-metadata` to `<figure>` elements that contain a `<figcaption>`.
 * We use this to style elements within the `<figure>` differently if a `<figcaption>`
 * is present.
 *
 * @returns {HastTransformer} - Unified Transformer
 */
function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === "element" && node?.tagName === "figure") {
				if (!("data-rehype-pretty-code-figure" in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (preElement && "tagName" in preElement && preElement.tagName !== "pre") {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && "tagName" in firstChild && firstChild.tagName === "figcaption") {
					node.properties["data-metadata"] = "";
					const lastChild = node.children.at(-1);
					if (lastChild && "properties" in lastChild) {
						lastChild.properties["data-metadata"] = "";
					}
				}
			}
		});
	};
}

function getComponentSourceFileContent(src = "") {
	const newSrc = src.replace("../", "./");
	if (!newSrc) return null;

	// Read the source file.
	const filePath = join(process.cwd(), newSrc);

	const formattedSource = prettier.format(
		readFileSync(filePath, "utf-8"),
		codeBlockPrettierConfig
	);

	return formattedSource;
}
