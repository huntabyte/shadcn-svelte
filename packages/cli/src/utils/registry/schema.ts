import * as v from "valibot";

const registryItemTypeSchema = v.picklist([
	"registry:ui",
	"registry:component",
	"registry:example",
	"registry:block",
	"registry:hook",
	"registry:page",
	"registry:lib",
]);

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

export type RegistryItemFile = v.InferOutput<typeof registryItemFileSchema>;

export type RegistryItemTailwind = v.InferOutput<typeof registryItemTailwindSchema>;

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

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;

export const registryResolvedItemsTreeSchema = v.pick(registryItemSchema, [
	"dependencies",
	"files",
]);

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

export const stylesSchema = v.array(
	v.object({
		name: v.string(),
		label: v.string(),
	})
);

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
