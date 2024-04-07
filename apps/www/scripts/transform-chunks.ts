import { parse, walk } from "svelte/compiler";
import prettier from "@prettier/sync";
import type { Attribute, TemplateNode } from "svelte/types/compiler/interfaces";
import { codeBlockPrettierConfig } from "../other/code-block-prettier.js";

type Chunk = {
	name: string;
	dependencies: string[];
	start: number;
	end: number;
	content: string;
};
export function getChunks(source: string, filename: string) {
	const ast = parse(source, { filename });
	const chunks: Chunk[] = [];

	walk(ast as any, {
		enter(n) {
			const chunkNode = n as TemplateNode;
			if (chunkNode.type !== "Element" && chunkNode.type !== "InlineComponent") return;

			const attrs: Attribute[] = chunkNode.attributes;
			const dataNode = attrs.find((a) => a.name === "data-x-chunk-name");
			if (dataNode === undefined) return;

			const name: string = dataNode.value[0].data;
			const dependencies = new Set<string>();

			// discard any prop members
			const [componentName] = chunkNode.name.split(".") as string[];
			dependencies.add(componentName);

			// walk the chunk to acquire all component dependencies
			walk(chunkNode as any, {
				enter(n) {
					const node = n as TemplateNode;
					if (node.type === "InlineComponent") {
						const [componentName] = node.name.split(".") as string[];
						dependencies.add(componentName);
					}
				},
			});

			const chunk = {
				name,
				dependencies: [...dependencies],
				start: chunkNode.start,
				end: chunkNode.end,
				content: "",
			};
			chunks.push({ ...chunk, content: transformChunk(source, chunk) });
			// don't traverse the rest of this node
			this.skip();
		},
	});

	return chunks;
}

export function transformChunk(source: string, chunk: Chunk): string {
	const html = source.substring(chunk.start, chunk.end);
	const lines = source.split("\n");
	const scriptEndIdx = lines.indexOf("</script>");
	const imports = lines
		// we only want to look at the script tag...
		.slice(0, scriptEndIdx)
		// spaced on the edges to prevent false positives (e.g. `CreditCard` could be falsely triggered by `Card`)
		.filter((line) => chunk.dependencies.some((dep) => line.includes(` ${dep} `)));

	let template = `<script lang="ts">\n`;
	template += imports.join("\n");
	template += `\n</script>\n\n${html}`;

	return prettier.format(template, {
		...codeBlockPrettierConfig,
		useTabs: true,
		tabWidth: undefined,
	});
}
