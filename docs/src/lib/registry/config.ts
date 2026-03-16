// Adapted from https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/config.ts

import { iconLibraries, type IconLibrary, type IconLibraryName } from "shadcn-svelte/icons";
import { z } from "zod";

import { fonts } from "./fonts.js";
import { STYLES, type Style } from "./styles/index.js";
import { BASE_THEMES, THEMES, type BaseTheme, type Theme } from "./themes.js";
import { PRESET_BASE_COLOR_KEYS, PRESET_FONTS, type PresetConfig } from "shadcn-svelte/preset";

export { STYLES, type Style };
export { THEMES, type Theme };
export { BASE_THEMES, type BaseTheme };
export { fonts };
export { iconLibraries, type IconLibrary, type IconLibraryName };

export type StyleName = Style["name"];
export type ThemeName = Theme["name"];
export type BaseColorName = BaseTheme["name"];

export type FontValue = (typeof PRESET_FONTS)[number];

export const MENU_ACCENTS = [
	{ value: "subtle", label: "Subtle" },
	{ value: "bold", label: "Bold" },
] as const;

export type MenuAccent = (typeof MENU_ACCENTS)[number];
export type MenuAccentValue = MenuAccent["value"];

export const MENU_COLORS = [
	{ value: "default", label: "Default" },
	{ value: "inverted", label: "Inverted" },
	{ value: "default-translucent", label: "Default Translucent" },
	{ value: "inverted-translucent", label: "Inverted Translucent" },
] as const;

export type MenuColor = (typeof MENU_COLORS)[number];

export type MenuColorValue = MenuColor["value"];

export const RADII = [
	{ name: "default", label: "Default", value: "0.5rem" },
	{ name: "none", label: "None", value: "0rem" },
	{ name: "small", label: "Small", value: "0.45rem" },
	{ name: "medium", label: "Medium", value: "0.625rem" },
	{ name: "large", label: "Large", value: "0.875rem" },
] as const;

export type Radius = (typeof RADII)[number];

export type RadiusValue = Radius["name"];

export const designSystemConfigSchema = z
	.object({
		style: z.enum(STYLES.map((s) => s.name)).default("vega"),
		iconLibrary: z
			.enum(Object.keys(iconLibraries) as [IconLibraryName, ...IconLibraryName[]])
			.default("lucide"),
		baseColor: z.enum(PRESET_BASE_COLOR_KEYS).default("neutral"),
		theme: z.enum(THEMES.map((t) => t.name)),
		font: z.enum(PRESET_FONTS).default("inter"),
		menuAccent: z
			.enum(MENU_ACCENTS.map((a) => a.value) as [MenuAccentValue, ...MenuAccentValue[]])
			.default("subtle"),
		menuColor: z
			.enum(MENU_COLORS.map((m) => m.value) as [MenuColorValue, ...MenuColorValue[]])
			.default("default"),
		radius: z
			.enum(RADII.map((r) => r.name) as [RadiusValue, ...RadiusValue[]])
			.default("default"),
	})
	.refine((data) => {
		const availableThemes = getThemesForBaseColor(data.baseColor);
		return availableThemes.some((t) => t.name === data.theme);
	})
	.refine((data) => ({
		message: `Theme "${data.theme}" is not available for base color "${data.baseColor}"`,
		path: ["theme"],
	}));

export type DesignSystemConfig = z.infer<typeof designSystemConfigSchema>;

export const DEFAULT_CONFIG: DesignSystemConfig = {
	style: "vega",
	baseColor: "neutral",
	theme: "neutral",
	iconLibrary: "lucide",
	font: "inter",
	menuAccent: "subtle",
	menuColor: "default",
	radius: "default",
};

export type Preset = {
	name: string;
	title: string;
	description: string;
} & DesignSystemConfig;

export const PRESETS: Preset[] = [
	{
		name: "vega",
		title: "Vega",
		description: "Vega / Lucide / Geist Sans",
		style: "vega",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "geist",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
	{
		name: "nova",
		title: "Nova",
		description: "Nova / Hugeicons / Inter",
		style: "nova",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "inter",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
	{
		name: "maia",
		title: "Maia",
		description: "Maia / Hugeicons / Figtree",
		style: "maia",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "figtree",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
	{
		name: "lyra",
		title: "Lyra",
		description: "Lyra / Tabler / JetBrains Mono",
		style: "lyra",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "jetbrains-mono",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
];

export function getThemesForBaseColor(baseColorName: string) {
	const baseColorNames = BASE_THEMES.map((bc) => bc.name);

	return THEMES.filter((theme) => {
		if (theme.name === baseColorName) {
			return true;
		}
		return !baseColorNames.includes(theme.name as (typeof baseColorNames)[number]);
	});
}

export function getFont(name: FontValue) {
	return fonts.find((font) => font.name.replace("font-", "") === name);
}

export function getStyle(name: StyleName) {
	return STYLES.find((style) => style.name === name);
}

export function getTheme(name: ThemeName) {
	return THEMES.find((theme) => theme.name === name);
}

export function getBaseColor(name: BaseColorName) {
	return BASE_THEMES.find((color) => color.name === name);
}

export function getIconLibrary(name: IconLibraryName) {
	return iconLibraries[name];
}

// Builds a registry:theme item from a design system config.
export function buildRegistryTheme(config: DesignSystemConfig) {
	const baseColor = getBaseColor(config.baseColor);
	const theme = getTheme(config.theme);

	if (!baseColor || !theme) {
		throw new Error(`Base color "${config.baseColor}" or theme "${config.theme}" not found`);
	}

	// Merge base color and theme CSS vars.
	const lightVars: Record<string, string> = {
		...(baseColor.cssVars?.light as Record<string, string>),
		...(theme.cssVars?.light as Record<string, string>),
	};
	const darkVars: Record<string, string> = {
		...(baseColor.cssVars?.dark as Record<string, string>),
		...(theme.cssVars?.dark as Record<string, string>),
	};
	const themeVars: Record<string, string> = {};

	// Apply menu accent transformation.
	if (config.menuAccent === "bold") {
		lightVars.accent = lightVars.primary;
		lightVars["accent-foreground"] = lightVars["primary-foreground"];
		darkVars.accent = darkVars.primary;
		darkVars["accent-foreground"] = darkVars["primary-foreground"];
		// lightVars["sidebar-accent"] = lightVars.primary
		// lightVars["sidebar-accent-foreground"] = lightVars["primary-foreground"]
		// darkVars["sidebar-accent"] = darkVars.primary
		// darkVars["sidebar-accent-foreground"] = darkVars["primary-foreground"]
	}

	// Apply radius transformation.
	if (config.radius && config.radius !== "default") {
		const radius = RADII.find((r) => r.name === config.radius);
		if (radius && radius.value) {
			lightVars.radius = radius.value;
		}
	}

	return {
		name: `${config.baseColor}-${config.theme}`,
		type: "registry:theme" as const,
		cssVars: {
			theme: Object.keys(themeVars).length > 0 ? themeVars : undefined,
			light: lightVars,
			dark: darkVars,
		},
	};
}

// Builds a registry:base item from a design system config.
export function buildRegistryBase(config: PresetConfig) {
	const iconLibraryItem = getIconLibrary(config.iconLibrary);

	if (!iconLibraryItem) {
		throw new Error(`Icon library "${config.iconLibrary}" not found`);
	}

	const registryTheme = buildRegistryTheme(config);

	// Dependencies added on init
	const dependencies = [
		"tailwind-variants",
		"clsx",
		"tailwind-merge",
		"tw-animate-css",
		...iconLibraryItem.packages,
	];

	const registryDependencies = ["utils"];

	if (config.font) {
		registryDependencies.push(`font-${config.font}`);
	}

	return {
		name: config.style,
		extends: "none",
		type: "registry:base" as const,
		config: {
			style: config.style,
			iconLibrary: iconLibraryItem.name,
			menuColor: config.menuColor,
			menuAccent: config.menuAccent,
			tailwind: {
				baseColor: config.baseColor,
			},
		},
		dependencies,
		registryDependencies,
		cssVars: registryTheme.cssVars,
		css: {
			'@import "tw-animate-css"': {},
			"@layer base": {
				"*": { "@apply border-border outline-ring/50": {} },
				body: { "@apply bg-background text-foreground": {} },
			},

			// these are the styles that `@import "shadcn/tailwind.css"` adds
			// but that seems like the wrong solution so for the time being we'll add them on init
			"@custom-variant data-open": {
				'&:where([data-state="open"]), &:where([data-open]:not([data-open="false"]))': {
					"@slot": {},
				},
			},
			"@custom-variant data-closed": {
				'&:where([data-state="closed"]), &:where([data-closed]:not([data-closed="false"]))':
					{
						"@slot": {},
					},
			},
			"@custom-variant data-checked": {
				'&:where([data-state="checked"]), &:where([data-checked]:not([data-checked="false"]))':
					{
						"@slot": {},
					},
			},
			"@custom-variant data-unchecked": {
				'&:where([data-state="unchecked"]), &:where([data-unchecked]:not([data-unchecked="false"]))':
					{
						"@slot": {},
					},
			},
			"@custom-variant data-selected": {
				"&:where([data-selected])": {
					"@slot": {},
				},
			},
			"@custom-variant data-disabled": {
				'&:where([data-disabled="true"]), &:where([data-disabled]:not([data-disabled="false"]))':
					{
						"@slot": {},
					},
			},
			"@custom-variant data-active": {
				'&:where([data-state="active"]), &:where([data-active]:not([data-active="false"]))':
					{
						"@slot": {},
					},
			},
			"@custom-variant data-horizontal": {
				'&:where([data-orientation="horizontal"])': {
					"@slot": {},
				},
			},
			"@custom-variant data-vertical": {
				'&:where([data-orientation="vertical"])': {
					"@slot": {},
				},
			},
			"@utility no-scrollbar": {
				"-ms-overflow-style": "none",
				"scrollbar-width": "none",
				"&::-webkit-scrollbar": {
					display: "none",
				},
			},
		},
	};
}
