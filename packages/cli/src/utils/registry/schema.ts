import * as v from "valibot";

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

export type RegistryItemType = v.InferOutput<typeof registryItemTypeSchema>;
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
		type: v.picklist(registryItemTargetType),
		target: v.string(),
	}),
	v.object({
		path: v.string(),
		content: v.optional(v.string(), ""),
		type: v.picklist(registryItemSimpleType),
		target: v.optional(v.string()),
	}),
]);

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
export const registryIndexItemSchema = v.pipe(
	v.object({
		name: v.string(),
		title: v.optional(v.string()),
		type: registryItemTypeSchema,
		author: v.optional(
			v.pipe(v.string(), v.minLength(2, "Author name must be at least 2 characters"))
		),
		description: v.optional(v.string()),
		dependencies: v.optional(v.array(v.string()), []),
		devDependencies: v.optional(v.array(v.string()), []),
		registryDependencies: v.optional(v.array(v.string()), []),
		relativeUrl: v.string(),
	}),
	v.transform((item) => ({ ...item, title: item.title ?? item.name }))
);

export type RegistryIndex = v.InferOutput<typeof registryIndexSchema>;
export const registryIndexSchema = v.array(registryIndexItemSchema);

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;
export const registryItemSchema = v.intersect([
	registryIndexItemSchema,
	v.object({
		$schema: v.optional(v.string()),
		categories: v.optional(v.array(v.string())),
		css: v.optional(registryItemCssSchema),
		meta: v.optional(v.record(v.string(), v.any())),
		docs: v.optional(v.string()),
		files: v.optional(v.array(registryItemFileSchema), []),
		cssVars: v.optional(registryItemCssVarsSchema),
		relativeUrl: v.never(),
	}),
]);

export const registrySchema = v.object({
	name: v.string(),
	homepage: v.string(),
	items: v.array(registryIndexItemSchema),
});

const colorSchema = v.record(v.string(), v.string());
export const registryBaseColorSchema = v.object({
	inlineColors: v.object({ light: colorSchema, dark: colorSchema }),
	cssVars: v.object({ light: colorSchema, dark: colorSchema }),
	inlineColorsTemplate: v.string(),
	cssVarsTemplate: v.string(),
});
