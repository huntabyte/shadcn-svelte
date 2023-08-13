import { visit } from "unist-util-visit";
import { Index } from "../__registry__";
import { styles } from "../src/lib/registry";
import path from "path";
import prettier from "prettier";
import fs from "fs";
import { codeBlockPrettierConfig } from "./code-block-prettier";
import { u } from "unist-builder";

export function rehypeComponentExample() {
	return async (tree) => {
		const nameRegex = /name="([^"]+)"/;
		visit(tree, (node, index, parent) => {
			if (
				node?.type === "raw" &&
				node?.value?.startsWith("<ComponentExample")
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
						let sourceCode = getComponentSourceFileContent(name);
						sourceCode = sourceCode.replaceAll(
							`@/registry/${style.name}/`,
							"@/components/"
						);

						const sourceCodeNode = u("element", {
							tagName: "pre",
							properties: {
								__src__: src,
								__style__: style.name,
								className: ["code"]
							},
							attributes: [
								{
									name: "styleName",
									type: "text",
									value: style.name
								}
							],
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
