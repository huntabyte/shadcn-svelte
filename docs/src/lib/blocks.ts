import { z } from "zod";
import { blocks } from "../__registry__/blocks.js";

export type BlockName = (typeof blocks)[number];

export function isBlock(name: unknown): name is BlockName {
	return blocks.includes(name as BlockName);
}

export const blockSchema = z.object({
	name: z.enum(blocks),
	description: z.string(),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
});

export type Block = z.infer<typeof blockSchema>;
