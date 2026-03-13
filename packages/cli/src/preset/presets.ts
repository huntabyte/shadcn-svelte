import type { PresetConfig } from "./preset.js";
import type * as cliConfig from "../utils/get-config.js";

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

export async function promptForPreset(
	existingConfig: cliConfig.RawConfig | undefined
): Promise<PresetConfig> {}
