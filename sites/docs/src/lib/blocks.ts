import { z } from "zod";
import type { Component } from "svelte";
import { Blocks } from "../__registry__/blocks.js";

export type RawBlock = {
	raw: () => Promise<string>;
	component: () => Promise<Component>;
};

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
	return blocks.filter((b) => !b.startsWith("chart-"));
}

export function isBlock(name: string): name is BlockName {
	// @ts-expect-error we're smarter than you, tsc
	const block = Blocks[name];
	return block !== undefined;
}
