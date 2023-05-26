import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { toHtml } from "hast-util-to-html";
import prettier from "prettier";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import { codeBlockPrettierConfig } from "./other/code-block-prettier.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('@huntabyte/mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: [".md"],
	layout: path.resolve(
		__dirname,
		"./src/lib/components/docs/mdsvex/mdsvex.svelte"
	),
	smartypants: {
		quotes: false,
		ellipses: false,
		backticks: false,
		dashes: false
	},
	remarkPlugins: [remarkGfm, codeImport],
	rehypePlugins: [
		rehypeSlug,
		rehypeComponentExample,
		rehypeComponentPreToPre,
		[
			rehypePrettyCode,
			{
				theme: {
					dark: JSON.parse(
						fs.readFileSync(
							path.resolve(
								__dirname,
								"./src/lib/themes/dark.json"
							),
							"utf-8"
						)
					),
					light: JSON.parse(
						fs.readFileSync(
							path.resolve(
								__dirname,
								"./src/lib/themes/light.json"
							),
							"utf-8"
						)
					)
				},
				onVisitLine(node) {
					if (node.children.length === 0) {
						node.children = { type: "text", value: " " };
					}
				},
				onVisitHighlightedLine(node) {
					node.properties.className.push("line--highlighted");
				},
				onVisitHighlightedWord(node) {
					node.properties.className = ["word--highlighted"];
				}
			}
		],
		rehypeHandleMetadata,
		rehypeRenderCode,
		rehypePreToComponentPre,
		[
			rehypeAutolinkHeadings,
			{
				properties: {
					className: ["subheading-anchor"],
					ariaLabel: "Link to section"
				}
			}
		]
	]
};

function rehypeComponentExample() {
	return async (tree) => {
		const srcRegex = /src="([^"]+)"/;
		visit(tree, (node, index, parent) => {
			if (
				node?.type === "raw" &&
				node?.value?.startsWith("<ComponentExample")
			) {
				const match = node.value.match(srcRegex);
				const src = match ? match[1] : null;

				if (!src) {
					return;
				}

				const sourceCode = getComponentSourceFileContent(src);

				const sourceCodeNode = u("element", {
					tagName: "pre",
					properties: {
						__src__: src,
						className: ["code"]
					},
					children: [
						u("element", {
							tagName: "code",
							properties: {
								className: ["language-svelte"]
							},
							children: [
								{
									type: "text",
									value: sourceCode
								}
							]
						})
					]
				});

				parent.children.splice(index + 1, 0, sourceCodeNode);
			}
		});
	};
}

function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === "element" && node?.tagName === "div") {
				if (!("data-rehype-pretty-code-fragment" in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (preElement.tagName !== "pre") {
					return;
				}

				if (node.children.at(0).tagName === "div") {
					node.properties["data-metadata"] = "";
				}
			}
		});
	};
}

function rehypeComponentPreToPre() {
	return async (tree) => {
		// Replace `Component.pre` tags with `pre` tags.
		// This is a workaround to use rehype-pretty-code along with custom mdsvex components.
		visit(tree, (node) => {
			if (
				node?.type === "element" &&
				node?.tagName === "Components.pre"
			) {
				node.tagName = "pre";
			}
		});
	};
}
function rehypePreToComponentPre() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === "element" && node?.tagName === "pre") {
				node.tagName = "Components.pre";
			}
		});
	};
}

function rehypeRenderCode() {
	return async (tree) => {
		visit(tree, (node) => {
			if (
				node?.type === "element" &&
				(node?.tagName === "Components.pre" || node?.tagName === "pre")
			) {
				const [codeEl] = node.children;
				if (codeEl.tagName !== "code") {
					return;
				}
				const toHtmlString = toHtml(codeEl, {
					allowDangerousCharacters: true,
					allowDangerousHtml: true
				});
				codeEl.type = "raw";
				codeEl.value = `{@html \`${toHtmlString}\`}`;
			}
		});
	};
}

const mdsvexPrettierConfig = {
	useTabs: false,
	tabWidth: 2,
	singleQuote: false,
	trailingComma: "none",
	printWidth: 80,
	endOfLine: "lf",
	pluginSearchDirs: false,
	parser: "svelte",
	svelteIndexScriptAndStyle: true,
	svelteStrictMode: false,
	svelteSortOrder: "scripts-markup-styles-options",
	plugins: ["prettier-plugin-svelte", "@ianvs/prettier-plugin-sort-imports"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
				svelteIndentScriptAndStyle: true,
				svelteStrictMode: false,
				svelteSortOrder: "scripts-markup-styles-options"
			}
		}
	],
	bracketSameLine: false,
	importOrder: [
		"<TYPES>",
		"<TYPES>^[.]",
		"<BUILTIN_MODULES>",
		"<THIRD_PARTY_MODULES>",
		"^\\$app",
		"^\\$env",
		"^\\$service-worker",
		"^\\$lib/server",
		"^\\$(?![^\\/]*\\/)",
		"^\\$[^/]*\\/[^/]+",
		"^[./]",
		"\\.js$",
		"\\.svelte$"
	],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	importOrderBuiltinModulesToTop: true,
	importOrderParserPlugins: ["typescript", "svelte"],
	importOrderMergeDuplicateImports: true
};

function getComponentSourceFileContent(src = undefined) {
	if (!src) {
		return null;
	}

	// Read the source file.
	const filePath = path.join(process.cwd(), src);

	const formattedSource = prettier.format(
		fs.readFileSync(filePath, "utf-8"),
		codeBlockPrettierConfig
	);

	return formattedSource;
}
