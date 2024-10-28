import * as z from "zod";

export const registryStyleSchema = z.enum(["default", "new-york"]);

// This also defines the order they appear on the blocks page.
export const blockNames = [
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
	"demo-sidebar",
	"demo-sidebar-header",
	"demo-sidebar-footer",
	"demo-sidebar-group",
	"demo-sidebar-group-collapsible",
	"demo-sidebar-group-action",
	"demo-sidebar-menu",
	"demo-sidebar-menu-action",
	"demo-sidebar-menu-sub",
	"demo-sidebar-menu-collapsible",
	"demo-sidebar-menu-badge",
	"demo-sidebar-controlled",
] as const;

export const registryItemTypeSchema = z.enum([
	"registry:style",
	"registry:lib",
	"registry:example",
	"registry:block",
	"registry:component",
	"registry:ui",
	"registry:hook",
	"registry:theme",
	"registry:page",
]);

export const registryItemFileSchema = z.object({
	name: z.string(),
	path: z.string(),
	content: z.string().default(""),
	type: registryItemTypeSchema,
	target: z.string().default(""),
});

export const registryItemTailwindSchema = z.object({
	config: z.object({
		content: z.array(z.string()).optional(),
		theme: z.record(z.string(), z.any()).optional(),
		plugins: z.array(z.string()).optional(),
	}),
});

export const registryItemCssVarsSchema = z.object({
	light: z.record(z.string(), z.string()).optional(),
	dark: z.record(z.string(), z.string()).optional(),
});

export const registryEntrySchema = z.object({
	name: z.string(),
	type: registryItemTypeSchema,
	style: registryStyleSchema,
	description: z.string().optional(),
	dependencies: z.array(z.string()).default([]),
	registryDependencies: z.array(z.string()).default([]),
	files: z.array(registryItemFileSchema).default([]),
	tailwind: registryItemTailwindSchema.optional(),
	cssVars: registryItemCssVarsSchema.optional(),
	source: z.string().optional(),
	category: z.string().optional(),
	subcategory: z.string().optional(),
	docs: z.string().optional(),
});

export const registrySchema = z.array(registryEntrySchema);

export type RegistryEntry = z.output<typeof registryEntrySchema>;
export type RegistryItemFile = z.output<typeof registryItemFileSchema>;
export type RegistryStyle = z.output<typeof registryStyleSchema>;
export type Registry = z.output<typeof registrySchema>;

export type BlockName = (typeof blockNames)[number];

export const blockSchema = z.object({
	name: z.enum(blockNames),
	type: z.literal("registry:block"),
	description: z.string(),
	style: registryStyleSchema,
	container: z
		.object({
			height: z.string().optional(),
			className: z.string().nullish(),
		})
		.optional(),
	code: z.string(),
	highlightedCode: z.string().default(""),
	chunks: z.array(z.string()).default([]),
});

export type Block = z.infer<typeof blockSchema>;

export function isBlockName(str: string): str is BlockName {
	return blockNames.includes(str as never);
}
