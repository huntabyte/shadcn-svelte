import { vol } from "memfs";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
	CUSTOM_AT_RULES,
	findNeededAtRules,
	updateCustomAtRules,
	type NeededAtRule,
} from "../../src/utils/updaters/update-custom-at-rules";
import type { ResolvedConfig } from "../../src/utils/get-config";

vi.mock("node:fs");
vi.mock("node:fs/promises");

beforeEach(() => {
	vol.reset();
	vi.resetAllMocks();
});

function createMockConfig(tailwindCssPath: string): ResolvedConfig {
	return {
		tailwind: {
			css: "src/app.css",
			baseColor: "zinc",
		},
		aliases: {
			utils: "$lib/utils",
			components: "$lib/components",
			hooks: "$lib/hooks",
			ui: "$lib/components/ui",
			lib: "$lib",
		},
		resolvedPaths: {
			components: "./src/lib/components",
			tailwindCss: tailwindCssPath,
			utils: "./src/lib/utils",
			cwd: "./",
			hooks: "./src/lib/hooks",
			ui: "./src/lib/components/ui",
			lib: "./src/lib",
		},
		designSystem: {
			style: "vega",
			theme: "neutral",
			iconLibrary: "lucide",
			fonts: [],
			menuAccent: "subtle",
			menuColor: "default",
			radius: "0.5rem",
		},
		sveltekit: true,
		typescript: true,
		registry: "https://shadcn-svelte.com/registry",
	};
}

describe("findNeededAtRules", () => {
	it("returns empty array for non-css tailwind config path", async () => {
		const config = createMockConfig("/tmp/tailwind.config.js");

		const result = await findNeededAtRules(config);

		expect(result).toEqual([]);
	});

	it("returns all at-rules when CSS file has none", async () => {
		vol.fromJSON(
			{
				"./app.css": `@import "tailwindcss";

:root {
	--primary: blue;
}`,
			},
			"/tmp"
		);

		const config = createMockConfig("/tmp/app.css");
		const result = await findNeededAtRules(config);

		// Should include all custom variants and utility
		expect(result.length).toBeGreaterThan(0);
		expect(result.some((r) => r.name === "data-open")).toBe(true);
		expect(result.some((r) => r.name === "data-closed")).toBe(true);
		expect(result.some((r) => r.name === "data-checked")).toBe(true);
		expect(result.some((r) => r.name === "data-unchecked")).toBe(true);
		expect(result.some((r) => r.name === "data-selected")).toBe(true);
		expect(result.some((r) => r.name === "data-disabled")).toBe(true);
		expect(result.some((r) => r.name === "data-active")).toBe(true);
		expect(result.some((r) => r.name === "data-horizontal")).toBe(true);
		expect(result.some((r) => r.name === "data-vertical")).toBe(true);
		expect(result.some((r) => r.name === "no-scrollbar")).toBe(true);
	});

	it("returns empty array when all at-rules already exist", async () => {
		vol.fromJSON(
			{
				"./app.css": `@import "tailwindcss";

${CUSTOM_AT_RULES}`,
			},
			"/tmp"
		);

		const config = createMockConfig("/tmp/app.css");
		const result = await findNeededAtRules(config);

		expect(result).toEqual([]);
	});

	it("returns only missing at-rules", async () => {
		vol.fromJSON(
			{
				"./app.css": `@import "tailwindcss";

@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}

@custom-variant data-closed {
  &:where([data-state="closed"]),
  &:where([data-closed]:not([data-closed="false"])) {
    @slot;
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}`,
			},
			"/tmp"
		);

		const config = createMockConfig("/tmp/app.css");
		const result = await findNeededAtRules(config);

		// Should NOT include data-open, data-closed, no-scrollbar (already present)
		expect(result.some((r) => r.name === "data-open")).toBe(false);
		expect(result.some((r) => r.name === "data-closed")).toBe(false);
		expect(result.some((r) => r.name === "no-scrollbar")).toBe(false);

		// Should include remaining rules
		expect(result.some((r) => r.name === "data-checked")).toBe(true);
		expect(result.some((r) => r.name === "data-unchecked")).toBe(true);
		expect(result.some((r) => r.name === "data-selected")).toBe(true);
		expect(result.some((r) => r.name === "data-disabled")).toBe(true);
		expect(result.some((r) => r.name === "data-active")).toBe(true);
		expect(result.some((r) => r.name === "data-horizontal")).toBe(true);
		expect(result.some((r) => r.name === "data-vertical")).toBe(true);
	});

	it("handles CSS with only utility rules present", async () => {
		vol.fromJSON(
			{
				"./app.css": `@import "tailwindcss";

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}`,
			},
			"/tmp"
		);

		const config = createMockConfig("/tmp/app.css");
		const result = await findNeededAtRules(config);

		// no-scrollbar should not be in results
		expect(result.some((r) => r.name === "no-scrollbar")).toBe(false);

		// All custom variants should be in results
		expect(result.some((r) => r.name === "data-open")).toBe(true);
		expect(result.some((r) => r.name === "data-closed")).toBe(true);
	});

	it("handles CSS with only custom-variant rules present", async () => {
		vol.fromJSON(
			{
				"./app.css": `@import "tailwindcss";

@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}`,
			},
			"/tmp"
		);

		const config = createMockConfig("/tmp/app.css");
		const result = await findNeededAtRules(config);

		// data-open should not be in results
		expect(result.some((r) => r.name === "data-open")).toBe(false);

		// Other rules should be in results
		expect(result.some((r) => r.name === "data-closed")).toBe(true);
		expect(result.some((r) => r.name === "no-scrollbar")).toBe(true);
	});
});

describe("updateCustomAtRules", () => {
	it("appends needed at-rules to CSS file", async () => {
		const initialCss = `@import "tailwindcss";

:root {
	--primary: blue;
}`;

		vol.fromJSON(
			{
				"./app.css": initialCss,
			},
			"/tmp"
		);

		const neededAtRules: NeededAtRule[] = [
			{
				name: "data-open",
				code: `@custom-variant data-open {
  &:where([data-state="open"]) {
    @slot;
  }
}`,
			},
		];

		await updateCustomAtRules("/tmp/app.css", neededAtRules);

		const result = vol.readFileSync("/tmp/app.css", "utf8");
		expect(result).toContain(initialCss.trim());
		expect(result).toContain("@custom-variant data-open");
	});

	it("appends multiple at-rules separated by newlines", async () => {
		const initialCss = `@import "tailwindcss";`;

		vol.fromJSON(
			{
				"./app.css": initialCss,
			},
			"/tmp"
		);

		const neededAtRules: NeededAtRule[] = [
			{ name: "data-open", code: "@custom-variant data-open { @slot; }" },
			{ name: "data-closed", code: "@custom-variant data-closed { @slot; }" },
		];

		await updateCustomAtRules("/tmp/app.css", neededAtRules);

		const result = vol.readFileSync("/tmp/app.css", "utf8");
		expect(result).toContain("@custom-variant data-open");
		expect(result).toContain("@custom-variant data-closed");
		// Should have proper spacing
		expect(result).toContain("\n\n@custom-variant data-open");
	});

	it("handles empty neededAtRules array", async () => {
		const initialCss = `@import "tailwindcss";

:root {
	--primary: blue;
}`;

		vol.fromJSON(
			{
				"./app.css": initialCss,
			},
			"/tmp"
		);

		await updateCustomAtRules("/tmp/app.css", []);

		const result = vol.readFileSync("/tmp/app.css", "utf8");
		// Should just have trailing newlines added
		expect(result).toBe(`${initialCss.trim()}\n\n`);
	});

	it("trims whitespace from original CSS before appending", async () => {
		const initialCss = `@import "tailwindcss";

:root {
	--primary: blue;
}

`;

		vol.fromJSON(
			{
				"./app.css": initialCss,
			},
			"/tmp"
		);

		const neededAtRules: NeededAtRule[] = [
			{ name: "data-open", code: "@custom-variant data-open { @slot; }" },
		];

		await updateCustomAtRules("/tmp/app.css", neededAtRules);

		const result = vol.readFileSync("/tmp/app.css", "utf8");
		// Should not have excessive newlines between original CSS and new rules
		expect(result).not.toMatch(/\n{4,}/);
	});
});
