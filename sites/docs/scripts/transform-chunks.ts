import { parse } from "svelte/compiler";
import { walk } from "estree-walker";
import prettier from "@prettier/sync";
import { codeBlockPrettierConfig } from "../other/code-block-prettier.js";

type Chunk = {
	name: string;
	dependencies: string[];
	start: number;
	end: number;
	content: string;
	description: string;
	container: { className: string };
};
export function getChunks(source: string, filename: string) {
	type TemplateNode = typeof ast["fragment"]["nodes"] extends Array<infer T> ? T : typeof ast["fragment"]["nodes"];
	const ast = parse(source, { filename, modern: true });
	const chunks: Chunk[] = [];

	// @ts-expect-error yea, stfu
	walk(ast, {
		enter(n: TemplateNode) {
			const chunkNode = n as TemplateNode;
			if (chunkNode.type !== "RegularElement" && chunkNode.type !== "Component") return;

			const attrs = chunkNode.attributes.filter(a => a.type === "Attribute");
			const nameNode = attrs.find((a) => a.name === "data-x-chunk-name");
			const descriptionNode = attrs.find((a) => a.name === "data-x-chunk-description");
			if (descriptionNode === undefined || nameNode === undefined) return;

			const containerNode = attrs.find((a) => a.name === "data-x-chunk-container");

			const name = extractAttributeValue(nameNode)!;
			const description = extractAttributeValue(descriptionNode)!;
			const containerClassName = containerNode ? extractAttributeValue(containerNode)! : "";
			const dependencies = new Set<string>();

			// discard any prop members
			const [componentName] = chunkNode.name.split(".");
			dependencies.add(componentName);

			// walk the chunk to acquire all component dependencies
			// @ts-expect-error stfu
			walk(chunkNode.fragment, {
				enter(node: TemplateNode) {
					if (node.type === "Component") {
						const [componentName] = node.name.split(".");
						dependencies.add(componentName);
					}
				},
			});

			const chunk: Chunk = {
				name,
				description,
				dependencies: [...dependencies],
				start: chunkNode.start,
				end: chunkNode.end,
				content: "",
				container: {
					className: containerClassName,
				},
			};
			chunks.push({ ...chunk, content: transformChunk(source, chunk) });
			// don't traverse the rest of this node
			this.skip();
		},
	});

	return chunks;
}

// eslint-disable-next-line ts/no-explicit-any
function extractAttributeValue(attribute: any): string | undefined {
	if (Array.isArray(attribute.value) && attribute.value[0].type === "Text") {
		return attribute.value[0].data;
	}
}

export function transformChunk(source: string, chunk: Chunk): string {
	const html = source.substring(chunk.start, chunk.end);
	const lines = source.split("\n");
	const scriptEndIdx = lines.indexOf("</script>");
	const imports = lines
		// we only want to look at the script tag...
		.slice(0, scriptEndIdx)
		// spaced on the edges to prevent false positives (e.g. `CreditCard` could be falsely triggered by `Card`)
		.filter((line) => chunk.dependencies.some((dep) => line.includes(` ${dep} `) || line.includes(` ${dep},`)));

	let template = `<script lang="ts">\n`;
	template += imports.join("\n");
	template += `\n</script>\n\n${html}`;

	return prettier.format(template, {
		...codeBlockPrettierConfig,
		useTabs: true,
		tabWidth: undefined,
	});
}
