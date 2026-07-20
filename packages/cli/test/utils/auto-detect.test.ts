import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, afterAll, beforeEach } from "vitest";
import { detectConfigs, isPackageManagerInstalled } from "../../src/utils/auto-detect";
import type { Agent } from "package-manager-detector";

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
});

describe("isPackageManagerInstalled", () => {
	it("returns true for a binary that exists (node)", async () => {
		// `node` is guaranteed to be present since the tests run on it
		await expect(isPackageManagerInstalled("node" as Agent)).resolves.toBe(true);
	});

	it("returns false for a binary that does not exist", async () => {
		await expect(isPackageManagerInstalled("definitely-not-a-real-pm" as Agent)).resolves.toBe(
			false
		);
	});

	it("strips the version suffix before probing the binary", async () => {
		// `node@99` should still resolve to the real `node` binary
		await expect(isPackageManagerInstalled("node@99" as Agent)).resolves.toBe(true);
	});
});
