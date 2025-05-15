import * as v from "valibot";
import type { Component } from "svelte";
import { Blocks } from "../__registry__/blocks.js";
import { blockMeta } from "$lib/registry/registry-block-meta.js";

export type RawBlock = {
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

export const blockSchema = v.object({
	name: v.picklist(getAllBlockIds()),
	description: v.string(),
	container: v.optional(
		v.object({
			height: v.optional(v.string()),
			className: v.nullish(v.string()),
		})
	),
});

export type Block = v.InferOutput<typeof blockSchema>;

export function getAllBlockIds() {
	const blocks = Object.keys(Blocks);
	return blocks.map((name) => name as BlockName).filter((b) => BLOCK_WHITELIST.includes(b));
}

export async function getBlock(name: BlockName) {
	const block = Blocks[name];
	const content = await getBlockContent(name);

	return v.parse(blockSchema, { name, ...block, ...content });
}

async function getBlockContent(name: BlockName) {
	const { description, iframeHeight, className } = blockMeta[name];

	return {
		description,
		container: {
			height: iframeHeight,
			className,
		},
	};
}

export function isBlock(name: string): name is BlockName {
	// @ts-expect-error we're smarter than you, tsc
	const block = Blocks[name];
	return block !== undefined;
}
