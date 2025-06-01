import { createConfig } from "./config.js";

export const LAYOUTS = ["fixed", "full"] as const;

export type Layout = (typeof LAYOUTS)[number];

const layoutConfig = createConfig({
	key: "layout",
	values: LAYOUTS,
	defaultValue: "full",
});

export const LayoutContext = layoutConfig.context;
export const parseLayoutCookie = layoutConfig.parseFromCookie;
export const setLayoutContext = layoutConfig.setContext;
