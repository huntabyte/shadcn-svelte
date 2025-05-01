import * as v from "valibot";

export type RegistryItemType = v.InferOutput<typeof registryItemTypeSchema>;

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

/**
 * Used for internal purposes only.
 */
const registryItemInternalType = ["registry:example", "registry:internal"] as const;

const registryItemTargetTypeSchema = v.picklist(registryItemTargetType);
const registryItemSimpleTypeSchema = v.picklist(registryItemSimpleType);

const registryItemTypeSchema = v.picklist([
	...registryItemTargetType,
	...registryItemSimpleType,
	...registryItemInternalType,
]);

export const registryItemFileSchema = v.variant("type", [
	// target is required for registry:file and registry:page
	v.object({
		path: v.string(),
		content: v.optional(v.string(), ""),
		type: registryItemTargetTypeSchema,
		target: v.string(),
	}),
	v.object({
		path: v.string(),
		content: v.optional(v.string(), ""),
		type: registryItemSimpleTypeSchema,
		target: v.optional(v.string()),
	}),
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
	theme: v.optional(v.record(v.string(), v.string())),
	light: v.optional(v.record(v.string(), v.string())),
	dark: v.optional(v.record(v.string(), v.string())),
});

export const registryItemCssSchema = v.record(
	v.string(),
	v.lazy(() =>
		v.union([
			v.string(),
			v.record(v.string(), v.union([v.string(), v.record(v.string(), v.string())])),
		])
	)
);

export type RegistryIndexItem = v.InferOutput<typeof registryIndexItemSchema>;

export const registryIndexItemSchema = v.object({
	$schema: v.optional(v.string()),
	name: v.string(),
	type: registryItemTypeSchema,
	title: v.optional(v.string()),
	author: v.optional(
		v.pipe(v.string(), v.minLength(2, "Author name must be at least 2 characters"))
	),
	description: v.optional(v.string()),
	dependencies: v.optional(v.array(v.string()), []),
	devDependencies: v.optional(v.array(v.string()), []),
	registryDependencies: v.optional(v.array(v.string()), []),
	files: v.optional(v.array(registryItemFileSchema), []),
	tailwind: v.optional(registryItemTailwindSchema),
	cssVars: v.optional(registryItemCssVarsSchema),
	css: v.optional(registryItemCssSchema),
	meta: v.optional(v.record(v.string(), v.any())),
	docs: v.optional(v.string()),
	categories: v.optional(v.array(v.string())),
	relativeUrl: v.string(),
});

export type RegistryIndex = v.InferOutput<typeof registryIndexSchema>;
export const registryIndexSchema = v.array(registryIndexItemSchema);

export type RegistryItem = v.InferOutput<typeof registryIndexItemSchema>;
export const registryItemSchema = v.object({
	...v.omit(registryIndexItemSchema, ["relativeUrl"]).entries,
});

export const registrySchema = v.object({
	name: v.string(),
	homepage: v.string(),
	items: v.array(registryIndexItemSchema),
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
