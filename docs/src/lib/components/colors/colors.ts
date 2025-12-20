import { z } from "zod";

import { colorMapping, colors, type BaseColor } from "../../registry/registry-colors.js";
import lodash from "lodash";
import { BASE_STYLES } from "../../registry/templates.js";

const template = lodash.template as unknown as (s: string) => (data: unknown) => string;

const colorSchema = z.object({
	name: z.string(),
	id: z.string(),
	scale: z.number(),
	className: z.string(),
	hex: z.string(),
	rgb: z.string(),
	hsl: z.string(),
	foreground: z.string(),
	oklch: z.string(),
});

const colorPaletteSchema = z.object({
	name: z.string(),
	colors: z.array(colorSchema),
});

export type ColorPalette = z.infer<typeof colorPaletteSchema>;

export function getColorFormat(color: Color) {
	return {
		className: `bg-${color.name}-100`,
		hex: color.hex,
		rgb: color.rgb,
		hsl: color.hsl,
		oklch: color.oklch,
	};
}

export type ColorFormat = keyof ReturnType<typeof getColorFormat>;

export function getColors() {
	const tailwindColors = colorPaletteSchema.array().parse(
		Object.entries(colors)
			.map(([name, color]) => {
				if (!Array.isArray(color)) {
					return null;
				}

				return {
					name,
					colors: color.map((color) => {
						const rgb = color.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3");

						return {
							...color,
							name,
							id: `${name}-${color.scale}`,
							className: `${name}-${color.scale}`,
							rgb,
							hsl: color.hsl.replace(
								/^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
								"$1 $2 $3"
							),
							oklch: color.oklch.replace(
								/^oklch\(([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\)$/,
								"$1 $2 $3"
							),
							foreground: getForegroundFromBackground(rgb),
						};
					}),
				};
			})
			.filter(Boolean)
	);

	return tailwindColors;
}

export type Color = ReturnType<typeof getColors>[number]["colors"][number];

function getForegroundFromBackground(rgb: string) {
	const [r, g, b] = rgb.split(" ").map(Number);

	function toLinear(number: number): number {
		const base = number / 255;
		return base <= 0.04045 ? base / 12.92 : Math.pow((base + 0.055) / 1.055, 2.4);
	}

	const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

	return luminance > 0.179 ? "#000" : "#fff";
}

export function generateBaseColorTemplate(baseColor: BaseColor) {
	const colorsData = getColorsData();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const base: Record<string, any> = {
		inlineColors: {},
		cssVars: {},
	};
	for (const [mode, values] of Object.entries(colorMapping)) {
		base.inlineColors[mode] = {};
		base.cssVars[mode] = {};
		for (const [key, value] of Object.entries(values)) {
			if (typeof value === "string") {
				const resolvedColor = value.replace(/\{\{base\}\}-/g, `${baseColor}-`);
				base.inlineColors[mode][key] = resolvedColor;

				const [resolvedBase, scale] = resolvedColor.split("-");
				const color = scale
					? colorsData[resolvedBase].find(
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(item: any) => item.scale === Number.parseInt(scale)
						)
					: colorsData[resolvedBase];
				if (color) {
					base.cssVars[mode][key] = color.oklch;
				}
			}
		}
	}

	// Build css vars.
	base.inlineColorsTemplate = template(BASE_STYLES)({});

	// if (["stone", "slate", "gray", "zinc", "neutral"].includes(baseColor)) {
	// 	base.cssVarsTemplate = template(BASE_STYLES_WITH_VARIABLES)({
	// 		colors: baseColorsV4[baseColor as keyof typeof baseColorsV4],
	// 	});
	// 	base.cssVars = baseColorsV4[baseColor as keyof typeof baseColorsV4];
	// } else {
	// 	base.cssVarsTemplate = template(BASE_STYLES_WITH_VARIABLES)({
	// 		colors: base.cssVars,
	// 	});
	// }

	return base;
}

export function getColorsData() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const colorsData: Record<string, any> = {};
	for (const [color, value] of Object.entries(colors)) {
		if (typeof value === "string") {
			colorsData[color] = value;
			continue;
		}

		if (Array.isArray(value)) {
			colorsData[color] = value.map((item) => ({
				...item,
				oklch: item.oklch,
			}));
			continue;
		}

		if (typeof value === "object") {
			colorsData[color] = {
				...value,
				oklch: value.oklch,
			};
			continue;
		}
	}

	return colorsData;
}
