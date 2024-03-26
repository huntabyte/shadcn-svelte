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

export const blockSchema = registryEntrySchema.extend({
	type: z.literal("components:block"),
	style: z.enum(["default", "new-york"]),
	component: z.any(),
	container: z
		.object({
			height: z.string().optional(),
			class: z.string().nullish(),
		})
		.optional(),
	code: z.string(),
	highlightedCode: z.string(),
});

export type Block = z.infer<typeof blockSchema>;
