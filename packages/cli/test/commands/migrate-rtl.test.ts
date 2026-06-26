import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import { runMigrateRtl } from "../../src/commands/migrate/rtl";
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

it("migrates a component by name from the configured ui directory", async () => {
	tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-svelte-rtl-"));
	const filePath = path.join(tmpDir, "src/lib/components/ui/button/index.svelte");

	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, `<div class="ml-2 text-left"></div>`, "utf8");

	await runMigrateRtl(tmpDir, getConfig(tmpDir), { cwd: tmpDir, yes: true }, "button");

	await expect(fs.readFile(filePath, "utf8")).resolves.toBe(
		`<div class="ms-2 text-start"></div>`
	);
});

afterEach(async () => {
	if (!tmpDir) return;
	await fs.rm(tmpDir, { recursive: true, force: true });
	tmpDir = undefined;
});
