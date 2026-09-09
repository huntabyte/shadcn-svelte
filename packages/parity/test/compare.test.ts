import { describe, expect, it } from "vitest";
import {
	applySourceIgnores,
	canonicalizeRuntimeToken,
	extractClassStrings,
	extractUpstreamComponentNames,
	fixClassString,
	formatIgnoredComment,
	formatSourceLocation,
	formatTable,
	offsetToLine,
	pairClassStrings,
	parityPercent,
	parseItemArg,
	sourceFileHasUpstreamCounterpart,
} from "../src/compare.js";

describe("parity-ignore comments", () => {
	it("does not treat CSS attribute selectors as class lists", () => {
		const content = `
			class="overflow-hidden"
			container: "[data-embla-container]",
			slides: "[data-embla-slide]",
			class="[--radius:1rem]"
		`;
		const strings = extractClassStrings(content);
		expect(strings.map((entry) => entry.merged)).toEqual(["overflow-hidden", "[--radius:1rem]"]);
	});

	it("ignores the next class string after a JS comment", () => {
		const content = `
			class="flex gap-2"
			// parity-ignore: bits data-open vs radix data-state
			class="data-open:bg-accent"
			class="overflow-hidden"
		`;
		const strings = extractClassStrings(content);
		expect(strings.find((entry) => entry.key === "data-open:bg-accent")?.ignoredReason).toBe(
			"bits data-open vs radix data-state"
		);
		expect(strings.find((entry) => entry.key === "flex gap-2")?.ignoredReason).toBeUndefined();
		expect(strings.find((entry) => entry.key === "overflow-hidden")?.ignoredReason).toBeUndefined();
		expect(
			strings.find((entry) => entry.key === "data-open:bg-accent")?.ignoredComment?.trim()
		).toBe("// parity-ignore: bits data-open vs radix data-state");
	});

	it("ignores the next class string after an HTML comment", () => {
		const content = `
			<!-- parity-ignore: bits-only trigger -->
			class="data-open:bg-accent"
		`;
		const [entry] = extractClassStrings(content);
		expect(entry?.ignoredReason).toBe("bits-only trigger");
		expect(entry?.ignoredComment?.trim()).toBe("<!-- parity-ignore: bits-only trigger -->");
	});

	it("ignores every class string with a file-level comment", () => {
		const content = `
			<!-- parity-ignore-file: Bits-only API -->
			class="flex"
			class="grid"
		`;
		const strings = extractClassStrings(content);
		expect(strings).toHaveLength(2);
		expect(strings.every((entry) => entry.ignoredReason === "Bits-only API")).toBe(true);
		expect(strings[0]?.ignoredComment?.trim()).toBe("<!-- parity-ignore-file: Bits-only API -->");
		expect(strings[0]?.ignoredFile).toBe(true);
	});

	it("lets a non-ignored duplicate win over an ignored one", () => {
		const content = `
			// parity-ignore: false positive here
			class="flex gap-2"
			class="flex gap-2"
		`;
		const [entry] = extractClassStrings(content);
		expect(entry?.ignoredReason).toBeUndefined();
	});

	it("requires a reason", () => {
		const content = `
			// parity-ignore:
			class="flex"
		`;
		const [entry] = extractClassStrings(content);
		expect(entry?.ignoredReason).toBeUndefined();
	});

	it("applies source ignore comments after they are stripped from registry JSON", () => {
		const source = `
			class="flex gap-2"
			// parity-ignore: bits data-open vs radix data-state
			class="cn-open:bg-accent"
			class="overflow-hidden"
		`;
		const json = `
			class="flex gap-2"
			class="data-open:bg-accent"
			class="overflow-hidden"
		`;
		const strings = applySourceIgnores(json, source);
		expect(strings.find((entry) => entry.key === "data-open:bg-accent")?.ignoredReason).toBe(
			"bits data-open vs radix data-state"
		);
		expect(
			strings.find((entry) => entry.key === "data-open:bg-accent")?.ignoredComment?.trim()
		).toBe("// parity-ignore: bits data-open vs radix data-state");
		expect(strings.find((entry) => entry.key === "flex gap-2")?.ignoredReason).toBeUndefined();
	});

	it("concatenates adjacent class strings in the same cn() call", () => {
		const content = `
			class={cn(
				"flex gap-2",
				"items-center",
				className
			)}
			class="overflow-hidden"
		`;
		const strings = extractClassStrings(content);
		expect(strings.map((entry) => entry.merged)).toEqual([
			"flex gap-2",
			"items-center",
			"overflow-hidden",
		]);
	});

	it("concatenates a fragment only when the previous gap has a parity-ignore", () => {
		const content = `
			class={cn(
				"flex gap-2 items-center",
				"mt-2",
			)}
		`;
		const strings = extractClassStrings(content);
		expect(strings.map((entry) => entry.merged)).toEqual(["flex gap-2 items-center", "mt-2"]);
	});

	it("does not concatenate different cn-* tokens in the same cn() call", () => {
		const content = `
			class={cn(
				"cn-input-otp flex items-center has-disabled:opacity-50",
				"cn-input-otp-input disabled:cursor-not-allowed",
			)}
		`;
		const strings = extractClassStrings(content);
		expect(strings.map((entry) => entry.merged)).toEqual([
			"cn-input-otp flex items-center has-disabled:opacity-50",
			"cn-input-otp-input disabled:cursor-not-allowed",
		]);
	});

	it("ignores only the next fragment and still checks the rest of the class list", () => {
		const content = `
			class={cn(
				"flex gap-2 items-center",
				// parity-ignore: keep rtl until the CLI rewrites it
				"rtl:ml-2",
			)}
		`;
		const [entry] = extractClassStrings(content);
		expect(entry?.merged).toBe("flex gap-2 items-center rtl:ml-2");
		expect(entry?.ignoredTokens).toEqual(["rtl:ml-2"]);
		expect(entry?.ignoredReason).toBe("keep rtl until the CLI rewrites it");
		expect(entry?.ignoredFile).toBeUndefined();
	});

	it("still ignores a whole class list when every fragment is ignored", () => {
		const content = `
			class={cn(
				// parity-ignore: Bits-only arrow transforms
				"cn-tooltip-arrow data-[side=top]:translate-x-1/2",
			)}
		`;
		const [entry] = extractClassStrings(content);
		expect(entry?.ignoredReason).toBe("Bits-only arrow transforms");
		expect(entry?.ignoredTokens).toBeUndefined();
	});

	it("applies fragment ignores onto concatenated registry JSON", () => {
		const source = `
			class={cn(
				"flex gap-2 items-center",
				// parity-ignore: keep rtl until the CLI rewrites it
				"rtl:ml-2",
			)}
		`;
		const json = `class={cn("flex gap-2 items-center", "rtl:ml-2")}`;
		const strings = applySourceIgnores(json, source);
		const rtl = strings.find((entry) => entry.tokens.includes("rtl:ml-2"));
		expect(rtl?.ignoredReason).toBe("keep rtl until the CLI rewrites it");
		expect(strings.find((entry) => entry.key === "flex gap-2 items-center")?.ignoredReason).toBe(
			undefined
		);
	});

	it("does not treat an ignored extra class as a token diff", () => {
		const ours = extractClassStrings(`
			class={cn(
				"flex gap-2 items-center",
				// parity-ignore: keep rtl until the CLI rewrites it
				"rtl:ml-2",
			)}
		`);
		const upstream = extractClassStrings(`class="flex gap-2 items-center"`);
		const [pair] = pairClassStrings(ours, upstream);
		expect(pair?.kind).toBe("ignored");
		expect(pair?.added).toEqual(["rtl:ml-2"]);
		expect(pair?.removed).toEqual([]);
	});

	it("still reports other diffs when a fragment is ignored", () => {
		const ours = extractClassStrings(`
			class={cn(
				"flex gap-2 items-center bg-red-500",
				// parity-ignore: keep rtl until the CLI rewrites it
				"rtl:ml-2",
			)}
		`);
		const upstream = extractClassStrings(`class="flex gap-2 items-center"`);
		const [pair] = pairClassStrings(ours, upstream);
		expect(pair?.kind).toBe("diff");
		expect(pair?.added).toEqual(["bg-red-500"]);
		expect(pair?.removed).toEqual([]);
	});

	it("pairs a fully ignored replacement with its upstream counterpart", () => {
		const ours = extractClassStrings(`
			class={cn(
				// parity-ignore: Bits Arrow positioning
				"cn-tooltip-arrow z-50 bg-foreground fill-foreground data-[side=top]:translate-x-1/2",
			)}
		`);
		const upstream = extractClassStrings(
			`class="cn-tooltip-arrow z-50 translate-y-[calc(-50%_-_2px)] bg-foreground fill-foreground"`
		);
		const pairs = pairClassStrings(ours, upstream);
		expect(pairs).toHaveLength(1);
		expect(pairs[0]?.kind).toBe("ignored");
		expect(pairs[0]?.ours?.ignoredReason).toBe("Bits Arrow positioning");
	});

	it("concatenates a split rtl fragment back onto the shared class list", () => {
		const content = `
			class={cn(
				"cn-sidebar-rail absolute sm:flex",
				// parity-ignore: keep rtl/ltr utilities until the CLI rewrites them
				"ltr:-translate-x-1/2 rtl:-translate-x-1/2",
				"in-data-[side=left]:cursor-w-resize",
			)}
		`;
		const strings = extractClassStrings(content);
		expect(strings).toHaveLength(2);
		expect(strings[0]?.merged).toContain("cn-sidebar-rail");
		expect(strings[0]?.merged).toContain("ltr:-translate-x-1/2");
		expect(strings[0]?.ignoredTokens).toEqual(["ltr:-translate-x-1/2", "rtl:-translate-x-1/2"]);
		expect(strings[1]?.merged).toBe("in-data-[side=left]:cursor-w-resize");
	});

	it("formats the original ignore comment for reports", () => {
		expect(
			formatIgnoredComment({
				ignoredReason: "bits vs radix",
				ignoredComment: "\t// parity-ignore: bits vs radix\n",
			})
		).toBe("// parity-ignore: bits vs radix");
		expect(formatIgnoredComment({ ignoredReason: "Bits-only API", ignoredFile: true })).toBe(
			"parity-ignore-file: Bits-only API"
		);
	});
});

describe("runtime-equivalent tokens", () => {
	it("does not treat aria-expanded as the same as data-open", () => {
		expect(canonicalizeRuntimeToken("aria-expanded:opacity-100")).not.toBe(
			canonicalizeRuntimeToken("data-open:opacity-100")
		);
		expect(canonicalizeRuntimeToken("has-aria-expanded:bg-muted/50")).not.toBe(
			canonicalizeRuntimeToken("has-data-open:bg-muted/50")
		);
	});

	it("treats data-[state=open] as the same as data-open", () => {
		expect(canonicalizeRuntimeToken("data-[state=open]:animate-in")).toBe(
			canonicalizeRuntimeToken("data-open:animate-in")
		);
	});

	it("treats aria-orientation, data-direction, and data-vertical as the same axis", () => {
		expect(canonicalizeRuntimeToken("aria-[orientation=vertical]:flex-col")).toBe(
			canonicalizeRuntimeToken("data-[direction=vertical]:flex-col")
		);
		expect(canonicalizeRuntimeToken("data-vertical:flex-col")).toBe(
			canonicalizeRuntimeToken("data-[direction=vertical]:flex-col")
		);
	});

	it("does not invert Paneforge group axis with Radix handle aria-orientation", () => {
		expect(canonicalizeRuntimeToken("aria-[orientation=horizontal]:h-px")).not.toBe(
			canonicalizeRuntimeToken("data-[direction=vertical]:h-px")
		);
	});
});

describe("parseItemArg", () => {
	it("splits style/item when the style is a preset", () => {
		expect(parseItemArg("mira/empty")).toEqual({ style: "mira", item: "empty" });
		expect(parseItemArg("empty")).toEqual({ item: "empty" });
		expect(parseItemArg("not-a-style/empty")).toEqual({ item: "not-a-style/empty" });
	});
});

describe("svelte-only source files", () => {
	const command = extractUpstreamComponentNames(`
		function Command() {}
		function CommandDialog() {}
		function CommandInput() {}
		function CommandList() {}
		function CommandEmpty() {}
		function CommandGroup() {}
		function CommandSeparator() {}
		function CommandItem() {}
		function CommandShortcut() {}
		export { Command, CommandItem }
	`);

	it("extracts PascalCase function and const components", () => {
		expect(command.has("CommandItem")).toBe(true);
		expect(command.has("CommandLinkItem")).toBe(false);
		expect(
			extractUpstreamComponentNames("const Toaster = ({ ...props }: ToasterProps) => {}").has(
				"Toaster"
			)
		).toBe(true);
	});

	it("skips components that only exist on our side", () => {
		expect(sourceFileHasUpstreamCounterpart("command-link-item.svelte", "command", command)).toBe(
			false
		);
		expect(sourceFileHasUpstreamCounterpart("command-loading.svelte", "command", command)).toBe(
			false
		);
		expect(sourceFileHasUpstreamCounterpart("index.ts", "command", command)).toBe(false);
	});

	it("keeps shared ports, including Bits/Radix name aliases", () => {
		expect(sourceFileHasUpstreamCounterpart("command.svelte", "command", command)).toBe(true);
		expect(sourceFileHasUpstreamCounterpart("command-item.svelte", "command", command)).toBe(true);
		expect(
			sourceFileHasUpstreamCounterpart(
				"input-otp-group.svelte",
				"input-otp",
				new Set(["InputOTP", "InputOTPGroup"])
			)
		).toBe(true);
		expect(
			sourceFileHasUpstreamCounterpart(
				"resizable-pane-group.svelte",
				"resizable",
				new Set(["ResizablePanelGroup", "ResizablePanel"])
			)
		).toBe(true);
		expect(
			sourceFileHasUpstreamCounterpart(
				"context-menu-group-heading.svelte",
				"context-menu",
				new Set(["ContextMenu", "ContextMenuLabel"])
			)
		).toBe(true);
		expect(
			sourceFileHasUpstreamCounterpart(
				"scroll-area-scrollbar.svelte",
				"scroll-area",
				new Set(["ScrollArea", "ScrollBar"])
			)
		).toBe(true);
		expect(sourceFileHasUpstreamCounterpart("sonner.svelte", "sonner", new Set(["Toaster"]))).toBe(
			true
		);
	});

	it("does not treat legacy aliases as upstream counterparts", () => {
		expect(
			sourceFileHasUpstreamCounterpart(
				"pagination-next-button.svelte",
				"pagination",
				new Set(["Pagination", "PaginationNext"])
			)
		).toBe(false);
	});
});

describe("source locations", () => {
	it("converts a character offset into a 1-based line number", () => {
		expect(offsetToLine("flex", 0)).toBe(1);
		expect(offsetToLine("flex\ngap-2", 5)).toBe(2);
		expect(offsetToLine("a\nb\nc", 4)).toBe(3);
	});

	it("formats path:line for terminals and editors", () => {
		expect(formatSourceLocation()).toBe("");
		expect(
			formatSourceLocation({ path: "src/lib/registry/ui/sheet/sheet-overlay.svelte", line: 15 })
		).toBe("src/lib/registry/ui/sheet/sheet-overlay.svelte:15");
	});
});

describe("parity percent", () => {
	it("treats remaining diffs as the uncovered share", () => {
		expect(
			parityPercent({
				exact: 9,
				order: 0,
				equivalent: 1,
				ignored: 0,
				allowlist: 0,
				framework: 0,
				diff: 0,
			})
		).toBe(100);
		expect(
			parityPercent({
				exact: 8,
				order: 0,
				equivalent: 0,
				ignored: 0,
				allowlist: 0,
				framework: 0,
				diff: 2,
			})
		).toBe(80);
	});
});

describe("formatTable", () => {
	it("aligns numeric columns to the right", () => {
		expect(
			formatTable(
				[
					{ item: "field", parity: "95%", diff: "1" },
					{ item: "separator", parity: "100%", diff: "0" },
				],
				[
					{ key: "item", header: "Item" },
					{ key: "parity", header: "Parity", align: "right" },
					{ key: "diff", header: "Diff", align: "right" },
				]
			)
		).toBe(
			[
				"| Item      | Parity | Diff |",
				"| --------- | ------ | ---- |",
				"| field     |    95% |    1 |",
				"| separator |   100% |    0 |",
			].join("\n")
		);
	});
});

describe("fixClassString", () => {
	it("removes extra tokens, adds missing ones, and replaces mismatches", () => {
		expect(
			fixClassString("relative grow overflow-hidden bg-muted", ["bg-muted"], ["bg-input/90"])
		).toBe("relative grow overflow-hidden bg-input/90");
		expect(fixClassString("flex extra gap-2", ["extra"], [])).toBe("flex gap-2");
		expect(fixClassString("flex", [], ["gap-2"])).toBe("flex gap-2");
	});

	it("keeps logical-side spellings instead of copying upstream left/right", () => {
		expect(fixClassString("relative start-0", ["start-0"], ["left-0"])).toBe("relative start-0");
		expect(fixClassString("relative", [], ["left-0"])).toBe("relative start-0");
	});

	it("does not strip cn-* tokens", () => {
		expect(fixClassString("cn-slider-track bg-muted grow", ["bg-muted"], [])).toBe(
			"cn-slider-track grow"
		);
	});

	it("does not strip framework origin tokens or copy radix names", () => {
		expect(
			fixClassString(
				"z-50 origin-(--transform-origin)",
				["origin-(--transform-origin)"],
				["origin-(--radix-popover-content-transform-origin)"]
			)
		).toBe("z-50 origin-(--transform-origin)");
	});
});
