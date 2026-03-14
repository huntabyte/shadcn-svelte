import type { CssSchema, CssVars, RegistryFont } from "./registry/schema.js";

export type Font = RegistryFont & { name: string };

export function setupFonts(fonts: Font[]): {
	css: CssSchema;
	cssVars: CssVars;
	dependencies: string[];
} {
	if (fonts.length === 0) return { css: {}, cssVars: {}, dependencies: [] };

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const css: Record<string, any> = {};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cssVars: Record<string, any> = {};
	const dependencies: string[] = [];

	for (const font of fonts) {
		const fontName = font.name.replace("font-", "");
		const fontSourceDependency = `@fontsource-variable/${fontName}`;
		dependencies.push(fontSourceDependency);
		css[`@import "${fontSourceDependency}"`] = {};
		cssVars.theme ??= {};
		cssVars.theme[font.variable] = font.family;
	}

	const groups = new Map<string, string[]>();
	for (const font of fonts) {
		const selector = font.selector ?? "html";
		const cls = font.variable.replace("--", "");
		if (!groups.has(selector)) {
			groups.set(selector, []);
		}
		groups.get(selector)!.push(cls);
	}

	for (const [selector, classes] of Array.from(groups.entries())) {
		const fontClasses = classes.join(" ");
		css["@layer base"][selector] ??= {};
		// Find existing @apply key and merge, or create new.
		const existingApplyKey = Object.keys(css["@layer base"][selector]).find((key) =>
			key.startsWith("@apply ")
		);
		if (existingApplyKey) {
			delete css["@layer base"][selector][existingApplyKey];
			css["@layer base"][selector][`${existingApplyKey} ${fontClasses}`] = {};
		} else {
			css["@layer base"][selector][`@apply ${fontClasses}`] = {};
		}
	}

	return { css, cssVars, dependencies };
}
