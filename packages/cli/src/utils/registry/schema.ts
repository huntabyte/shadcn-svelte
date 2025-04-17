import * as v from "valibot";

export type RegistryItemType = v.InferOutput<typeof registryItemTypeSchema>;
const registryItemTypeSchema = v.picklist([
	"registry:ui",
	"registry:component",
	"registry:example",
	"registry:block",
	"registry:hook",
	"registry:page",
]);

const registryItemTailwindSchema = v.object({
	config: v.optional(
		v.object({
			content: v.optional(v.array(v.string())),
			theme: v.optional(v.record(v.string(), v.any())),
			plugins: v.optional(v.array(v.string())),
		})
	),
});

const registryItemCssVarsSchema = v.object({
	light: v.optional(v.record(v.string(), v.string())),
	dark: v.optional(v.record(v.string(), v.string())),
});

const registryItemFileSchema = v.object({ type: registryItemTypeSchema, path: v.string() });

export type RegistryIndexItem = v.InferOutput<typeof registryIndexItemSchema>;
export const registryIndexItemSchema = v.object({
	name: v.string(),
	type: registryItemTypeSchema,
	relativeUrl: v.string(),
	dependencies: v.fallback(v.array(v.string()), []),
	registryDependencies: v.fallback(v.array(v.string()), []),
	tailwind: v.optional(registryItemTailwindSchema),
	cssVars: v.optional(registryItemCssVarsSchema),
	files: v.array(registryItemFileSchema),
});

export type RegistryIndex = v.InferOutput<typeof registryIndexSchema>;
export const registryIndexSchema = v.array(registryIndexItemSchema);

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;
export const registryItemSchema = v.object({
	...v.omit(registryIndexItemSchema, ["relativeUrl"]).entries,
	files: v.array(
		v.object({
			name: v.string(),
			type: registryItemTypeSchema,
			content: v.string(),
			target: v.string(),
		})
	),
});

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
