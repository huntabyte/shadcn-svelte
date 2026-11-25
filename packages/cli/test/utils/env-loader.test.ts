import os from "node:os";
import path from "node:path";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadEnvFiles } from "../../src/utils/env-loader.js";

describe("loadEnvFiles", () => {
	let cwd: string;
	beforeEach(() => {
		cwd = mkdtempSync(path.join(os.tmpdir(), "shadcn-svelte-env-"));
		vi.stubEnv("REGISTRY_TOKEN", undefined);
	});
	afterEach(() => {
		rmSync(cwd, { recursive: true, force: true });
		vi.unstubAllEnvs();
	});

	it("loads the requested project's environment without changing process.env", () => {
		writeFileSync(path.join(cwd, ".env"), 'REGISTRY_TOKEN="project-token"\n');
		expect(loadEnvFiles(cwd).REGISTRY_TOKEN).toBe("project-token");
		expect(process.env.REGISTRY_TOKEN).toBeUndefined();
	});

	it("uses shadcn's environment file precedence", () => {
		for (const [file, token] of [
			[".env", "base"],
			[".env.development", "development"],
			[".env.development.local", "development-local"],
			[".env.local", "local"],
		] as const) {
			writeFileSync(path.join(cwd, file), `REGISTRY_TOKEN=${token}\n`);
		}
		expect(loadEnvFiles(cwd).REGISTRY_TOKEN).toBe("local");
		vi.stubEnv("REGISTRY_TOKEN", "shell-token");
		expect(loadEnvFiles(cwd).REGISTRY_TOKEN).toBe("shell-token");
	});

	it("does not carry credentials from one project to another", () => {
		writeFileSync(path.join(cwd, ".env.local"), "REGISTRY_TOKEN=first-project\n");
		expect(loadEnvFiles(cwd).REGISTRY_TOKEN).toBe("first-project");
		rmSync(path.join(cwd, ".env.local"));
		expect(loadEnvFiles(cwd).REGISTRY_TOKEN).toBeUndefined();
	});
});
