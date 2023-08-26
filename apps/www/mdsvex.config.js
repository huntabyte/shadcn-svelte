import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { toHtml } from "hast-util-to-html";
import prettier from "prettier";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { codeBlockPrettierConfig } from "./other/code-block-prettier.js";
import { u } from "unist-builder";
import { Index } from "./__registry__/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('mdsvex').MdsvexOptions} */
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
		() => (tree) => {
			visit(tree, (node) => {
				if (node?.type === "element" && node?.tagName === "pre") {
					const [codeEl] = node.children;
					if (codeEl.tagName !== "code") {
						return;
					}

					if (codeEl.data?.meta) {
						// Extract event from meta and pass it down the tree.
						const regex = /event="([^"]*)"/;
						const match = codeEl.data?.meta.match(regex);
						if (match) {
							node.__event__ = match ? match[1] : null;
							codeEl.data.meta = codeEl.data.meta.replace(
								regex,
								""
							);
						}
					}

					node.__rawString__ = codeEl.children?.[0].value;
					node.__src__ = node.properties?.__src__;
					node.__style__ = node.properties?.__style__;
				}
			});
		},
		rehypeComponentPreToPre,
		[
			rehypePrettyCode,
			{
				theme: JSON.parse(
					fs.readFileSync(
						path.resolve(__dirname, "./other/themes/dark.json"),
						"utf-8"
					)
				),
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
		rehypePreToComponentPre
	]
};

const styles = [
	{
		name: "default",
		label: "Default"
	},
	{
		name: "new-york",
		label: "New York"
	}
];

export function rehypeComponentExample() {
	return async (tree) => {
		const nameRegex = /name="([^"]+)"/;
		visit(tree, (node, index, parent) => {
			if (
				node?.type === "raw" &&
				node?.value?.startsWith("<ComponentPreview")
			) {
				const match = node.value.match(nameRegex);
				const name = match ? match[1] : null;

				if (!name) {
					return null;
				}

				try {
					for (const style of styles) {
						const component = Index[style.name][name];
						const src = component.files[0];
						let sourceCode = getComponentSourceFileContent(src);
						sourceCode = sourceCode.replaceAll(
							`@/registry/${style.name}/`,
							"$lib/components/"
						);

						const sourceCodeNode = u("element", {
							tagName: "pre",
							properties: {
								__src__: src,
								__style__: style.name,
								className: ["code"]
							},
							children: [
								u("element", {
									tagName: "code",
									properties: {
										className: [`language-svelte`]
									},
									attributes: {},
									children: [
										{
											type: "text",
											value: sourceCode
										}
									]
								})
							]
						});
						if (!index) return;
						parent.children.splice(index + 1, 0, sourceCodeNode);
					}
				} catch (e) {
					console.error(e);
				}
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

				if (node.__src__) {
					preElement.properties["__src__"] = node.__src__;
				}
				if (node.__style__) {
					node.properties["data-style"] = node.__style__;
					preElement.properties["__style__"] = node.__style__;
					preElement.properties["data-style"] = node.__style__;
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

			if (node?.type === "element" && node?.tagName === "pre") {
				//
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

function getComponentSourceFileContent(src = undefined) {
	const newSrc = src.replace("../", "./");
	if (!newSrc) {
		return null;
	}

	// Read the source file.
	const filePath = path.join(process.cwd(), newSrc);

	const formattedSource = prettier.format(
		fs.readFileSync(filePath, "utf-8"),
		codeBlockPrettierConfig
	);

	return formattedSource;
}
