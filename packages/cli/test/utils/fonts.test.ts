import { describe, it, expect } from "vitest";
import { setupFonts } from "../../src/utils/fonts.js";
import type { RegistryFont } from "../../src/utils/registry/schema.js";

function font(
	overrides: Partial<RegistryFont> & { name: string }
): RegistryFont & { name: string } {
	return {
		type: "registry:font",
		dependency: "@fontsource-variable/inter",
		variable: "--font-sans",
		family: "'Inter Variable', sans-serif",
		...overrides,
	};
}

describe("setupFonts", () => {
	it("applies only primary font utilities on html, not --font-heading", () => {
		const { css } = setupFonts([
			font({ name: "font-inter", variable: "--font-sans" }),
			font({
				name: "font-heading-playfair-display",
				variable: "--font-heading",
				family: "'Playfair Display Variable', serif",
				dependency: "@fontsource-variable/playfair-display",
			}),
		]);

		expect(css["@layer base"]?.html).toEqual({
			"@apply font-sans": {},
		});
		expect(css['@import "@fontsource-variable/playfair-display"']).toEqual({});
	});

	it("still sets theme CSS vars for heading fonts", () => {
		const { cssVars } = setupFonts([
			font({
				name: "font-geist",
				variable: "--font-sans",
				dependency: "@fontsource-variable/geist",
				family: "'Geist Variable', sans-serif",
			}),
			font({
				name: "font-heading-lora",
				variable: "--font-heading",
				family: "'Lora Variable', serif",
				dependency: "@fontsource-variable/lora",
			}),
		]);

		expect(cssVars.theme).toMatchObject({
			"--font-sans": "'Geist Variable', sans-serif",
			"--font-heading": "'Lora Variable', serif",
		});
	});
});
