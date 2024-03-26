import { blockSchema, registryEntrySchema, type Style } from "$lib/registry/index.js";
import { z } from "zod";
import { Index } from "../__registry__/index.js";
import { blockMeta } from "./config/blocks.js";
import { getHighlighter, type Highlighter } from "shiki";
import { lambdaStudioBlackout } from "../styles/dark.js";

const DEFAULT_BLOCKS_STYLE = "default" satisfies Style["name"];

export async function getAllBlockIds(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const blocks = await _getAllBlocks(style);
	return blocks.map((block) => block.name);
}

export async function getBlock(name: string, style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	/** @ts-expect-error - annoying */
	const entry = Index[style][name];

	const content = await _getBlockContent(name, style);

	return blockSchema.parse({
		style,
		highlightedCode: content.code ? await highlightCode(content.code) : "",
		...entry,
		...content,
		type: "components:block",
	});
}

async function _getAllBlocks(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const index = z.record(registryEntrySchema).parse(Index[style]);
	return Object.values(index).filter((block) => block.type === "components:block");
}

async function _getBlockCode(name: string, style: Style["name"]) {
	/** @ts-expect-error - annoying */
	const entry = Index[style][name];
	return await entry.raw();
}

async function _getBlockContent(name: string, style: Style["name"]) {
	const raw = await _getBlockCode(name, style);
	const { description, iframeHeight, className } = blockMeta[style][name];

	let code = raw;
	code = code.replaceAll(`$lib/registry/${style}/`, "$lib/components/");

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
			themes: [],
		});
		await highlighter.loadTheme({
			...lambdaStudioBlackout,
			name: "Lambda Studio - Blackout",
		});
	}

	const html = await highlighter.codeToHtml(code, {
		lang: "svelte",
		theme: "Lambda Studio - Blackout",
	});

	return html;
}
