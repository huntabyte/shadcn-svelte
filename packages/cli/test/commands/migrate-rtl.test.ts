import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { runMigrateRtl } from "../../src/commands/migrate/rtl";
import { transformRtl } from "../../src/utils/transformers/index";
import type { ResolvedConfig } from "../../src/utils/config/index";

let tmpDir: string | undefined;

function getConfig(cwd: string): ResolvedConfig {
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
			components: path.join(cwd, "src/lib/components"),
			tailwindCss: path.join(cwd, "src/app.css"),
			utils: path.join(cwd, "src/lib/utils"),
			cwd,
			hooks: path.join(cwd, "src/lib/hooks"),
			ui: path.join(cwd, "src/lib/components/ui"),
			lib: path.join(cwd, "src/lib"),
		},
		style: "nova",
		iconLibrary: "lucide",
		menuAccent: "subtle",
		menuColor: "default",
		sveltekit: true,
		typescript: true,
		rtl: false,
		registry: "https://shadcn-svelte.com/registry",
	};
}

async function transformDirection(content: string, rtl: boolean) {
	const result = await transformRtl({
		content,
		filePath: "test.svelte",
		config: { ...getConfig("/tmp/shadcn-svelte-rtl"), rtl },
	});

	return result.content;
}

describe("migrateRtl", () => {
	describe("transformDirection", () => {
		it("should transform class string literals", async () => {
			const input = `
<div class="ml-2 mr-4 text-left">content</div>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("ms-2");
			expect(result).toContain("me-4");
			expect(result).toContain("text-start");
		});

		it("should transform cn() function arguments", async () => {
			const input = `
<script lang="ts">
	import { cn } from "$lib/utils";
</script>

<div class={cn("ml-2 mr-4", true && "pl-2")}>content</div>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("ms-2");
			expect(result).toContain("me-4");
			expect(result).toContain("ps-2");
		});

		it("should transform cva base classes and variants", async () => {
			const input = `
<script lang="ts">
	import { cva } from "class-variance-authority";

	const buttonVariants = cva("ml-2 mr-4", {
		variants: {
			size: {
				default: "pl-4 pr-4",
				sm: "pl-2 pr-2",
			},
		},
	});
</script>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("ms-2");
			expect(result).toContain("me-4");
			expect(result).toContain("ps-4");
			expect(result).toContain("pe-4");
			expect(result).toContain("ps-2");
			expect(result).toContain("pe-2");
		});

		it("should not transform when rtl is false", async () => {
			const input = `
<div class="ml-2 mr-4 text-left">content</div>
`.trim();

			const result = await transformDirection(input, false);
			expect(result).toContain("ml-2");
			expect(result).toContain("mr-4");
			expect(result).toContain("text-left");
			expect(result).not.toContain("ms-2");
		});

		it("should skip classes with rtl: or ltr: prefixes", async () => {
			const input = `
<div class="ml-2 rtl:mr-2 ltr:pl-4">content</div>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("ms-2");
			expect(result).toContain("rtl:mr-2");
			expect(result).toContain("ltr:pl-4");
		});

		it("should add rtl: variants for translate-x classes", async () => {
			const input = `
<div class="-translate-x-1/2">content</div>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("-translate-x-1/2");
			expect(result).toContain("rtl:translate-x-1/2");
		});

		it("should add rtl:space-x-reverse for space-x classes", async () => {
			const input = `
<div class="space-x-4">content</div>
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("space-x-4");
			expect(result).toContain("rtl:space-x-reverse");
		});

		it("should transform cn-rtl-flip marker to rtl:rotate-180", async () => {
			const input = `
<Icon class="cn-rtl-flip size-4" />
`.trim();

			const result = await transformDirection(input, true);
			expect(result).toContain("rtl:rotate-180");
			expect(result).toContain("size-4");
			expect(result).not.toContain("cn-rtl-flip");
		});
	});
});

it("migrates a component by name from the configured ui directory", async () => {
	tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-svelte-rtl-"));
	const filePath = path.join(tmpDir, "src/lib/components/ui/button/index.svelte");

	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(
		path.join(tmpDir, "components.json"),
		JSON.stringify(
			{
				style: "nova",
				tailwind: {
					css: "src/app.css",
					baseColor: "zinc",
				},
				aliases: {
					utils: "$lib/utils",
					components: "$lib/components",
					ui: "$lib/components/ui",
					hooks: "$lib/hooks",
					lib: "$lib",
				},
				typescript: true,
				registry: "https://shadcn-svelte.com/registry",
				rtl: false,
			},
			null,
			2
		),
		"utf8"
	);
	await fs.writeFile(filePath, `<div class="ml-2 text-left"></div>`, "utf8");

	await runMigrateRtl(tmpDir, getConfig(tmpDir), { cwd: tmpDir, yes: true }, "button");

	await expect(fs.readFile(filePath, "utf8")).resolves.toBe(
		`<div class="ms-2 text-start"></div>`
	);
	await expect(fs.readFile(path.join(tmpDir, "components.json"), "utf8")).resolves.toContain(
		`"rtl": true`
	);
});

afterEach(async () => {
	if (!tmpDir) return;
	await fs.rm(tmpDir, { recursive: true, force: true });
	tmpDir = undefined;
});
