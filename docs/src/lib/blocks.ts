import { z } from "zod";
import { blocks } from "../__registry__/blocks.js";

export type BlockName = (typeof blocks)[number];

export function isBlock(name: unknown): name is BlockName {
	return blocks.includes(name as BlockName);
}

export const blockSchema = z.object({
	// @ts-expect-error TODO: remove later in zod 4
	name: z.enum<BlockName, BlockName[]>(blocks),
	description: z.string(),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
});

export type Block = z.infer<typeof blockSchema>;
