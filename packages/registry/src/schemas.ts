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

export type RegistryItemFile = v.InferOutput<typeof registryItemFileSchema>;
const registryItemFileSchema = v.variant("type", [
	v.object({
		name: v.string(),
		content: v.string(),
		type: v.picklist([...registryItemSimpleType, ...registryItemInternalType]),
		target: v.optional(v.string()),
	}),
	// target is required for registry:file and registry:page
	v.object({
		content: v.string(),
		type: v.picklist(registryItemTargetType),
		target: v.string(),
	}),
]);

const baseIndexItemSchema = v.object({
	name: v.string(),
	title: v.optional(v.string()),
	type: registryItemTypeSchema,
	author: v.optional(
		v.pipe(v.string(), v.minLength(2, "Author name must be at least 2 characters"))
	),
	description: v.optional(v.string()),
	dependencies: v.optional(v.array(v.string())),
	devDependencies: v.optional(v.array(v.string())),
	registryDependencies: v.optional(v.array(v.string())),
});

export type RegistryIndexItem = v.InferOutput<typeof registryIndexItemSchema>;
/** Schema for registry items defined in the index */
export const registryIndexItemSchema = v.object({
	...baseIndexItemSchema.entries,
	relativeUrl: v.string(),
});

export type RegistryIndex = v.InferOutput<typeof registryIndexSchema>;
/** Schema for the registry's index (e.g. `https://example.com/registry/index.json`) */
export const registryIndexSchema = v.array(registryIndexItemSchema);

const colorSchema = v.record(v.string(), v.string());
/** Schema for base color endpoints (e.g. `https://example.com/registry/colors/slate.json`) */
export const registryBaseColorSchema = v.object({
	inlineColors: v.object({ light: colorSchema, dark: colorSchema }),
	cssVars: v.object({ light: colorSchema, dark: colorSchema }),
	inlineColorsTemplate: v.string(),
	cssVarsTemplate: v.string(),
});

export type CssVars = v.InferOutput<typeof registryItemCssVarsSchema>;
const registryItemCssVarsSchema = v.object({
	theme: v.optional(colorSchema),
	light: v.optional(colorSchema),
	dark: v.optional(colorSchema),
});

type CssSchema = { [x: string]: string | CssSchema };
const registryItemCssSchema: v.GenericSchema<CssSchema> = v.record(
	v.string(),
	v.lazy(() => v.union([v.string(), registryItemCssSchema]))
);

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;
/** Schema for registry item endpoints (e.g. `https://example.com/registry/item.json`) */
export const registryItemSchema = v.object({
	$schema: v.optional(v.string()),
	...baseIndexItemSchema.entries,
	categories: v.optional(v.array(v.string())),
	css: v.optional(registryItemCssSchema),
	meta: v.optional(v.record(v.string(), v.any())),
	docs: v.optional(v.string()),
	files: v.array(registryItemFileSchema),
	cssVars: v.optional(registryItemCssVarsSchema),
});

export type Registry = v.InferOutput<typeof registrySchema>;
/** Schema for `registry.json` */
export const registrySchema = v.object({
	$schema: v.optional(v.string()),
	name: v.string(),
	homepage: v.string(),
	// installs specified versions of dependencies during auto-detection
	overrideDependencies: v.optional(v.array(v.string())),
	items: v.array(
		v.object({
			...baseIndexItemSchema.entries,
			files: v.array(
				v.object({
					path: v.string(),
					type: registryItemTypeSchema,
				})
			),
			registryDependencies: v.array(v.string()),
		})
	),
});
