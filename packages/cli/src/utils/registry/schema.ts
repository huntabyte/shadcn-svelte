import * as v from "valibot";

const registryItemTypeSchema = v.picklist([
	"registry:ui",
	"registry:component",
	"registry:example",
	"registry:block",
	"registry:hook",
	"registry:page",
]);

export type RegistryItemType = v.InferOutput<typeof registryItemTypeSchema>;

export const registryItemTailwindSchema = v.object({
	config: v.optional(
		v.object({
			content: v.optional(v.array(v.string())),
			theme: v.optional(v.record(v.string(), v.any())),
			plugins: v.optional(v.array(v.string())),
		})
	),
});

export const registryItemFileSchema = v.object({
	content: v.fallback(v.string(), ""),
	type: registryItemTypeSchema,
});

export const registryItemCssVarsSchema = v.object({
	light: v.optional(v.record(v.string(), v.string())),
	dark: v.optional(v.record(v.string(), v.string())),
});

export const registryItemSchema = v.object({
	name: v.string(),
	dependencies: v.fallback(v.array(v.string()), []),
	registryDependencies: v.fallback(v.array(v.string()), []),
	files: v.array(registryItemFileSchema),
	type: registryItemTypeSchema,
	tailwind: v.optional(registryItemTailwindSchema),
	cssVars: v.optional(registryItemCssVarsSchema),
});

export const registryIndexSchema = v.array(registryItemSchema);

export const registryItemWithContentSchema = v.object({
	...registryItemSchema.entries,
	...v.object({
		files: v.array(
			v.object({
				name: v.string(),
				content: v.string(),
				type: registryItemTypeSchema,
				target: v.string(),
			})
		),
	}).entries,
});

export const registryWithContentSchema = v.array(registryItemWithContentSchema);

export const registryBaseColorSchema = v.object({
	inlineColors: v.object({
		light: v.record(v.string(), v.string()),
		dark: v.record(v.string(), v.string()),
	}),
	cssVars: v.object({
		light: v.record(v.string(), v.string()),
		dark: v.record(v.string(), v.string()),
	}),
	inlineColorsTemplate: v.string(),
	cssVarsTemplate: v.string(),
});
