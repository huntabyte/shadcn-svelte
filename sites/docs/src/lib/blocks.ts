import { type Highlighter, getHighlighter } from "shiki";
import type { Component } from "svelte";
import { Blocks } from "../__registry__/blocks.js";
import { lambdaStudioBlackout } from "../styles/dark.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";
import { type BlockName, type Style, blockSchema } from "$lib/registry/index.js";

const DEFAULT_BLOCKS_STYLE = "default" satisfies Style["name"];

export type RawBlockChunk = {
	name: string;
	description: string;
	container: {
		className: string;
	};
	raw: () => Promise<string>;
	component: () => Promise<Component>;
};

export type RawBlock = {
	name: string;
	type: string;
	chunks: RawBlockChunk[];
	raw: () => Promise<string>;
	component: () => Promise<Component>;
};

export const BLOCK_WHITELIST: BlockName[] = [
	"sidebar-01",
	"sidebar-02",
	"sidebar-03",
	"sidebar-04",
	"sidebar-05",
	"sidebar-06",
	"sidebar-07",
	"sidebar-08",
	"sidebar-09",
	"sidebar-10",
	"sidebar-11",
	"sidebar-12",
	"sidebar-13",
	"sidebar-14",
	"sidebar-15",
	"login-01",
];

export function isAllowedBlock(name: string): name is BlockName {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return BLOCK_WHITELIST.includes(name as any);
}

export function getAllBlockIds(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const blocks = Object.values(Blocks[style]);
	return blocks
		.map((block) => block.name as BlockName)
		.filter((b) => BLOCK_WHITELIST.includes(b));
}

export async function getBlock(name: BlockName, style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const block = Blocks[style][name];
	const content = await getBlockContent(name, style);
	const chunks = (block.chunks as Array<RawBlockChunk>).map((chunk) => chunk.name);

	return blockSchema.parse({
		...block,
		...content,
		style,
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
