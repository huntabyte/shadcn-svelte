// !! BROWSER SAFE !!

import { iconLibraries } from "../icons/libraries.js";
import { keys } from "../utils/utils.js";

// Preset encoding/decoding utilities.
// Bit-packs design system params into a single integer,
// then encodes as base62 with a version prefix character.
//
// Rules for backward compat:
//   1. Never reorder existing value arrays — only append.
//   2. New fields must have their default at index 0.
//   3. Only append new fields to the end of PRESET_FIELDS.
//   4. Stay under 53 bits total (JS safe integer limit).

// Value arrays — order matters for backward compat. Never reorder, only append.
export const PRESET_STYLES = ["nova", "vega", "maia", "lyra", "mira", "luma", "sera"] as const;

export const PRESET_BASE_COLORS = {
	neutral: { name: "Neutral", color: "#737373" },
	stone: { name: "Stone", color: "#79716B" },
	zinc: { name: "Zinc", color: "#71717B" },
	mauve: { name: "Mauve", color: "#79697B" },
	olive: { name: "Olive", color: "#7C7C67" },
	mist: { name: "Mist", color: "#67787C" },
	taupe: { name: "Taupe", color: "#7C6D67" },
} as const;

export const PRESET_BASE_COLOR_KEYS = keys(PRESET_BASE_COLORS);

export const PRESET_THEMES = {
	neutral: { name: "Neutral", color: "#737373" },
	stone: { name: "Stone", color: "#78716c" },
	zinc: { name: "Zinc", color: "#71717a" },
	amber: { name: "Amber", color: "#FD9A00" },
	blue: { name: "Blue", color: "#2B7FFF" },
	cyan: { name: "Cyan", color: "#00B8DB" },
	emerald: { name: "Emerald", color: "#00BC7D" },
	fuchsia: { name: "Fuchsia", color: "#E12AFB" },
	green: { name: "Green", color: "#00C950" },
	indigo: { name: "Indigo", color: "#615FFF" },
	lime: { name: "Lime", color: "#7CCF00" },
	orange: { name: "Orange", color: "#FF6900" },
	pink: { name: "Pink", color: "#F6339A" },
	purple: { name: "Purple", color: "#AD46FF" },
	red: { name: "Red", color: "#FB2C36" },
	rose: { name: "Rose", color: "#FF2056" },
	sky: { name: "Sky", color: "#00A6F4" },
	teal: { name: "Teal", color: "#00BBA7" },
	violet: { name: "Violet", color: "#8E51FF" },
	yellow: { name: "Yellow", color: "#EFB100" },
	mauve: { name: "Mauve", color: "#79697b" },
	olive: { name: "Olive", color: "#7c7c67" },
	mist: { name: "Mist", color: "#67787c" },
	taupe: { name: "Taupe", color: "#7c6d67" },
} as const;

export const PRESET_THEME_KEYS = keys(PRESET_THEMES);

export const PRESET_CHART_COLORS = PRESET_THEME_KEYS;

// Before v2, base-color themes had colored chart palettes
// borrowed from these colored themes. Used by consumers to
// restore the original chart colors when decoding v1 presets.
export const V1_CHART_COLOR_MAP: Record<string, string> = {
	neutral: "blue",
	stone: "lime",
	zinc: "amber",
	mauve: "emerald",
	olive: "violet",
	mist: "rose",
	taupe: "cyan",
};

export const PRESET_ICON_LIBRARIES = keys(iconLibraries);

export const PRESET_FONTS = [
	"inter",
	"noto-sans",
	"nunito-sans",
	"figtree",
	"roboto",
	"raleway",
	"dm-sans",
	"public-sans",
	"outfit",
	"jetbrains-mono",
	"geist",
	"geist-mono",
	"lora",
	"merriweather",
	"playfair-display",
	"noto-serif",
	"roboto-slab",
	"oxanium",
	"manrope",
	"space-grotesk",
	"montserrat",
	"ibm-plex-sans",
	"source-sans-3",
	"instrument-sans",
] as const;
export const PRESET_FONT_HEADINGS = ["inherit", ...PRESET_FONTS] as const;

export const PRESET_RADII = {
	default: { name: "default", label: "Default", value: "0.5rem" },
	none: { name: "none", label: "None", value: "0rem" },
	small: { name: "small", label: "Small", value: "0.45rem" },
	medium: { name: "medium", label: "Medium", value: "0.625rem" },
	large: { name: "large", label: "Large", value: "0.875rem" },
} as const;

export const PRESET_RADII_KEYS = keys(PRESET_RADII);

export const PRESET_MENU_ACCENTS = ["subtle", "bold"] as const;
export const PRESET_MENU_COLORS = [
	"default",
	"inverted",
	"default-translucent",
	"inverted-translucent",
] as const;

// V1 fields (version "a"): 40 bits. No chartColor.
const PRESET_FIELDS_V1 = [
	{ key: "menuColor", values: PRESET_MENU_COLORS, bits: 3 },
	{ key: "menuAccent", values: PRESET_MENU_ACCENTS, bits: 3 },
	{ key: "radius", values: PRESET_RADII_KEYS, bits: 4 },
	{ key: "font", values: PRESET_FONTS, bits: 6 },
	{ key: "iconLibrary", values: PRESET_ICON_LIBRARIES, bits: 6 },
	{ key: "theme", values: PRESET_THEME_KEYS, bits: 6 },
	{ key: "baseColor", values: PRESET_BASE_COLOR_KEYS, bits: 6 },
	{ key: "style", values: PRESET_STYLES, bits: 6 },
] as const;

// V2 fields (version "b"): 51 bits. Adds chartColor and fontHeading.
const PRESET_FIELDS_V2 = [
	...PRESET_FIELDS_V1,
	{ key: "chartColor", values: PRESET_CHART_COLORS, bits: 6 },
	{ key: "fontHeading", values: PRESET_FONT_HEADINGS, bits: 5 },
] as const;

export type PresetConfig = {
	style: (typeof PRESET_STYLES)[number];
	baseColor: (typeof PRESET_BASE_COLOR_KEYS)[number];
	theme: (typeof PRESET_THEME_KEYS)[number];
	chartColor?: (typeof PRESET_CHART_COLORS)[number];
	iconLibrary: (typeof PRESET_ICON_LIBRARIES)[number];
	font: (typeof PRESET_FONTS)[number];
	fontHeading: (typeof PRESET_FONT_HEADINGS)[number];
	radius: (typeof PRESET_RADII_KEYS)[number];
	menuAccent: (typeof PRESET_MENU_ACCENTS)[number];
	menuColor: (typeof PRESET_MENU_COLORS)[number];
};

export const DEFAULT_PRESET_CONFIG: PresetConfig = Object.fromEntries(
	PRESET_FIELDS_V2.map((f) => [f.key, f.values[0]])
) as PresetConfig;

// Base62 alphabet.
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Version prefixes — "a" = v1 (no chartColor), "b" = v2 (with chartColor).
const CURRENT_VERSION = "b";
const VALID_VERSIONS = ["a", "b"] as const;

export function toBase62(num: number) {
	if (num === 0) return "0";
	let result = "";
	let n = num;
	while (n > 0) {
		result = BASE62[n % 62] + result;
		n = Math.floor(n / 62);
	}
	return result;
}

export function fromBase62(str: string) {
	let result = 0;
	for (let i = 0; i < str.length; i++) {
		const idx = BASE62.indexOf(str[i]!);
		if (idx === -1) return -1;
		result = result * 62 + idx;
	}
	return result;
}

// Encode a PresetConfig into a short alphanumeric code.
// Always produces v2 ("b") codes.
export function encodePreset(config: Partial<PresetConfig>) {
	const merged = { ...DEFAULT_PRESET_CONFIG, ...config };

	// Uses multiplication instead of bitwise ops (JS bitwise truncates to 32 bits).
	let bits = 0;
	let offset = 0;
	for (const field of PRESET_FIELDS_V2) {
		const idx = (field.values as readonly string[]).indexOf(
			merged[field.key as keyof PresetConfig] as string
		);
		bits += (idx === -1 ? 0 : idx) * 2 ** offset;
		offset += field.bits;
	}

	return CURRENT_VERSION + toBase62(bits);
}

// Decode a preset code back into a PresetConfig.
// "a"-prefixed codes use v1 fields (no chartColor).
// "b"-prefixed codes use v2 fields (with chartColor).
export function decodePreset(code: string): PresetConfig | null {
	if (!code || code.length < 2) {
		return null;
	}

	const version = code[0];
	if (!VALID_VERSIONS.includes(version as (typeof VALID_VERSIONS)[number])) {
		return null;
	}

	const fields = version === "a" ? PRESET_FIELDS_V1 : PRESET_FIELDS_V2;

	const bits = fromBase62(code.slice(1));
	if (bits < 0) return null;

	const result = {} as Record<string, string>;
	let offset = 0;
	for (const field of fields) {
		const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits;
		result[field.key] = idx < field.values.length ? field.values[idx]! : field.values[0];
		offset += field.bits;
	}

	if (version === "a") {
		result.fontHeading = "inherit";
	}

	return result as PresetConfig;
}

// Check if a string looks like a preset code (version char + base62).
export function isPresetCode(value: string) {
	if (!value || value.length < 2 || value.length > 10) {
		return false;
	}

	if (!VALID_VERSIONS.includes(value[0] as (typeof VALID_VERSIONS)[number])) {
		return false;
	}

	for (let i = 1; i < value.length; i++) {
		if (BASE62.indexOf(value[i]!) === -1) {
			return false;
		}
	}

	return true;
}

// Validate that a preset code decodes successfully.
export function isValidPreset(code: string) {
	return decodePreset(code) !== null;
}

// Generate a random PresetConfig.
export function generateRandomConfig(): PresetConfig {
	const pick = <T>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

	return Object.fromEntries(PRESET_FIELDS_V2.map((f) => [f.key, pick(f.values)])) as PresetConfig;
}

// Generate a random preset code.
export function generateRandomPreset() {
	return encodePreset(generateRandomConfig());
}
