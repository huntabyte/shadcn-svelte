import { blockSchema, registryEntrySchema, type Style } from "$lib/registry/index.js";
import { z } from "zod";
import { Index } from "../__registry__/index.js";
import { blockMeta } from "./config/blocks.js";
import { lambdaStudioBlackout } from "../styles/dark.js";
import { type Highlighter, getHighlighter } from "shiki";

const DEFAULT_BLOCKS_STYLE = "default" satisfies Style["name"];

type DemoName = keyof (typeof Index)["default"];

export async function getAllBlockIds(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const blocks = await getAllBlocks(style);
	return blocks.map((block) => block.name as DemoName);
}

export async function getBlock(name: DemoName, style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const entry = Index[style][name];
	const content = await getBlockContent(name, style);

	return blockSchema.parse({
		style,
		highlightedCode: content.code ? await highlightCode(content.code) : "",
		...entry,
		...content,
		type: "components:block",
	});
}

export function isDemo(name: string): name is DemoName {
	// @ts-expect-error we're smarter than you, tsc
	const demo = Index["default"][name];
	return demo !== undefined;
}

async function getAllBlocks(style: Style["name"] = DEFAULT_BLOCKS_STYLE) {
	const index = z.record(registryEntrySchema).parse(Index[style]);
	return Object.values(index).filter((block) => block.type === "components:block");
}

async function getBlockCode(name: DemoName, style: Style["name"]) {
	const entry = Index[style][name];
	return await entry.raw();
}

async function getBlockContent(name: DemoName, style: Style["name"]) {
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
