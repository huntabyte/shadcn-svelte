import { describe, expect, it } from "vitest";
import { injectStyleClasses, parseStyleCss } from "../src/inject-style-classes.js";

describe("parseStyleCss", () => {
	it("reads nested @apply rules for cn-field-title", () => {
		const css = `
			.style-rhea {
				cn-field-title {
					@apply gap-2 text-sm leading-snug font-medium;
				}
			}
		`;
		expect(parseStyleCss(css)["cn-field-title"]).toBe(
			"gap-2 text-sm leading-snug font-medium"
		);
	});
});

describe("injectStyleClasses", () => {
	it("inlines cn-field-title including leading-snug", () => {
		const input = `class={cn("cn-field-title flex w-fit items-center", className)}`;
		expect(
			injectStyleClasses(input, {
				"cn-field-title": "gap-2 text-sm leading-snug font-medium",
			})
		).toBe(
			`class={cn("gap-2 text-sm leading-snug font-medium flex w-fit items-center", className)}`
		);
	});
});
