import fs from "fs";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code-class";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { u } from "unist-builder";

/** @type {import('@huntabyte/mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: [".md"],
	layout: "./src/lib/components/docs/mdsvex/mdsvex.svelte",
	remarkPlugins: [remarkGfm, codeImport],
	rehypePlugins: [
		rehypeSlug,
		rehypeComponent,
		() => (tree) => {
			visit(tree, (node) => {
				if (node?.type === "element" && node?.tagName === "pre") {
					const [codeEl] = node.children;
					if (codeEl.tagName !== "code") {
						return;
					}
					if (codeEl.data?.meta) {
						const regex = /event="([^"]*)"/;
						const match = codeEl.data?.meta.match(regex);
						if (match) {
							node.__event__ = match ? match[1] : null;
							codeEl.data.meta = codeEl.data.meta.replace(regex, "");
						}
					}

					node.__rawString__ = codeEl.children?.[0].value;
					node.__src__ = node.properties?.__src__;
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
			visit(tree, (node) => {
				if (node?.type === "element" && node?.tagName === "div") {
					if (!("data-rehype-pretty-code-fragment" in node.properties)) {
						return;
					}

					const preElement = node.children.at(-1);
					if (preElement.tagName !== "pre") {
						return;
					}

					preElement.properties["__withMeta__"] = node.children.at(0).tagName === "div";
					preElement.properties["__rawString__"] = node.__rawString__;

					if (node.__src__) {
						preElement.properties["__src__"] = node.__src__;
					}

					if (node.__event__) {
						preElement.properties["__event__"] = node.__event__;
					}
				}
			});
		},
		rehypeNpmCommand,
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
function escapeSvelte(str) {
	return str
		.replace(/[{}`]/g, (c) => ({ "{": "&#123;", "}": "&#125;", "`": "&#96;" }[c]))
		.replace(/\\([trn])/g, "&#92;$1");
}

function rehypeNpmCommand() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== "element" || node?.tagName !== "pre") {
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
		visit(tree, (node) => {
			const { value: src } = getNodeAttributeByName(node, "src") || {};

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

function getComponentSourceFileContent(node) {
	const src = getNodeAttributeByName(node, "src")?.value;

	if (!src) {
		return null;
	}

	// Read the source file.
	const filePath = path.join(process.cwd(), src);
	const source = fs.readFileSync(filePath, "utf8");

	return source;
}
