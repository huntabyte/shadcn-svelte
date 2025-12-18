import { THEMES } from "./themes.js";

export const BASE_COLORS = THEMES.filter((theme) =>
	["neutral", "stone", "zinc", "gray"].includes(theme.name)
);

export type BaseColor = (typeof BASE_COLORS)[number];
