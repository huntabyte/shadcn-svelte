import { describe, expect, it } from "vitest";
import { injectStyleClasses, parseStyleCss } from "../src/inject-style-classes.ts";

const styleMap = {
	"cn-attachment": "w-fit rounded-xl",
	"cn-attachment-media": "relative flex aspect-square",
	"cn-attachment-media-variant-image": "opacity-60",
	"cn-attachment-trigger": "absolute inset-0 z-10 outline-none",
	"cn-attachment-action": "",
	"cn-sidebar-header": "gap-2 p-2",
	"cn-progress": "h-2 rounded-2xl bg-muted",
	"cn-badge": "h-5 gap-1 transition-all",
	"cn-font-heading": "font-heading",
	"cn-tooltip-arrow": "size-2.5 translate-y-[calc(-50%-2px)]",
};

describe("parseStyleCss", () => {
	it("reads nested @apply rules for cn-field-title", () => {
		const css = `
			.style-rhea {
				cn-field-title {
					@apply gap-2 text-sm leading-snug font-medium;
				}
			}
		`;
		expect(parseStyleCss(css)["cn-field-title"]).toBe("gap-2 text-sm leading-snug font-medium");
	});
});

describe("injectStyleClasses", () => {
	it("replaces cn-* tokens as whole class names, longest first", () => {
		const input = `class="cn-attachment-media cn-attachment"`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class="relative flex aspect-square w-fit rounded-xl"`
		);
	});

	it("does not rewrite cn-attachment inside cn-attachment-media-variant-icon", () => {
		const input = `icon: "cn-attachment-media-variant-icon"`;
		const output = injectStyleClasses(input, styleMap);
		expect(output).toContain(`icon: ""`);
		expect(output).not.toContain("w-fit");
		expect(output).not.toContain("media-variant-icon");
	});

	it("inlines mapped tokens and strips leftover unmapped cn-* tokens", () => {
		const input = `image: "cn-attachment-media-variant-image *:[img]:w-full"`;
		expect(injectStyleClasses(input, styleMap)).toBe(`image: "opacity-60 *:[img]:w-full"`);
	});

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

	it("collapses immediately repeated injected utilities", () => {
		const input = `class: cn("cn-attachment-trigger absolute inset-0 z-10 outline-none", className)`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class: cn("absolute inset-0 z-10 outline-none", className)`
		);
	});

	it("does not treat p-2 as a substring of gap-2 when collapsing duplicates", () => {
		const input = `class={cn("cn-sidebar-header flex flex-col", className)}`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class={cn("gap-2 p-2 flex flex-col", className)}`
		);
	});

	it('turns cn("", x) into cn(x)', () => {
		const input = `class={cn("cn-attachment-action", className)}`;
		expect(injectStyleClasses(input, styleMap)).toBe(`class={cn(className)}`);
	});

	it("leaves allowlisted cn-* tokens in the source", () => {
		const input = `class={cn("cn-font-heading text-base", className)}`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class={cn("cn-font-heading text-base", className)}`
		);
	});

	it("leaves cn-rtl-flip in place even when other cn-* tokens are stripped", () => {
		const input = `class="cn-rtl-flip cn-unmapped size-4"`;
		const output = injectStyleClasses(input, styleMap);
		expect(output).toContain("cn-rtl-flip");
		expect(output).not.toContain("cn-unmapped");
		expect(output).toContain("size-4");
	});

	it("does not rewrite interpolations inside non-class quoted strings", () => {
		const input = `style="transform: translateX(-{100 - (100 * (value ?? 0)) / (max ?? 1)}%)"`;
		expect(injectStyleClasses(input, styleMap)).toBe(input);
	});

	it("inlines cn-progress without touching a sibling style attribute", () => {
		const input = `<div class="cn-progress relative" style="transform: translateX(-{value ?? 0}%)"></div>`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`<div class="h-2 rounded-2xl bg-muted relative" style="transform: translateX(-{value ?? 0}%)"></div>`
		);
	});

	it("rewrites inlined calc() arbitrary values to the underscored form", () => {
		const input = `class="cn-tooltip-arrow z-50"`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class="size-2.5 translate-y-[calc(-50%_-_2px)] z-50"`
		);
	});

	it("rewrites component-authored calc() arbitrary values too", () => {
		const input = `class="h-[calc(100%-1px)] w-[calc(var(--x)+1rem)]"`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class="h-[calc(100%_-_1px)] w-[calc(var(--x)_+_1rem)]"`
		);
	});

	it("does not treat hyphens in CSS custom properties as calc operators", () => {
		const input = `class="h-[calc(var(--bits-navigation-menu-viewport-height)+1rem)]"`;
		expect(injectStyleClasses(input, styleMap)).toBe(
			`class="h-[calc(var(--bits-navigation-menu-viewport-height)_+_1rem)]"`
		);
	});

	it("leaves cn-toast on non-className properties", () => {
		const input = `toastOptions={{ classes: { toast: "cn-toast" } }}`;
		expect(injectStyleClasses(input, { "cn-toast": "rounded-2xl" })).toBe(input);
	});

	it("leaves cn-input-otp so it matches upstream containerClassName", () => {
		const input = `class={cn("cn-input-otp flex items-center", className)}`;
		expect(injectStyleClasses(input, { "cn-input-otp": "gap-2" })).toBe(input);
	});

	it("strips cn-*-logical tokens instead of inlining them", () => {
		const input = `class={cn("cn-popover-content cn-popover-content-logical z-50", className)}`;
		expect(
			injectStyleClasses(input, {
				"cn-popover-content": "bg-popover p-2.5",
				"cn-popover-content-logical":
					"data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2",
			})
		).toBe(`class={cn("bg-popover p-2.5 z-50", className)}`);
	});

	it("does not leave a leading space after stripping a leading cn-* token", () => {
		const input = `class={cn("cn-unmapped absolute start-0", className)}`;
		expect(injectStyleClasses(input, {})).toBe(`class={cn("absolute start-0", className)}`);
	});

	it("strips parity-ignore comments from published output", () => {
		const input = `// parity-ignore: bits vs radix
class="flex"
<!-- parity-ignore-file: whole file -->
class="grid"
// keep this comment
class="cn-badge"`;
		expect(injectStyleClasses(input, styleMap)).toBe(`class="flex"
class="grid"
// keep this comment
class="h-5 gap-1 transition-all"`);
	});

	it("strips trailing parity-ignore comments without dropping the code before them", () => {
		const input = `"size-4", // parity-ignore: keep rtl utilities
"rtl:rotate-180", // keep this comment
<div class="flex"> <!-- parity-ignore: bits only -->
<div class="grid"> <!-- keep this comment -->
const x = "a"; /* parity-ignore: bits only */
const y = "b"; /* keep this comment */
const url = "https://example.com";`;
		expect(injectStyleClasses(input, styleMap)).toBe(`"size-4",
"rtl:rotate-180", // keep this comment
<div class="flex">
<div class="grid"> <!-- keep this comment -->
const x = "a";
const y = "b"; /* keep this comment */
const url = "https://example.com";`);
	});
});
