import { parse } from "svelte/compiler";
import { describe, it, expect } from "vitest";
import {
	applyRtlMapping,
	transformDirection,
	transformRtl,
} from "../../src/utils/transformers/transform-rtl.js";
import type { ResolvedConfig } from "../../src/utils/config/index.js";

describe("RTL classes", () => {
	it("keeps physical sidebar positions and borders under explicit side variants", () => {
		expect(
			applyRtlMapping(
				"data-[side=left]:left-0 group-data-[side=right]:border-l data-[side=left]:border-r-2"
			)
		).toBe("data-[side=left]:left-0 group-data-[side=right]:border-l data-[side=left]:border-r-2");
	});
	it("maps spacing, corners, alignment and variants without changing physical sides", () => {
		expect(
			applyRtlMapping(
				"-ml-2 sm:pr-4 text-left rounded-tr-lg border-r data-[side=left]:-right-2 border-ring"
			)
		).toBe("-ms-2 sm:pe-4 text-start rounded-se-lg border-e data-[side=left]:-right-2 border-ring");
	});
	it("reverses translations and directional icons, preserving arbitrary variants and important", () => {
		expect(
			applyRtlMapping(
				"data-[state=checked]:translate-x-[calc(100%-2px)]! [&:nth-child(2)]:ml-2 cn-rtl-flip"
			)
		).toBe(
			"data-[state=checked]:translate-x-[calc(100%-2px)]! rtl:data-[state=checked]:-translate-x-[calc(100%-2px)]! [&:nth-child(2)]:ms-2 rtl:rotate-180"
		);
	});
	it("keeps explicit direction overrides and deduplicates existing RTL fixes", () => {
		expect(applyRtlMapping("rtl:ml-2 ltr:mr-2 cn-rtl-flip rtl:rotate-180")).toBe(
			"rtl:ml-2 ltr:mr-2 rtl:rotate-180"
		);
	});
});

describe("Svelte RTL transform", () => {
	it("handles nested branches, snippets, arrays, class objects, templates and tv modules", () => {
		const source =
			'<script lang="ts">const label = "text-left"; const x = tv({ base: "ml-2", variants: { size: { sm: "pr-1" } } }); let active = true;</script>\n{#snippet item()}<div class={["text-left", { "mr-2": active }]}></div>{/snippet}\n{#if active}{#each [1] as n}<p class={`ml-2 ${active ? "pr-4" : "pl-4"}`}>{label}</p>{/each}{:else}<p class="text-right"></p>{/if}';
		const result = transformDirection(source, "fixture.svelte");
		expect(result).toContain('const label = "text-left"');
		expect(result).toContain('base: "ms-2"');
		expect(result).toContain('sm: "pe-1"');
		expect(result).toContain('["text-start", { "me-2": active }]');
		expect(result).toContain('`ms-2 ${active ? "pe-4" : "ps-4"}`');
		expect(result).toContain('class="text-end"');
		expect(() => parse(result, { modern: true })).not.toThrow();
	});
	it("does not change prose, imports, physical sides, or explicit dir props", () => {
		const source =
			'<script>import x from "ml-module"; const text = "text-left";</script><div dir="rtl" data-side="left" class="ml-2">text-left</div>';
		const result = transformDirection(source, "fixture.svelte");
		expect(result).toBe(source.replace('class="ml-2"', 'class="ms-2"'));
	});
	it("works in TypeScript class variant modules", () => {
		expect(
			transformDirection('export const v = tv({ base: "ml-2 text-left" });', "variants.ts")
		).toContain('base: "ms-2 text-start"');
	});
	it("rewrites class properties in merged props without changing other strings", () => {
		const source = 'const props = mergeProps({ class: "ml-2", title: "text-left" }, rest);';
		expect(transformDirection(source, "props.ts")).toBe(
			source.replace('class: "ml-2"', 'class: "ms-2"')
		);
	});
	it("requires the rtl configuration flag and ignores non-source files", async () => {
		const content = '<p class="ml-2"></p>';
		const opts = { content, filePath: "test.svelte", config: {} as ResolvedConfig };
		expect((await transformRtl(opts)).content).toBe(content);
		expect(
			(await transformRtl({ ...opts, config: { ...opts.config, rtl: true } })).content
		).toContain('class="ms-2"');
		expect(
			(
				await transformRtl({
					...opts,
					filePath: "README.md",
					config: { ...opts.config, rtl: true },
				})
			).content
		).toBe(content);
	});
});
