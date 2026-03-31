import { FONT_DEFINITIONS, type FontName } from "./font-definitions.js";

function createFontOption(name: FontName) {
	const definition = FONT_DEFINITIONS.find((font) => font.name === name);

	if (!definition) {
		throw new Error(`Unknown font definition: ${name}`);
	}

	return {
		name: definition.title,
		value: definition.name,
		font: {
			style: {
				fontFamily: definition.family,
			},
		},
		type: definition.type,
	} as const;
}

export const FONTS = [
	createFontOption("geist"),
	createFontOption("inter"),
	createFontOption("noto-sans"),
	createFontOption("nunito-sans"),
	createFontOption("figtree"),
	createFontOption("roboto"),
	createFontOption("raleway"),
	createFontOption("dm-sans"),
	createFontOption("public-sans"),
	createFontOption("outfit"),
	createFontOption("oxanium"),
	createFontOption("manrope"),
	createFontOption("space-grotesk"),
	createFontOption("montserrat"),
	createFontOption("ibm-plex-sans"),
	createFontOption("source-sans-3"),
	createFontOption("instrument-sans"),
	createFontOption("geist-mono"),
	createFontOption("jetbrains-mono"),
	createFontOption("noto-serif"),
	createFontOption("roboto-slab"),
	createFontOption("merriweather"),
	createFontOption("lora"),
	createFontOption("playfair-display"),
] as const;

export type Font = (typeof FONTS)[number];

export const FONT_HEADING_OPTIONS = [
	{
		name: "Inherit",
		value: "inherit",
		font: null,
		type: "default",
	},
	...FONTS,
] as const;

export type FontHeadingOption = (typeof FONT_HEADING_OPTIONS)[number];
