import color from "picocolors";

export const highlight = (str: string) => color.bold(color.cyan(str));

/**
 * Parses a hex color string to RGB. Supports 6-digit (#DEADED, DEADED) and 3-digit (#F00, F00) formats.
 */
function hexToRgb(hex: string): [number, number, number] {
	const normalized = hex.startsWith("#") ? hex.slice(1) : hex;
	const match = normalized.match(/^([a-f\d]{6}|[a-f\d]{3})$/i)?.[1];
	if (!match) return [0, 0, 0];

	const colorString = match.length === 3 ? [...match].map((c) => c + c).join("") : match;
	const integer = Number.parseInt(colorString, 16);
	return [(integer >> 16) & 0xff, (integer >> 8) & 0xff, integer & 0xff];
}

/** Applies truecolor foreground from a hex value. Use when picocolors doesn't support hex. */
export function hex(hexValue: string) {
	const [r, g, b] = hexToRgb(hexValue);
	const open = `\x1b[38;2;${r};${g};${b}m`;
	const close = "\x1b[39m";
	return (str: string) => (color.isColorSupported ? `${open}${str}${close}` : str);
}

/** Applies truecolor background from a hex value. Use when picocolors doesn't support hex. */
export function bgHex(hexValue: string) {
	const [r, g, b] = hexToRgb(hexValue);
	const open = `\x1b[48;2;${r};${g};${b}m`;
	const close = "\x1b[49m";
	return (str: string) => (color.isColorSupported ? `${open}${str}${close}` : str);
}
