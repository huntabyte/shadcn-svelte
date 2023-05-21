import fs from "fs";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import { toHtml } from "hast-util-to-html";

/** @type {import('@huntabyte/mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: [".md"],
	layout: "./src/lib/components/docs/mdsvex/mdsvex.svelte",
	smartypants: {
		quotes: false,
		ellipses: false,
		backticks: false,
		dashes: false
	},
	remarkPlugins: [remarkGfm, codeImport],
	rehypePlugins: [
		rehypeSlug,
		() => (tree) => {
			visit(tree, (node) => {
				if (node?.tagName === "Component.pre" || node?.tagName === "pre") {
					// console.log(JSON.stringify(node, null, 2));
				}
				if (node?.type === "element" && node?.tagName === "Components.pre") {
					node.tagName = "pre";
				}
			});
		},
		[
			rehypePrettyCode,
			{
				theme: {
					dark: JSON.parse(fs.readFileSync(path.resolve("./src/lib/themes/dark.json"), "utf-8")),
					light: JSON.parse(fs.readFileSync(path.resolve("./src/lib/themes/light.json"), "utf-8"))
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
		() => (tree) => {
			visit(tree, (node, index, parent) => {
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
		},
		() => (tree) => {
			visit(tree, (node) => {
				if (
					node?.type === "element" &&
					(node?.tagName === "Components.pre" || node?.tagName === "pre")
				) {
					// const escapedValue = escapeSvelte(escape(node.value));
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
		},
		() => (tree) => {
			visit(tree, (node) => {
				if (node?.type === "element" && node?.tagName === "pre") {
					node.tagName = "Components.pre";
				}
			});
		},

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

function unescapeSvelte(str) {
	const reverseMap = {
		"&#123;": "{",
		"&#125;": "}",
		"&#96;": "`",
		"&#92;": "\\"
	};

	return str
		.replace(/&#92;([trn])/g, (match, escapeSeq) => `\\${escapeSeq}`)
		.replace(
			/&#92;&#123;|&#92;&#125;|&#92;&#96;|&#123;|&#125;|&#96;/g,
			(match) => reverseMap[match]
		);
}

function rehypeNpmCommand() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== "element" || node?.tagName !== "pre" || node?.tagName !== "Component.pre") {
				return;
			}

			// npm install.
			if (node.properties?.["__rawString__"]?.startsWith("npm install")) {
				const npmCommand = node.properties?.["__rawString__"];
				node.properties["__npmCommand__"] = npmCommand;
				node.properties["__yarnCommand__"] = npmCommand.replace("npm install", "yarn add");
				node.properties["__pnpmCommand__"] = npmCommand.replace("npm install", "pnpm add");
			}

			// npx create.
			if (node.properties?.["__rawString__"]?.startsWith("npx create-")) {
				const npmCommand = node.properties?.["__rawString__"];
				node.properties["__npmCommand__"] = npmCommand;
				node.properties["__yarnCommand__"] = npmCommand.replace("npx create-", "yarn create ");
				node.properties["__pnpmCommand__"] = npmCommand.replace("npx create-", "pnpm create ");
			}

			// npx.
			if (
				node.properties?.["__rawString__"]?.startsWith("npx") &&
				!node.properties?.["__rawString__"]?.startsWith("npx create-")
			) {
				const npmCommand = node.properties?.["__rawString__"];
				node.properties["__npmCommand__"] = npmCommand;
				node.properties["__yarnCommand__"] = npmCommand;
				node.properties["__pnpmCommand__"] = npmCommand.replace("npx", "pnpx");
			}
		});
	};
}

function rehypeComponent() {
	return async (tree) => {
		visit(tree, (node, index, parent) => {
			const srcRegex = /src="([^"]+)"/;
			if (node?.tagName === "p" || node?.tagName === "Components.p") {
				console.log(node.children[0].value);
				const match = node.children[0].value.match(srcRegex);
				const src = match ? match[1] : null;
				if (!src) {
					return;
				}
				const source = getComponentSourceFileContent(src);
				const preNode = u("element", {
					tagName: "pre",
					properties: {
						__src__: src
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
									value: source
								}
							]
						})
					]
				});
				parent.children.splice(index, 1, preNode);
			}

			if (node.name === "ComponentExample") {
				const source = getComponentSourceFileContent(node);
				if (!source) {
					return;
				}

				// Replace the Example component with a pre element.
				node.children?.push(
					u("element", {
						tagName: "pre",
						properties: {
							__src__: src
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
										value: source
									}
								]
							})
						]
					})
				);

				const extractClassname = getNodeAttributeByName(node, "extractClassname");
				if (
					extractClassname &&
					typeof extractClassname.value !== "undefined" &&
					extractClassname.value !== "false"
				) {
					// Extract className from string
					// TODO: Use @swc/core and a visitor to extract this.
					// For now, a simple regex should do.
					const values = source.match(/class="(.*)"/);
					const className = values ? values[1] : "";

					// Add the className as a jsx prop so we can pass it to the copy button.
					node.attributes?.push({
						name: "extractedClassNames",
						type: "mdxJsxAttribute",
						value: className
					});

					// Add a pre element with the className only.
					node.children?.push(
						u("element", {
							tagName: "pre",
							properties: {},
							children: [
								u("element", {
									tagName: "code",
									properties: {
										className: ["language-svelte"]
									},
									children: [
										{
											type: "text",
											value: className
										}
									]
								})
							]
						})
					);
				}
			}

			if (node.name === "ComponentSource") {
				const source = getComponentSourceFileContent(node);
				if (!source) {
					return;
				}

				// Replace the Source component with a pre element.
				node.children?.push(
					u("element", {
						tagName: "pre",
						properties: {
							__src__: src
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
										value: source
									}
								]
							})
						]
					})
				);
			}
		});
	};
}

function getNodeAttributeByName(node, name) {
	return node.attributes?.find((attribute) => attribute.name === name);
}

function getComponentSourceFileContent(src = undefined) {
	if (!src) {
		return null;
	}

	// Read the source file.
	const filePath = path.join(process.cwd(), src);
	const source = fs.readFileSync(filePath, "utf8");

	return source;
}
