import * as z from "zod";

export const registrySchema = z.array(
	z.object({
		name: z.string(),
		style: z.string(),
		dependencies: z.array(z.string()),
		registryDependencies: z.array(z.string()),
		files: z.array(z.object({ name: z.string(), content: z.string(), path: z.string() })),
		type: z.enum([
			"components:ui",
			"components:component",
			"components:example",
			"components:block",
		]),
	})
);

export type Registry = z.infer<typeof registrySchema>;

export const registryEntrySchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	dependencies: z.array(z.string()).optional(),
	registryDependencies: z.array(z.string()).optional(),
	files: z.array(z.string()),
	type: z.enum([
		"components:ui",
		"components:component",
		"components:example",
		"components:block",
	]),
	category: z.string().optional(),
	subcategory: z.string().optional(),
});

export type RegistryEntry = z.infer<typeof registryEntrySchema>;

export const registryIndexSchema = z.array(registryEntrySchema);

export type RegistryIndex = z.infer<typeof registryIndexSchema>;

// This also defines the order they appear on the blocks page.
export const blockNames = [
	"dashboard-05",
	"dashboard-06",
	"dashboard-07",
	"dashboard-01",
	"dashboard-02",
	"dashboard-03",
	"dashboard-04",
	"authentication-01",
	"authentication-02",
	"authentication-03",
	"authentication-04",
] as const;

export type BlockName = (typeof blockNames)[number];

export const blockChunkSchema = z.object({
	name: z.string(),
	description: z.string(),
	code: z.string(),
	container: z
		.object({
			className: z.string().nullish(),
		})
		.optional(),
});

export const blockSchema = z.object({
	name: z.enum(blockNames),
	type: z.literal("components:block"),
	description: z.string(),
	style: z.enum(["default", "new-york"]),
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
	code: z.string(),
	highlightedCode: z.string(),
	chunks: z.array(z.string()),
});

export type Block = z.infer<typeof blockSchema>;
export type BlockChunk = z.infer<typeof blockChunkSchema>;
