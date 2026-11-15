import * as fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { planRtlMigration, applyRtlMigration, enableRtl } from "../../src/commands/migrate/rtl.js";

vi.mock("node:crypto", () => ({ randomUUID: () => "00000000-0000-0000-0000-000000000000" }));
const temporary: string[] = [];
let cwd: string;
let ui: string;
const cli = fileURLToPath(new URL("../../dist/index.mjs", import.meta.url));
const config =
	'{\n  "tailwind": { "css": "src/app.css", "baseColor": "zinc" },\n  "aliases": { "components": "$lib/components", "utils": "$lib/utils", "ui": "$lib/components/ui" },\n  "typescript": true,\n  "custom": { "rtl": false, "keep": "שלום" },\n  "rtl": false\n}\n';
async function put(relative: string, content: string) {
	const file = path.join(cwd, relative);
	await fs.mkdir(path.dirname(file), { recursive: true });
	await fs.writeFile(file, content);
	return file;
}
async function fixture() {
	const base = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-rtl-migrate-"));
	temporary.push(base);
	return fs.realpath(base);
}
function run(...args: string[]) {
	return spawnSync(process.execPath, [cli, "migrate", "rtl", "--cwd", cwd, ...args], {
		encoding: "utf8",
	});
}
async function noTemps() {
	return (await fs.readdir(ui)).filter((file) => file.includes(".shadcn-rtl-"));
}
beforeEach(async () => {
	cwd = await fixture();
	ui = path.join(cwd, "src/lib/components/ui");
	await fs.mkdir(ui, { recursive: true });
	await put("components.json", config);
	await put(
		"tsconfig.json",
		JSON.stringify({ compilerOptions: { baseUrl: ".", paths: { "$lib/*": ["src/lib/*"] } } })
	);
});
afterEach(async () => {
	await Promise.all(
		temporary.splice(0).map((file) => fs.rm(file, { recursive: true, force: true }))
	);
});

describe("RTL migration planning and preservation", () => {
	it("uses the UI directory, preserves custom code and becomes a no-op on a second run", async () => {
		const source =
			'<script lang="ts">const title = "text-left"; const handler = () => title;</script>\n<button onclick={handler} class="ml-2 text-left cn-rtl-flip">{title}</button>\n';
		const file = await put("src/lib/components/ui/custom.svelte", source);
		await put("src/elsewhere.svelte", '<p class="mr-2"></p>');
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		expect(plan.files).toEqual([file]);
		expect(plan.edits).toHaveLength(2);
		await applyRtlMigration(plan);
		expect(await fs.readFile(file, "utf8")).toBe(
			source.replace('class="ml-2 text-left cn-rtl-flip"', 'class="ms-2 text-start rtl:rotate-180"')
		);
		expect(await fs.readFile(path.join(cwd, "src/elsewhere.svelte"), "utf8")).toContain("mr-2");
		expect(await fs.readFile(path.join(cwd, "components.json"), "utf8")).toBe(
			config.replace('"rtl": false\n}', '"rtl": true\n}')
		);
		expect((await planRtlMigration({ cwd, uiPath: ui })).edits).toEqual([]);
	});
	it("preserves configuration text and nested rtl fields", () => {
		expect(enableRtl(config)).toBe(config.replace('"rtl": false\n}', '"rtl": true\n}'));
		expect(enableRtl('{"nested":{"rtl":false}}')).toBe('{"nested":{"rtl":false}, "rtl": true}');
		const enabled = '{\r\n  "rtl": true,\r\n  "custom": 1\r\n}\r\n';
		expect(enableRtl(enabled)).toBe(enabled);
		expect(JSON.parse(enableRtl("{}"))).toEqual({ rtl: true });
	});
	it("supports file, directory and brace/glob targets while excluding generated files", async () => {
		await put("src/lib/components/ui/a.svelte", '<p class="pr-2"></p>');
		await put("src/lib/components/ui/nested/variants.ts", 'export const x = cn("ml-1");');
		await put("src/lib/components/ui/types.d.ts", "not migratable source");
		await put("src/lib/components/ui/node_modules/no.svelte", "invalid source");
		await put("src/lib/components/ui/dist/no.svelte", "invalid source");
		const glob = await planRtlMigration({ cwd, target: "src/lib/components/ui/**/*.{svelte,ts}" });
		expect(glob.files).toHaveLength(2);
		expect(
			(await planRtlMigration({ cwd, target: "src/lib/components/ui/a.svelte" })).files
		).toHaveLength(1);
		expect((await planRtlMigration({ cwd, target: ui })).files).toHaveLength(2);
	});
	it("reports component review without guessing label APIs, locale plumbing or mobile behavior", async () => {
		await put(
			"src/lib/components/ui/pagination/pagination-previous.svelte",
			'<button class="ml-2">Custom previous label</button>'
		);
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		expect(plan.review).toEqual([
			path.join("src", "lib", "components", "ui", "pagination", "pagination-previous.svelte"),
		]);
		expect(plan.edits[0]!.after).toContain("Custom previous label");
		expect(plan.edits[0]!.after).not.toContain("text=");
	});
	it("does not write any file when parsing fails or a glob has no matches", async () => {
		const file = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		await put("src/lib/components/ui/z.svelte", "<script>const = broken</script>");
		await expect(planRtlMigration({ cwd, uiPath: ui })).rejects.toThrow("Could not parse");
		await expect(planRtlMigration({ cwd, target: "src/missing/**/*.svelte" })).rejects.toThrow(
			"No Svelte"
		);
		expect(await fs.readFile(file, "utf8")).toContain("ml-2");
		expect(await fs.readFile(path.join(cwd, "components.json"), "utf8")).toBe(config);
	});
	it("rejects invalid config before staging any source changes", async () => {
		await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		await put("components.json", '{"rtl":"yes"}');
		await expect(planRtlMigration({ cwd, uiPath: ui })).rejects.toThrow("boolean");
		expect(await noTemps()).toEqual([]);
	});
});

describe("path boundaries and write failures", () => {
	it("rejects outside targets, parent traversal and excluded directories", async () => {
		const outside = await fixture();
		await fs.writeFile(path.join(outside, "file.svelte"), '<p class="ml-2"></p>');
		await expect(planRtlMigration({ cwd, target: outside })).rejects.toThrow("outside");
		await expect(planRtlMigration({ cwd, target: "../outside/*.svelte" })).rejects.toThrow("'..'");
		await put("node_modules/a.svelte", '<p class="ml-2"></p>');
		await expect(planRtlMigration({ cwd, target: "node_modules/a.svelte" })).rejects.toThrow(
			"Excluded"
		);
	});
	it.skipIf(process.platform === "win32")(
		"refuses explicit symlinks and skips symlink escapes in globs",
		async () => {
			const outside = await fixture();
			const source = '<p class="ml-2"></p>';
			await fs.writeFile(path.join(outside, "file.svelte"), source);
			await fs.symlink(outside, path.join(ui, "escape"), "dir");
			await put("src/lib/components/ui/safe.svelte", source);
			await expect(planRtlMigration({ cwd, target: path.join(ui, "escape") })).rejects.toThrow(
				"symlink"
			);
			const plan = await planRtlMigration({ cwd, target: "**/*.svelte" });
			expect(plan.files).toHaveLength(1);
			expect(plan.skipped).toHaveLength(1);
			await applyRtlMigration(plan);
			expect(await fs.readFile(path.join(outside, "file.svelte"), "utf8")).toBe(source);
		}
	);
	it.skipIf(process.platform === "win32")("refuses a symlinked config", async () => {
		const outside = await fixture();
		await fs.writeFile(path.join(outside, "config.json"), config);
		await fs.rm(path.join(cwd, "components.json"));
		await fs.symlink(path.join(outside, "config.json"), path.join(cwd, "components.json"));
		await expect(planRtlMigration({ cwd, uiPath: ui })).rejects.toThrow("symlink");
	});
	it("does not overwrite a colliding staging file or delete somebody else's file", async () => {
		const file = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		const collision = `${file}.shadcn-rtl-00000000-0000-0000-0000-000000000000.tmp`;
		await fs.writeFile(collision, "existing work");
		await expect(applyRtlMigration(plan)).rejects.toThrow("aborted");
		expect(await fs.readFile(collision, "utf8")).toBe("existing work");
		expect(await fs.readFile(file, "utf8")).toContain("ml-2");
	});
	it("aborts on a stale plan without modifying the concurrent edit or config", async () => {
		const file = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		await fs.writeFile(file, "concurrent custom edit");
		await expect(applyRtlMigration(plan)).rejects.toThrow("aborted");
		expect(await fs.readFile(file, "utf8")).toBe("concurrent custom edit");
		expect(await fs.readFile(path.join(cwd, "components.json"), "utf8")).toBe(config);
		expect(await noTemps()).toEqual([]);
	});
	it("rolls back earlier replacements if a later rename fails", async () => {
		const a = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const b = await put("src/lib/components/ui/b.svelte", '<p class="mr-2"></p>');
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		let count = 0;
		const rename: typeof fs.rename = async (from, to) => {
			if (++count === 2) throw new Error("simulated write failure");
			await fs.rename(from, to);
		};
		await expect(applyRtlMigration(plan, { rename })).rejects.toThrow("restored");
		expect(await fs.readFile(a, "utf8")).toContain("ml-2");
		expect(await fs.readFile(b, "utf8")).toContain("mr-2");
		expect(await fs.readFile(path.join(cwd, "components.json"), "utf8")).toBe(config);
		expect(await noTemps()).toEqual([]);
	});
	it("preserves a concurrent edit encountered after the first replacement", async () => {
		const a = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const b = await put("src/lib/components/ui/b.svelte", '<p class="mr-2"></p>');
		const plan = await planRtlMigration({ cwd, uiPath: ui });
		const rename: typeof fs.rename = async (from, to) => {
			await fs.rename(from, to);
			if (to === a) await fs.writeFile(b, "new user edit");
		};
		await expect(applyRtlMigration(plan, { rename })).rejects.toThrow("restored");
		expect(await fs.readFile(a, "utf8")).toContain("ml-2");
		expect(await fs.readFile(b, "utf8")).toBe("new user edit");
		expect(await noTemps()).toEqual([]);
	});
	it("preserves executable permissions", async () => {
		const file = await put(
			"src/lib/components/ui/tool.ts",
			'#!/usr/bin/env node\nconst v = cn("ml-2");'
		);
		await fs.chmod(file, 0o755);
		await applyRtlMigration(await planRtlMigration({ cwd, uiPath: ui }));
		if (process.platform !== "win32") expect((await fs.stat(file)).mode & 0o777).toBe(0o755);
	});
});

describe("configuration ambiguity", () => {
	it("rejects duplicate root rtl keys rather than leaving migration disabled", () => {
		expect(() => enableRtl('{"rtl":false,"rtl":true}')).toThrow("duplicate rtl");
		expect(() => enableRtl('{"rtl":true,"rtl":false}')).toThrow("duplicate rtl");
	});
});

describe("migrate rtl command", () => {
	it("dry-runs the configured UI directory without source, config, sync or staging writes", async () => {
		const file = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const result = run("--dry-run");
		expect(result.status, result.stdout + result.stderr).toBe(0);
		expect(result.stdout).toContain("Dry run complete");
		expect(await fs.readFile(file, "utf8")).toContain("ml-2");
		expect(await fs.readFile(path.join(cwd, "components.json"), "utf8")).toBe(config);
		expect(await noTemps()).toEqual([]);
		await expect(fs.stat(path.join(cwd, ".svelte-kit"))).rejects.toThrow();
	});
	it("requires explicit non-interactive confirmation and applies --yes in place", async () => {
		const file = await put("src/lib/components/ui/a.svelte", '<p class="ml-2"></p>');
		const refused = run("src/lib/components/ui/a.svelte");
		expect(refused.status).toBe(1);
		expect(await fs.readFile(file, "utf8")).toContain("ml-2");
		const applied = run("src/lib/components/ui/a.svelte", "--yes");
		expect(applied.status, applied.stdout + applied.stderr).toBe(0);
		expect(await fs.readFile(file, "utf8")).toContain("ms-2");
	});
});
