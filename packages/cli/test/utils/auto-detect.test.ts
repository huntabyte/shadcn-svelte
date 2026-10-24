import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { describe, it, expect, afterAll, beforeEach, vi } from "vitest";
import { detectConfigs, detectPM } from "../../src/utils/auto-detect.js";

describe("detectConfigs", () => {
	const tmpDir = path.join(process.cwd(), "test-fixtures");
	function createCssFile(name: string) {
		fs.writeFileSync(path.join(tmpDir, name), "/* test */");
	}

	function cleanup() {
		if (!fs.existsSync(tmpDir)) {
			fs.mkdirSync(tmpDir, { recursive: true });
			return;
		}

		const files = fs.readdirSync(tmpDir);
		for (const file of files) {
			const filePath = path.join(tmpDir, file);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory()) {
				fs.rmSync(filePath, { recursive: true, force: true });
			} else {
				fs.unlinkSync(filePath);
			}
		}
	}

	beforeEach(() => {
		cleanup();
	});

	afterAll(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true });
	});

	it("should detect app.css when present", () => {
		createCssFile("app.css");
		const result = detectConfigs(tmpDir);
		expect(result.cssPath).toBe(path.join(tmpDir, "app.css"));
	});

	it("should detect main.css when app.css is not present", () => {
		createCssFile("main.css");
		const result = detectConfigs(tmpDir);
		expect(result.cssPath).toBe(path.join(tmpDir, "main.css"));
	});

	it("should detect globals.css when app.css and main.css are not present", () => {
		createCssFile("globals.css");
		const result = detectConfigs(tmpDir);
		expect(result.cssPath).toBe(path.join(tmpDir, "globals.css"));
	});

	it("should detect CSS file with relative path", () => {
		createCssFile("app.css");
		const result = detectConfigs(tmpDir, { relative: true });
		expect(result.cssPath).toBe("app.css");
	});

	it("should return undefined when no CSS files are found", () => {
		const result = detectConfigs(tmpDir);
		expect(result.cssPath).toBeUndefined();
	});

	it("should respect .gitignore", () => {
		const ignoredDir = path.join(tmpDir, "ignored");
		fs.mkdirSync(ignoredDir, { recursive: true });
		fs.writeFileSync(path.join(ignoredDir, "app.css"), "/* test */");
		fs.writeFileSync(path.join(tmpDir, ".gitignore"), "ignored/");

		const result = detectConfigs(tmpDir);
		expect(result.cssPath).toBeUndefined();
	});

	it("should detect the nearest jsconfig.json even when a parent has a tsconfig.json", () => {
		// monorepo-like structure: a JS Svelte child project nested inside a TS parent project
		const parentDir = path.join(tmpDir, "parent");
		const childDir = path.join(parentDir, "child");
		fs.mkdirSync(childDir, { recursive: true });
		fs.writeFileSync(path.join(parentDir, "tsconfig.json"), "{}");
		fs.writeFileSync(path.join(childDir, "jsconfig.json"), "{}");

		const result = detectConfigs(childDir);
		expect(result.tsconfigPath).toBe(path.join(childDir, "jsconfig.json"));
	});

	it("should prefer tsconfig.json over jsconfig.json in the same directory", () => {
		fs.writeFileSync(path.join(tmpDir, "tsconfig.json"), "{}");
		fs.writeFileSync(path.join(tmpDir, "jsconfig.json"), "{}");

		const result = detectConfigs(tmpDir);
		expect(result.tsconfigPath).toBe(path.join(tmpDir, "tsconfig.json"));
	});

	it("should detect the #lib package subpath import alias", () => {
		fs.writeFileSync(
			path.join(tmpDir, "package.json"),
			JSON.stringify({ imports: { "#lib/*": "./src/lib/*" } })
		);

		const result = detectConfigs(tmpDir);
		expect(result.packageImportAlias).toBe("#lib");
	});
});

describe("detectPM", () => {
	it("fails instead of asking for a package manager without a terminal", async () => {
		const cwd = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-detect-pm-"));
		const isTTY = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
		Object.defineProperty(process.stdin, "isTTY", { value: false, configurable: true });

		try {
			await expect(detectPM(cwd, true)).rejects.toThrow(/--install-with.*--no-install/);
			await expect(detectPM(cwd, false)).resolves.toBeUndefined();
		} finally {
			if (isTTY) Object.defineProperty(process.stdin, "isTTY", isTTY);
			else delete (process.stdin as { isTTY?: boolean }).isTTY;
			fs.rmSync(cwd, { recursive: true, force: true });
		}
	});
});

describe("getInstalledAgents", () => {
	function createPathDir(commands: Record<string, number>) {
		const dir = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-path-"));
		const ext = process.platform === "win32" ? ".cmd" : "";
		for (const [command, mode] of Object.entries(commands)) {
			fs.writeFileSync(path.join(dir, command + ext), "");
			fs.chmodSync(path.join(dir, command + ext), mode);
		}
		return dir;
	}

	// Windows finds `where` through the PATH too
	function stubPath(dir: string) {
		const system =
			process.platform === "win32" ? [path.join(process.env.SystemRoot!, "System32")] : [];
		vi.stubEnv("PATH", [dir, ...system].join(path.delimiter));
	}

	// a fresh copy of the module, so the results from other tests aren't cached
	async function importFresh() {
		vi.resetModules();
		return await import("../../src/utils/auto-detect.js");
	}

	it("lists the package managers whose commands are on the PATH", async () => {
		const { getInstalledAgents } = await importFresh();
		// `pnpm-rush` runs `rush-pnpm`
		const dir = createPathDir({ pnpm: 0o755, "rush-pnpm": 0o755 });
		stubPath(dir);

		try {
			expect(getInstalledAgents()).toEqual(["pnpm", "pnpm-rush"]);
		} finally {
			vi.unstubAllEnvs();
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});

	it.skipIf(process.platform === "win32")("ignores commands that aren't executable", async () => {
		const { getInstalledAgents } = await importFresh();
		const dir = createPathDir({ bun: 0o644 });
		stubPath(dir);

		try {
			expect(getInstalledAgents()).toEqual([]);
		} finally {
			vi.unstubAllEnvs();
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});

	it("only searches the PATH once", async () => {
		const { getInstalledAgents } = await importFresh();
		const dir = createPathDir({ pnpm: 0o755 });
		stubPath(dir);

		try {
			expect(getInstalledAgents()).toEqual(["pnpm"]);
			vi.stubEnv("PATH", "");
			expect(getInstalledAgents()).toEqual(["pnpm"]);
		} finally {
			vi.unstubAllEnvs();
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});
});
