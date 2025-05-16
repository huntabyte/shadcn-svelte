import { z } from "zod";
import type { Component } from "svelte";
import { type Highlighter, getHighlighter } from "shiki";
import { Blocks } from "../__registry__/blocks.js";
import { lambdaStudioBlackout } from "../styles/dark.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

export type RawBlock = {
	raw: () => Promise<string>;
	component: () => Promise<Component>;
};

// This also defines the order they appear on the blocks page.
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

export type BlockName = keyof typeof Blocks;

export const blockSchema = z.object({
	// @ts-expect-error TODO: remove later in zod 4
	name: z.enum<BlockName, BlockName[]>(getAllBlockIds()),
	description: z.string(),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
});

export type Block = z.infer<typeof blockSchema>;

export function getAllBlockIds(): readonly BlockName[] {
	const blocks = Object.keys(Blocks) as BlockName[];
	return blocks.map((name) => name).filter((b) => BLOCK_WHITELIST.includes(b));
}

export async function getBlock(name: BlockName) {
	const block = Blocks[name];
	const content = await getBlockContent(name);

	return blockSchema.parse({ name, ...block, ...content });
}

async function getBlockCode(name: BlockName) {
	const block = Blocks[name];
	const code = await block.raw();
	// use 2 spaces rather than tabs, making it the same as the rest of the codeblocks in /docs
	const detabbed = code.replaceAll("\t", "  ");
	return detabbed;
}

async function getBlockContent(name: BlockName) {
	const raw = await getBlockCode(name);
	const { description, iframeHeight, className } = blockMeta[name];
	const code = raw.replaceAll(`$lib/registry/`, "$lib/components/");

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
	const block = Blocks[name];
	return block !== undefined;
}
