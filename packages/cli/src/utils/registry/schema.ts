import * as v from "valibot";

const registryItemTypeSchema = v.picklist([
	"registry:ui",
	"registry:component",
	"registry:example",
	"registry:block",
	"registry:hook",
]);

export const registryItemSchema = v.object({
	name: v.string(),
	dependencies: v.array(v.string()),
	registryDependencies: v.array(v.string()),
	files: v.array(v.string()),
	type: registryItemTypeSchema,
});

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
