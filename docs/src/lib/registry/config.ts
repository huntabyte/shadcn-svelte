// Adapted from https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/config.ts

import { iconLibraries, type IconLibrary, type IconLibraryName } from "shadcn-svelte/icons";
import { z } from "zod/v4";

import { BASE_COLORS, type BaseColor } from "./base-colors.js";
import { fonts } from "./fonts.js";
import { STYLES, type Style } from "./styles/index.js";
import { THEMES, type Theme } from "./themes.js";

const SHADCN_VERSION = "latest";

export { STYLES, type Style };
export { THEMES, type Theme };
export { BASE_COLORS, type BaseColor };
export { fonts };
export { iconLibraries, type IconLibrary, type IconLibraryName };

export type StyleName = Style["name"];
export type ThemeName = Theme["name"];
export type BaseColorName = BaseColor["name"];

// Derive font values from registry fonts (e.g., "font-inter" -> "inter").
const fontValues = fonts.map((f) => f.name.replace("font-", "")) as [string, ...string[]];

export type FontValue = (typeof fontValues)[number];

export const MENU_ACCENTS = [
	{ value: "subtle", label: "Subtle" },
	{ value: "bold", label: "Bold" },
] as const;

export type MenuAccent = (typeof MENU_ACCENTS)[number];
export type MenuAccentValue = MenuAccent["value"];

export const MENU_COLORS = [
	{ value: "default", label: "Default" },
	{ value: "inverted", label: "Inverted" },
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
		style: z.enum(STYLES.map((s) => s.name) as [StyleName, ...StyleName[]]),
		iconLibrary: z.enum(Object.keys(iconLibraries) as [IconLibraryName, ...IconLibraryName[]]),
		baseColor: z
			.enum(BASE_COLORS.map((c) => c.name) as [BaseColorName, ...BaseColorName[]])
			.default("neutral"),
		theme: z.enum(THEMES.map((t) => t.name) as [ThemeName, ...ThemeName[]]),
		font: z.enum(fontValues).default("inter"),
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
		item: "Item",
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
		item: "Item",
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
		item: "Item",
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
		item: "Item",
		menuAccent: "subtle",
		menuColor: "default",
		radius: "default",
	},
];

export function getThemesForBaseColor(baseColorName: string) {
	const baseColorNames = BASE_COLORS.map((bc) => bc.name);

	return THEMES.filter((theme) => {
		if (theme.name === baseColorName) {
			return true;
		}
		return !baseColorNames.includes(theme.name);
	});
}

export function getStyle(name: StyleName) {
	return STYLES.find((style) => style.name === name);
}

export function getTheme(name: ThemeName) {
	return THEMES.find((theme) => theme.name === name);
}

export function getBaseColor(name: BaseColorName) {
	return BASE_COLORS.find((color) => color.name === name);
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
		lightVars["sidebar-accent"] = lightVars.primary;
		lightVars["sidebar-accent-foreground"] = lightVars["primary-foreground"];
		darkVars["sidebar-accent"] = darkVars.primary;
		darkVars["sidebar-accent-foreground"] = darkVars["primary-foreground"];
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
export function buildRegistryBase(config: DesignSystemConfig) {
	const iconLibraryItem = getIconLibrary(config.iconLibrary);

	if (!iconLibraryItem) {
		throw new Error(`Icon library "${config.iconLibrary}" not found`);
	}

	const registryTheme = buildRegistryTheme(config);

	// Build dependencies.
	const dependencies = [
		`shadcn@${SHADCN_VERSION}`,
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
			'@import "shadcn-svelte/tailwind.css"': {},
			"@layer base": {
				"*": { "@apply border-border outline-ring/50": {} },
				body: { "@apply bg-background text-foreground": {} },
			},
		},
	};
}
