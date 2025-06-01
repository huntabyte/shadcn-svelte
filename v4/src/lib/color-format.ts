import { createConfig } from "./config.js";

const COLOR_FORMATS = ["class", "hex", "rgb", "hsl", "oklch", "var"] as const;

const colorFormatConfig = createConfig({
	key: "color-format",
	values: COLOR_FORMATS,
	defaultValue: "oklch",
});

export const ColorFormatContext = colorFormatConfig.context;
export const parseColorFormatCookie = colorFormatConfig.parseFromCookie;
export const setColorFormatContext = colorFormatConfig.setContext;
