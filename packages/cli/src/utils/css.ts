import type { CssVars } from "@shadcn-svelte/registry";
import type { RawConfig } from "./get-config.js";
import { CUSTOM_AT_RULES } from "./updaters/update-custom-at-rules.js";

export function createCssVars({
	baseColor,
	theme,
	config,
}: {
	baseColor: { cssVars: CssVars };
	theme?: { cssVars: CssVars };
	config: RawConfig;
}): CssVars {
	// Merge base color and theme CSS vars.
	const lightVars: Record<string, string> = {
		...(baseColor.cssVars?.light as Record<string, string>),
		...(theme?.cssVars?.light as Record<string, string>),
	};
	const darkVars: Record<string, string> = {
		...(baseColor.cssVars?.dark as Record<string, string>),
		...(theme?.cssVars?.dark as Record<string, string>),
	};
	const themeVars: Record<string, string> = {};

	// Apply menu accent transformation.
	if (config.designSystem.menuAccent === "bold") {
		lightVars.accent = lightVars.primary!;
		lightVars["accent-foreground"] = lightVars["primary-foreground"]!;
		darkVars.accent = darkVars.primary!;
		darkVars["accent-foreground"] = darkVars["primary-foreground"]!;
		lightVars["sidebar-accent"] = lightVars.primary!;
		lightVars["sidebar-accent-foreground"] = lightVars["primary-foreground"]!;
		darkVars["sidebar-accent"] = darkVars.primary!;
		darkVars["sidebar-accent-foreground"] = darkVars["primary-foreground"]!;
	}

	themeVars.radius = config.designSystem.radius;

	return {
		theme: Object.keys(themeVars).length > 0 ? themeVars : undefined,
		light: lightVars,
		dark: darkVars,
	};
}

export function createGlobalCssFile(cssVars: CssVars, config: RawConfig): string {
	const lightVars = Object.entries(cssVars.light ?? {})
		.map(([key, value]) => `  --${key}: ${value};`)
		.join("\n");

	const darkVars = Object.entries(cssVars.dark ?? {})
		.map(([key, value]) => `  --${key}: ${value};`)
		.join("\n");

	const fontImports = config.designSystem.fonts.map((font) => font.font.cssImport).join("\n");

	const hasMono = config.designSystem.fonts.some((font) => font.font.variable === "--font-mono");

	const fontVariables = config.designSystem.fonts
		.map((font) => `  ${font.font.variable}: ${font.font.family};`)
		.join("\n");

	return `
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

${fontImports}

@theme inline {
${fontVariables}${!hasMono ? "\n  --font-mono: monospace;" : ""}
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}
    
:root {
${lightVars}
}

.dark {
${darkVars}
}
  
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

${CUSTOM_AT_RULES}
`;
}
