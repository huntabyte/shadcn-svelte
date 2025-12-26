import { z } from "zod";

const registryItemFileType = [
	"registry:lib",
	"registry:block",
	"registry:component",
	"registry:ui",
	"registry:hook",
	"registry:page",
	"registry:file",
	"registry:theme",
	"registry:style",
	"registry:item",
	"registry:font",
] as const;

const registryItemComplexType = ["registry:block"] as const;

/** Used for internal purposes only. */
const registryItemInternalType = ["registry:example", "registry:internal"] as const;

export type RegistryItemType = z.infer<typeof registryItemTypeSchema>;
const registryItemTypeSchema = z
	.enum([...registryItemFileType, ...registryItemComplexType, ...registryItemInternalType])
	.describe(
		"The type of the item. Used to determine the type and target path of the item when resolved for a project."
	);

export type RegistryItemFileType = z.infer<typeof registryItemFileTypeSchema>;
const registryItemFileTypeSchema = z
	.enum(registryItemFileType)
	.describe("The type of the file. Used to resolve the file's path for a project.");

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>;
export const registryItemFileSchema = z
	.object({
		content: z.string().describe("The content of the file."),
		type: registryItemFileTypeSchema,
		target: z
			.string()
			.describe("The target path of the file. This is where the file will be installed."),
	})
	.describe(
		"The main payload of the registry item. This is an array of files that are part of the registry item. Each file is an object with a target, type, and content."
	);

const registryDependenciesSchema = z
	.string()
	.array()
	.describe(
		"An array of registry items that this item depends on. Use the name of the item to reference shadcn/ui components and urls to reference other registries."
	);

const baseIndexItemSchema = z.object({
	name: z
		.string()
		.describe(
			"The name of the item. Used to identify the item in the registry. It should be unique for your registry."
		),
	title: z
		.string()
		.optional()
		.describe(
			"The human-readable title for your registry item. Keep it short and descriptive."
		),
	type: registryItemTypeSchema,
	author: z
		.string()
		.min(2, "Author name must be at least 2 characters")
		.optional()
		.describe("The author of the item. Recommended format: username <url>"),
	description: z
		.string()
		.optional()
		.describe("The description of the item. Used to provide a brief overview of the item."),
	dependencies: z
		.string()
		.array()
		.optional()
		.describe("An array of NPM dependencies required by the registry item."),
	devDependencies: z
		.string()
		.array()
		.optional()
		.describe("An array of NPM dev dependencies required by the registry item."),
	registryDependencies: z.optional(registryDependenciesSchema),
	meta: z
		.record(z.string(), z.any())
		.optional()
		.describe(
			"Additional metadata for the registry item. This is an object with any key value pairs."
		),
});

export type RegistryIndexItem = z.infer<typeof registryIndexItemSchema>;
/** Schema for registry items defined in the index */
export const registryIndexItemSchema = baseIndexItemSchema.extend({
	relativeUrl: z.string(),
});

export type RegistryIndex = z.infer<typeof registryIndexSchema>;
/** Schema for the registry's index (e.g. `https://example.com/registry/index.json`) */
export const registryIndexSchema = z.array(registryIndexItemSchema);

const colorSchema = z.record(z.string(), z.string());
/** Schema for base color endpoints (e.g. `https://example.com/registry/colors/slate.json`) */
export const registryBaseColorSchema = z.object({
	cssVars: z.object({ light: colorSchema, dark: colorSchema }),
});

export type CssVars = z.infer<typeof registryItemCssVarsSchema>;
const registryItemCssVarsSchema = z
	.object({
		theme: z
			.optional(colorSchema)
			.describe(
				"CSS variables for the @theme directive. For Tailwind v4 projects only. Use tailwind for older projects."
			),
		light: z.optional(colorSchema).describe("CSS variables for the light theme."),
		dark: z.optional(colorSchema).describe("CSS variables for the dark theme."),
	})
	.describe(
		"The css variables for the registry item. This will be merged with the project's css variables."
	);

export type CssSchema = { [x: string]: string | CssSchema };
const registryItemCssSchema: z.ZodType<CssSchema, CssSchema> = z
	.record(
		z
			.string()
			.describe("Direct CSS string (e.g., 'font-family: sans-serif; line-height: 1.5;')"),
		z
			.lazy(() =>
				z.union([
					z
						.string()
						.describe("CSS property value (e.g., 'blue', 'var(--color-primary)')"),
					registryItemCssSchema.describe("CSS property value for nested rule"),
				])
			)
			.describe("CSS properties or nested selectors")
	)
	.describe(
		"CSS definitions to be added to the project's CSS file. Supports at-rules, selectors, nested rules, utilities, layers, and more."
	);

export const registryItemCommonSchema = z.object({
	$schema: z.string().optional(),
	...baseIndexItemSchema.shape,
	docs: z
		.string()
		.optional()
		.describe("The documentation for the registry item. This is a markdown string."),
	categories: z
		.string()
		.array()
		.optional()
		.describe("The categories of the registry item. This is an array of strings."),
	css: z.optional(registryItemCssSchema),
	cssVars: z.optional(registryItemCssVarsSchema),

	files: z.array(registryItemFileSchema).optional(),
});

/** Font metadata schema for registry:font items. */
export const registryItemFontSchema = registryItemCommonSchema.extend({
	type: z.literal("registry:font"),
	font: z.object({
		family: z.string(),
		cssImport: z.string(),
		variable: z.string(),
		dependencies: z.array(z.string()).optional(),
	}),
});

export type RegistryFont = z.infer<typeof registryItemFontSchema>;

export type RegistryItem = z.infer<typeof registryItemSchema>;

/** Schema for registry item endpoints (e.g. `https://example.com/registry/item.json`) */
export const registryItemSchema = z.discriminatedUnion("type", [
	registryItemFontSchema,
	registryItemCommonSchema.extend({
		type: registryItemTypeSchema.exclude(["registry:font"]),
	}),
]);

export type Registry = z.infer<typeof registrySchema>;

/** Schema for `registry.json` */
export const registrySchema = z.object({
	$schema: z.string().optional(),
	name: z.string().describe("The name of the registry."),
	homepage: z.string().describe("The homepage of the registry."),
	// installs specified versions of dependencies during auto-detection
	overrideDependencies: z
		.string()
		.array()
		.optional()
		.describe(
			"An array of NPM dependencies that should have their versions overridden during registry `build`."
		),
	aliases: z
		.object({
			lib: z.string().optional(),
			ui: z.string().optional(),
			components: z.string().optional(),
			utils: z.string().optional(),
			hooks: z.string().optional(),
		})
		.optional()
		.describe(
			"Defines which internal import paths should be transformed during registry `build`."
		),
	items: baseIndexItemSchema
		.extend({
			files: registryItemFileSchema
				.partial()
				.extend({
					path: z
						.string()
						.describe("The path to the file relative to the registry root."),
					type: registryItemFileTypeSchema,
				})
				.array()
				.describe(
					"An array of files that instructs the `build` command on how to locate and parse the registry files."
				),
			registryDependencies: registryDependenciesSchema,
			cssVars: z.optional(registryItemCssVarsSchema),
			css: z.optional(registryItemCssSchema),
		})
		.array()
		.describe("Defines a custom component registry."),
});

/** Schema for a project's `components.json` config file. */
export const componentsJsonSchema = z.object({
	$schema: z.string().optional(),
	style: z
		.string()
		.optional()
		.describe(
			"DEPRECATED IN TAILWIND v4! The style for your components. This cannot be changed after initialization."
		),
	tailwind: z.object({
		css: z
			.string()
			.describe("Path to the CSS file that imports Tailwind CSS into your project."),
		baseColor: z
			.string()
			.describe(
				"Used to generate the default color palette for your components. This cannot be changed after initialization."
			),
		config: z
			.string()
			.optional()
			.describe(
				"DEPRECATED IN TAILWIND v4! The path to your `tailwind.config.[js|ts]` file."
			),
		// cssVariables: z.boolean().default(true)
	}),
	aliases: z
		.object({
			components: z.string().describe("Import alias for your components."),
			utils: z.string().describe("Import alias for your utility functions."),
			ui: z
				.string()
				.optional()
				.describe("Import alias for your UI components. Defaults to `$lib/components/ui`."),
			hooks: z
				.string()
				.optional()
				.describe("Import alias for your hooks. Defaults to `$lib/hooks`."),
			lib: z
				.string()
				.optional()
				.describe(
					"Import alias for your library, which is typically where you store your components, utils, hooks, etc. Defaults to `$lib`."
				),
		})
		.describe(
			"The CLI uses these values and the `alias` config from your `svelte.config.js` file to place generated components in the correct location."
		),
	registry: z
		.string()
		.optional()
		.describe(
			"The registry URL tells the CLI where to fetch the shadcn-svelte components/registry from. You can pin this to a specific preview release or your own fork of the registry."
		),
	typescript: z
		.union([
			z.boolean(),
			z.object({ config: z.string().describe("Path to the tsconfig/jsconfig file.") }),
		])
		.optional()
		.describe(
			"Used to determine if Typescript is used for this project. When set to `false`, `.js` files will be installed instead. Defaults to `true`."
		),
});
