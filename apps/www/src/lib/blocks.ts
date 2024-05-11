import { type Highlighter, getHighlighter } from "shiki";
import type { ComponentType } from "svelte";
import { Blocks } from "../__registry__/blocks.js";
import { lambdaStudioBlackout } from "../styles/dark.js";
import { blockMeta } from "./config/blocks.js";
import { type BlockName, type Style, blockSchema } from "$lib/registry/index.js";

const DEFAULT_BLOCKS_STYLE = "default" satisfies Style["name"];

export type RawBlockChunk = {
	name: string;
	description: string;
	container: {
		className: string;
	};
	raw: () => Promise<string>;
	component: () => Promise<ComponentType>;
};

export type RawBlock = {
	name: string;
	type: string;
	chunks: RawBlockChunk[];
	raw: () => Promise<string>;
	component: () => Promise<ComponentType>;
};

export function getAllBlockIds(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const blocks = Object.values(Blocks[style]);
	return blocks.map((block) => block.name as BlockName);
}

export async function getBlock(name: BlockName, style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const block = Blocks[style][name];
	const content = await getBlockContent(name, style);
	const chunks = block.chunks.map((chunk) => chunk.name);

	return blockSchema.parse({
		...block,
		...content,
		style,
		highlightedCode: await highlightCode(content.code),
		chunks,
	});
}

async function getBlockCode(name: BlockName, style: Style["name"]) {
	const block = Blocks[style][name];
	const code = await block.raw();
	// use 2 spaces rather than tabs, making it the same as the rest of the codeblocks in /docs
	const detabbed = code.replaceAll("\t", "  ");
	return detabbed;
}

async function getBlockContent(name: BlockName, style: Style["name"]) {
	const raw = await getBlockCode(name, style);
	const { description, iframeHeight, className } = blockMeta[style][name];

	const code = raw.replaceAll(`$lib/registry/${style}/`, "$lib/components/");

	return {
		description,
		code,
		container: {
			height: iframeHeight,
			className,
		},
	};
}

let highlighter: Highlighter;

export async function highlightCode(code: string) {
	if (!highlighter) {
		highlighter = await getHighlighter({
			langs: ["svelte"],
			themes: [lambdaStudioBlackout],
		});
	}

	const html = highlighter.codeToHtml(code, {
		lang: "svelte",
		theme: "Lambda Studio - Blackout",
	});

	return html;
}

export function isBlock(name: string): name is BlockName {
	// @ts-expect-error we're smarter than you, tsc
	const block = Blocks.default[name];
	return block !== undefined;
}
