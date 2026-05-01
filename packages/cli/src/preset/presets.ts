import {
	decodePreset,
	isValidPreset,
	PRESET_BASE_COLORS,
	PRESET_THEMES,
	type PresetConfig,
	PRESET_RADII,
	PRESET_FONTS,
} from "./preset.js";
import * as cliConfig from "../utils/config/index.js";
import * as p from "@clack/prompts";
import color from "picocolors";
import { cancel } from "../utils/prompt-helpers.js";
import * as registry from "../utils/registry/index.js";
import open from "open";
import { iconLibraries } from "../icons/libraries.js";
import { entries, kebabToPascal } from "../utils/utils.js";
import { hex } from "../utils/colors.js";

export const DEFAULT_PRESETS = {
	nova: {
		title: "Nova",
		description: "Lucide / Geist",
		hint: "Reduced spacing for compact layouts.",
		style: "nova",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "geist",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	vega: {
		title: "Vega",
		description: "Lucide / Inter",
		hint: "The classic shadcn/ui look.",
		style: "vega",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "inter",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	maia: {
		title: "Maia",
		description: "Hugeicons / Figtree",
		hint: "Soft and rounded, with generous spacing.",
		style: "maia",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "figtree",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	lyra: {
		title: "Lyra",
		description: "Phosphor / JetBrains Mono",
		hint: "Boxy and sharp. Pairs well with mono fonts.",
		style: "lyra",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "phosphor",
		font: "jetbrains-mono",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	mira: {
		title: "Mira",
		description: "Hugeicons / Inter",
		hint: "Compact. Made for dense interfaces.",
		style: "mira",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "inter",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	luma: {
		title: "Luma",
		description: "Lucide / Inter",
		hint: "Rounded geometry. Soft elevation. Breathable layouts.",
		style: "luma",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "inter",
		fontHeading: "inherit",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	sera: {
		title: "Sera",
		description: "Lucide / Noto Sans + Playfair Display",
		hint: "Editorial and typographic.",
		style: "sera",
		baseColor: "taupe",
		theme: "taupe",
		iconLibrary: "lucide",
		font: "noto-sans",
		fontHeading: "playfair-display",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
} as const;

/**
 * When the user doesn't provide a preset we want to give them some options for configuring the design system.
 * 1. Go to `/create`, customize, and paste the code back here when they are ready
 * 2. Choose from the list of presets
 * 3. Prompt for the presets
 *
 * @param existingConfig
 */
export async function promptForPreset(
	existingConfig: cliConfig.RawConfig | undefined
): Promise<PresetConfig> {
	const continuationChoice = await p.select({
		message:
			"You didn't provide a preset for the design system, how would you like to continue?",
		initialValue: existingConfig?.style !== undefined ? "prompt" : "presets",
		options: Object.entries(CONTINUATION_OPTIONS).map(([key, option]) => ({
			label: option.label,
			value: key,
		})),
	});

	if (p.isCancel(continuationChoice)) cancel();

	return await CONTINUATION_OPTIONS[
		continuationChoice as keyof typeof CONTINUATION_OPTIONS
	].select(existingConfig);
}

type ContinuationOption = {
	label: string;
	select: (existingConfig: cliConfig.RawConfig | undefined) => Promise<PresetConfig>;
};

const CONTINUATION_OPTIONS = {
	presets: {
		label: "Choose from a list of pre-configured presets",
		select: (existingConfig) => presets(existingConfig),
	},
	customize: {
		label: `Create my own preset at ${color.bold("shadcn-svelte.com/create")}`,
		select: (existingConfig) => customize(existingConfig),
	},
	prompt: {
		label: "Prompt me for the preset",
		select: (existingConfig) => prompt(existingConfig),
	},
} as const satisfies Record<string, ContinuationOption>;

async function customize(existingConfig: cliConfig.RawConfig | undefined): Promise<PresetConfig> {
	const siteUrl = registry.getSiteUrl(existingConfig ?? cliConfig.DEFAULT_CONFIG);
	const createUrl = new URL("/create", siteUrl).toString();

	const spinner = p.spinner();

	spinner.start(`Opening ${color.bold(createUrl)} in your browser`);

	await open(createUrl);

	spinner.stop(`Opened ${color.bold(createUrl)} in your browser`);

	const cleanPreset = (preset: string) => {
		const flag = "--preset ";
		if (preset.startsWith(flag)) {
			preset = preset.slice(flag.length);
		}
		return preset;
	};

	const code = await p.text({
		message:
			"When you're done, paste the code back here and we'll use it to configure your project.",
		placeholder: "Click on the `--preset <code>` button and paste the code here",
		validate: (v) => {
			const cleaned = cleanPreset(v ?? "");

			if (isValidPreset(cleaned)) {
				return;
			}

			return "Invalid preset code";
		},
	});

	if (p.isCancel(code)) cancel();

	// we already validated the preset code so we can safely assert it's not null
	return decodePreset(cleanPreset(code as string))!;
}

async function presets(existingConfig: cliConfig.RawConfig | undefined) {
	const choice = await p.select({
		message: "Choose from a list of pre-configured presets",
		initialValue: existingConfig?.style ?? "vega",
		options: entries(DEFAULT_PRESETS).map(([key, preset]) => ({
			label: `${preset.title} - ${preset.description}`,
			value: key,
			hint: preset.hint,
		})),
	});

	if (p.isCancel(choice)) cancel();

	return DEFAULT_PRESETS[choice as keyof typeof DEFAULT_PRESETS];
}

async function prompt(existingConfig: cliConfig.RawConfig | undefined): Promise<PresetConfig> {
	const choices = await p.group(
		{
			style: () =>
				p.select({
					message: "Choose a style",
					initialValue: existingConfig?.style ?? cliConfig.DEFAULT_CONFIG.style,
					options: entries(DEFAULT_PRESETS).map(([key, preset]) => ({
						label: preset.title,
						value: key,
						hint: preset.hint,
					})),
				}),
			radius: () =>
				p.select({
					message: "Choose a radius",
					initialValue: "default",
					options: entries(PRESET_RADII).map(([key, radius]) => ({
						label: `${radius.label} ${radius.value}`,
						value: key,
					})),
				}),
			baseColor: () =>
				p.select({
					message: "Choose a base color",
					initialValue:
						existingConfig?.tailwind.baseColor ??
						cliConfig.DEFAULT_CONFIG.tailwind.baseColor,
					options: entries(PRESET_BASE_COLORS).map(([key, baseColor]) => ({
						label: `${hex(baseColor.color)("■")} ${baseColor.name}`,
						value: key,
					})),
				}),
			theme: ({ results }) =>
				p.select({
					message: "Choose a theme",
					initialValue: results.baseColor,
					options: entries(PRESET_THEMES).map(([key, theme]) => ({
						label: `${hex(theme.color)("■")} ${theme.name}`,
						value: key,
					})),
				}),
			iconLibrary: () =>
				p.select({
					message: "Choose an icon library",
					initialValue:
						existingConfig?.iconLibrary ?? cliConfig.DEFAULT_CONFIG.iconLibrary,
					options: entries(iconLibraries).map(([_key, iconLibrary]) => ({
						label: iconLibrary.title,
						value: iconLibrary.name,
						hint: iconLibrary.packages.join(", "),
					})),
				}),
			font: () =>
				p.select({
					message: "Choose a font",
					initialValue: "inter",
					options: PRESET_FONTS.map((font) => ({
						label: kebabToPascal(font),
						value: font,
					})),
				}),
		},
		{
			onCancel: () => cancel(),
		}
	);

	return {
		style: choices.style as PresetConfig["style"],
		baseColor: choices.baseColor as PresetConfig["baseColor"],
		theme: choices.theme as PresetConfig["theme"],
		iconLibrary: choices.iconLibrary,
		font: choices.font as PresetConfig["font"],
		fontHeading: "inherit",
		radius: choices.radius as PresetConfig["radius"],
		menuColor: existingConfig?.menuColor ?? cliConfig.DEFAULT_CONFIG.menuColor,
		menuAccent: existingConfig?.menuAccent ?? cliConfig.DEFAULT_CONFIG.menuAccent,
	};
}
