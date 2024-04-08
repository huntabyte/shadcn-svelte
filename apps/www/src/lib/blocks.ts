import { z } from "zod";
import { type Highlighter, getHighlighter } from "shiki";
import { Blocks } from "../__registry__/blocks.js";
import { lambdaStudioBlackout } from "../styles/dark.js";
import { blockMeta } from "./config/blocks.js";
import { type BlockName, type Style, blockSchema, blocksEntrySchema } from "$lib/registry/index.js";

const DEFAULT_BLOCKS_STYLE = "default" satisfies Style["name"];

export async function getAllBlockIds(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const blocks = await getAllBlocks(style);
	return blocks.map((block) => block.name as BlockName);
}

export async function getBlock(name: BlockName, style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const entry = Blocks[style][name];
	const content = await getBlockContent(name, style);

	return blockSchema.parse({
		...entry,
		...content,
		style,
		highlightedCode: await highlightCode(content.code),
	});
}

export function isBlock(name: string): name is BlockName {
	// @ts-expect-error we're smarter than you, tsc
	const demo = Blocks.default[name];
	return demo !== undefined;
}

async function getAllBlocks(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const index = z.record(blocksEntrySchema).parse(Blocks[style]);
	return Object.values(index).filter((block) => block.type === "components:block");
}

async function getBlockCode(name: BlockName, style: Style["name"]) {
	const entry = Blocks[style][name];
	const code = await entry.raw();
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
