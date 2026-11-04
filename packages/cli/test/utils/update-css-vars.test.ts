import { describe, it, expect } from "vitest";
import { transformCss } from "../../src/utils/transform-css.js";

const SOURCE = `@import "tailwindcss";\n`;

describe("updateCssVars: @theme mapping", () => {
	it("maps color tokens into @theme as --color-*", () => {
		const out = transformCss(SOURCE, {
			cssVars: { light: { background: "#ffffff", "ledger-chip-blue-bg": "#eaeffc" } },
		});
		expect(out).toContain("--color-background: var(--background);");
		expect(out).toContain("--color-ledger-chip-blue-bg: var(--ledger-chip-blue-bg);");
	});

	it("writes non-color tokens to :root and does not map them into @theme", () => {
		const shadow = "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 0 0 0 transparent";
		const out = transformCss(SOURCE, {
			cssVars: { light: { background: "#ffffff", "ledger-field-shadow": shadow } },
		});
		expect(out).toContain(`--ledger-field-shadow: ${shadow};`);
		// A self-referencing theme variable is invalid CSS if it is ever emitted at :root.
		expect(out).not.toContain("--ledger-field-shadow: var(--ledger-field-shadow)");
	});

	it("keeps a theme variable that was set on purpose, and still maps radius", () => {
		const out = transformCss(SOURCE, {
			cssVars: { theme: { "font-sans": "Inter, sans-serif" }, light: { radius: "0.5rem" } },
		});
		expect(out).toContain("--font-sans: Inter, sans-serif;");
		expect(out).not.toContain("--font-sans: var(--font-sans)");
		expect(out).toContain("--radius-md: calc(var(--radius) * 0.8);");
	});

	it("keeps the mapping for non-color tokens in a Tailwind theme namespace, so the utility exists", () => {
		const out = transformCss(SOURCE, {
			cssVars: {
				light: {
					"shadow-card": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
					"font-heading": "Inter, sans-serif",
					"tracking-tight": "-0.02em",
				},
			},
		});
		// `@theme inline` puts var(--shadow-card) into the shadow-card utility, which resolves from :root and .dark.
		expect(out).toContain("--shadow-card: var(--shadow-card);");
		expect(out).toContain("--font-heading: var(--font-heading);");
		expect(out).toContain("--tracking-tight: var(--tracking-tight);");
	});

	it("does not treat a name that merely contains a namespace as one", () => {
		const out = transformCss(SOURCE, {
			cssVars: {
				light: {
					"ledger-field-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
					"ledger-text-size": "1px",
				},
			},
		});
		expect(out).not.toContain("--ledger-field-shadow: var(--ledger-field-shadow)");
		expect(out).not.toContain("--ledger-text-size: var(--ledger-text-size)");
		// They still land in :root.
		expect(out).toContain("--ledger-text-size: 1px;");
	});

	it("does not map a bare namespace name, which makes no utility", () => {
		const out = transformCss(SOURCE, { cssVars: { light: { text: "1px", font: "Inter" } } });
		expect(out).not.toContain("--text: var(--text)");
		expect(out).not.toContain("--font: var(--font)");
	});
});
