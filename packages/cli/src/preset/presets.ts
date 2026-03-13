import { decodePreset, isValidPreset, type PresetConfig } from "./preset.js";
import * as cliConfig from "../utils/config/index.js";
import * as p from "@clack/prompts";
import color from "picocolors";
import { cancel } from "../utils/prompt-helpers.js";
import * as registry from "../utils/registry/index.js";
import open from 'open';

export const DEFAULT_PRESETS = {
	nova: {
		title: "Nova",
		description: "Lucide / Geist",
		style: "nova",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "geist",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	vega: {
		title: "Vega",
		description: "Lucide / Inter",
		style: "vega",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "lucide",
		font: "inter",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	maia: {
		title: "Maia",
		description: "Hugeicons / Figtree",
		style: "maia",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "figtree",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	lyra: {
		title: "Lyra",
		description: "Phosphor / JetBrains Mono",
		style: "lyra",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "phosphor",
		font: "jetbrains-mono",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
	mira: {
		title: "Mira",
		description: "Hugeicons / Inter",
		style: "mira",
		baseColor: "neutral",
		theme: "neutral",
		iconLibrary: "hugeicons",
		font: "inter",
		menuAccent: "subtle" as const,
		menuColor: "default" as const,

		radius: "default",
	},
} as const;

/**
 * When the user doesn't provide a preset we want to give them some options for configuring the design system.
 * 1. Go to /create customize and paste the code back here when they are ready
 * 2. Choose from the list of presets
 * 3. Prompt for the presets
 * 
 * @param existingConfig 
 */
export async function promptForPreset(
	existingConfig: cliConfig.RawConfig | undefined
): Promise<PresetConfig> {
	const continuationChoice = await p.select({
		message: "You didn't provide a preset for the design system, how would you like to continue?",
		initialValue: existingConfig?.style !== undefined ? "prompt" : "presets",
		options: [
			{
				label: "Choose from a list of pre-configured presets",
				value: "presets",
			},
			{
				label: `Create my own preset at ${color.bold("shadcn-svelte.com/create")}`,
				value: "customize",
			},
			{
				label: "Prompt me for the preset",
				value: "prompt",
			}
		]
	});

	if (p.isCancel(continuationChoice)) cancel();



	switch (continuationChoice) {
		case "customize":
			return await customize(existingConfig);
		case "presets":
			break;
		case "prompt":
			break;
	}



	throw new Error("Not implemented");
}

async function customize(existingConfig: cliConfig.RawConfig | undefined): Promise<PresetConfig> {
	const siteUrl = registry.getSiteUrl(existingConfig ?? cliConfig.DEFAULT_CONFIG);
	const createUrl = new URL("/create", siteUrl).toString();

	p.log.info(`Opening ${color.bold(createUrl)} in your browser...`);

	await open(createUrl);

	const code = await p.text({
		message: "When you're done, paste the code back here and we'll use it to configure your project.",
		placeholder: "--preset a0 || a0",
		validate: (v) => {
			const flag = "--preset ";
			if (v.startsWith(flag)) {
				v = v.slice(flag.length);
			}

			if (isValidPreset(v)) {
				return;
			}

			return "Invalid preset code";
		}
	});

	if (p.isCancel(code)) cancel();

	// we already validated the preset code so we can safely asset it's not null
	return decodePreset(code)!;
}