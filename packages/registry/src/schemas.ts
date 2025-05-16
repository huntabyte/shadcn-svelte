import { z } from "zod/v4";

const registryItemTargetType = ["registry:file", "registry:page"] as const;
const registryItemSimpleType = [
	"registry:lib",
	"registry:block",
	"registry:component",
	"registry:ui",
	"registry:hook",
	"registry:theme",
	"registry:style",
] as const;

/** Used for internal purposes only. */
const registryItemInternalType = ["registry:example", "registry:internal"] as const;

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>;
const registryItemTypeSchema = z.enum([
	...registryItemTargetType,
	...registryItemSimpleType,
	...registryItemInternalType,
]);

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>;
const registryItemFileSchema = z.discriminatedUnion("type", [
	z.object({
		name: z.string(),
		content: z.string(),
		type: z.enum([...registryItemSimpleType, ...registryItemInternalType]),
		target: z.string().optional(),
	}),
	// target is required for registry:file and registry:page
	z.object({
		content: z.string(),
		type: z.enum(registryItemTargetType),
		target: z.string(),
	}),
]);

const baseIndexItemSchema = z.object({
	name: z.string(),
	title: z.string().optional(),
	type: registryItemTypeSchema,
	author: z.string().min(2, "Author name must be at least 2 characters").optional(),
	description: z.string().optional(),
	dependencies: z.string().array().optional(),
	devDependencies: z.string().array().optional(),
	registryDependencies: z.string().array().optional(),
});

export type RegistryIndexItem = z.infer<typeof registryIndexItemSchema>;
/** Schema for registry items defined in the index */
export const registryIndexItemSchema = baseIndexItemSchema.extend({ relativeUrl: z.string() });

export type RegistryIndex = z.infer<typeof registryIndexSchema>;
/** Schema for the registry's index (e.g. `https://example.com/registry/index.json`) */
export const registryIndexSchema = z.array(registryIndexItemSchema);

const colorSchema = z.record(z.string(), z.string());
/** Schema for base color endpoints (e.g. `https://example.com/registry/colors/slate.json`) */
export const registryBaseColorSchema = z.object({
	inlineColors: z.object({ light: colorSchema, dark: colorSchema }),
	cssVars: z.object({ light: colorSchema, dark: colorSchema }),
	inlineColorsTemplate: z.string(),
	cssVarsTemplate: z.string(),
});

export type CssVars = z.infer<typeof registryItemCssVarsSchema>;
const registryItemCssVarsSchema = z.object({
	theme: z.optional(colorSchema),
	light: z.optional(colorSchema),
	dark: z.optional(colorSchema),
});

type CssSchema = { [x: string]: string | CssSchema };
const registryItemCssSchema: z.ZodType<CssSchema> = z.record(
	z.string(),
	z.lazy(() => z.union([z.string(), registryItemCssSchema]))
);

export type RegistryItem = z.infer<typeof registryItemSchema>;
/** Schema for registry item endpoints (e.g. `https://example.com/registry/item.json`) */
export const registryItemSchema = baseIndexItemSchema.extend({
	$schema: z.string().optional(),
	categories: z.string().array().optional(),
	css: z.optional(registryItemCssSchema),
	meta: z.record(z.string(), z.any()).optional(),
	docs: z.string().optional(),
	files: z.array(registryItemFileSchema),
	cssVars: z.optional(registryItemCssVarsSchema),
});

export type Registry = z.infer<typeof registrySchema>;
/** Schema for `registry.json` */
export const registrySchema = z.object({
	$schema: z.string().optional(),
	name: z.string(),
	homepage: z.string(),
	// installs specified versions of dependencies during auto-detection
	overrideDependencies: z.string().array().optional(),
	aliases: z
		.object({
			lib: z.string().optional(),
			ui: z.string().optional(),
			components: z.string().optional(),
			utils: z.string().optional(),
			hooks: z.string().optional(),
		})
		.optional(),
	items: baseIndexItemSchema
		.extend({
			files: z.object({ path: z.string(), type: registryItemTypeSchema }).array(),
			registryDependencies: z.string().array(),
			cssVars: z.optional(registryItemCssVarsSchema),
			css: z.optional(registryItemCssSchema),
		})
		.array(),
});
