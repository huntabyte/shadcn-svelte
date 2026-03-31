import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { transform, transformFont } from "../../src/utils/transformers";
import type { ResolvedConfig } from "../../src/utils/config/index";
import { resolvedConfigSchema } from "../../src/utils/config/schema";

const tempDirs: string[] = [];

async function createTestConfig(cssContent: string): Promise<ResolvedConfig> {
	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-svelte-font-"));
	tempDirs.push(tempDir);

	const tailwindCss = path.join(tempDir, "app.css");
	await fs.writeFile(tailwindCss, cssContent, "utf8");

	return resolvedConfigSchema.parse({
		tailwind: {
			baseColor: "zinc",
			css: path.relative(tempDir, tailwindCss),
		},
		aliases: {
			utils: "$lib/utils",
			components: "$lib/components",
			hooks: "$lib/hooks",
			ui: "$lib/components/ui",
			lib: "$lib",
		},
		registry: "https://shadcn-svelte.com/registry",
		style: "vega",
		iconLibrary: "lucide",
		menuColor: "default",
		menuAccent: "subtle",
		typescript: true,
		sveltekit: true,
		resolvedPaths: {
			cwd: tempDir,
			tailwindCss,
			components: path.join(tempDir, "src/lib/components"),
			utils: path.join(tempDir, "src/lib/utils"),
			hooks: path.join(tempDir, "src/lib/hooks"),
			ui: path.join(tempDir, "src/lib/components/ui"),
			lib: path.join(tempDir, "src/lib"),
		},
	});
}

afterEach(async () => {
	await Promise.all(
		tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true }))
	);
});

describe("transformFont", () => {
	it("does not rewrite cn-font-heading unless transformFont is explicitly included", async () => {
		const raw = `<h2 class="cn-font-heading text-xl"></h2>`;
		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(
					`@theme inline { --font-heading: var(--font-heading); }`
				),
			},
			[]
		);

		expect(result.content).toContain('class="cn-font-heading text-xl"');
	});

	it("rewrites cn-font-heading to font-heading when the project supports it", async () => {
		const raw = `<h2 class="cn-font-heading text-xl"></h2>`;
		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(
					`@theme inline { --font-heading: var(--font-heading); }`
				),
			},
			[transformFont]
		);

		expect(result.content).toContain('class="font-heading text-xl"');
		expect(result.content).not.toContain("cn-font-heading");
	});

	it("removes cn-font-heading when the project does not support it", async () => {
		const raw = `<h2 class="cn-font-heading text-xl"></h2>`;
		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(`@theme inline { --font-sans: var(--font-sans); }`),
			},
			[transformFont]
		);

		expect(result.content).toContain('class="text-xl"');
		expect(result.content).not.toContain("font-heading");
		expect(result.content).not.toContain("cn-font-heading");
	});

	it("rewrites cn-font-heading inside cva and mergeProps calls", async () => {
		const raw = `
<script lang="ts">
	import { cva } from "class-variance-authority";
	import { mergeProps } from "svelte";

	const title = cva("cn-font-heading text-xl", {
		variants: {
			size: {
				sm: "cn-font-heading text-sm",
			},
		},
	});

	export function combine(props: Record<string, unknown>) {
		return mergeProps({ class: "cn-font-heading" }, props);
	}
</script>
`.trim();

		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(
					`@theme inline { --font-heading: var(--font-heading); }`
				),
			},
			[transformFont]
		);

		expect(result.content).toContain('cva("font-heading text-xl"');
		expect(result.content).toContain('"font-heading text-sm"');
		expect(result.content).toContain('{ class: "font-heading" }');
	});

	it("rewrites cn-font-heading when the current install adds heading font support", async () => {
		const raw = `<h2 class="cn-font-heading text-xl"></h2>`;
		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(`@theme inline { --font-sans: var(--font-sans); }`),
				supportedFontMarkers: ["cn-font-heading"],
			},
			[transformFont]
		);

		expect(result.content).toContain('class="font-heading text-xl"');
		expect(result.content).not.toContain("cn-font-heading");
	});

	it("removes an empty class attribute when it only contains cn-font-heading", async () => {
		const raw = `<h2 class="cn-font-heading"></h2>`;
		const result = await transform(
			{
				content: raw,
				filePath: "test.svelte",
				config: await createTestConfig(`@theme inline { --font-sans: var(--font-sans); }`),
			},
			[transformFont]
		);

		expect(result.content).toBe("<h2></h2>");
		expect(result.content).not.toContain("cn-font-heading");
	});
});
