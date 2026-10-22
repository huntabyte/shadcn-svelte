import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { detect } from "package-manager-detector";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveShadcnCommand } from "../src/utils.js";

vi.mock("package-manager-detector", async (importOriginal) => {
	const actual = await importOriginal<typeof import("package-manager-detector")>();
	return {
		...actual,
		detect: vi.fn(),
	};
});

const tempDirs: string[] = [];

function createTempDir() {
	const dir = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-mcp-"));
	tempDirs.push(dir);
	return dir;
}

function createProjectWithCli() {
	const dir = createTempDir();
	const cliDir = path.join(dir, "node_modules", "shadcn-svelte");
	fs.mkdirSync(cliDir, { recursive: true });
	fs.writeFileSync(path.join(cliDir, "package.json"), "{}");
	return dir;
}

describe("npxShadcnSvelte", () => {
	beforeEach(() => {
		vi.mocked(detect).mockReset();
	});

	afterEach(() => {
		for (const dir of tempDirs.splice(0)) {
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});

	it("uses npx by default", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		await expect(resolveShadcnCommand("add", ["button"], createTempDir())).resolves.toBe(
			"npx shadcn-svelte@latest add button"
		);
	});

	it("uses pnpm dlx for pnpm", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		await expect(resolveShadcnCommand("mcp", [], createTempDir())).resolves.toBe(
			"pnpm dlx shadcn-svelte@latest mcp"
		);
	});

	it("uses bun x for bun", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "bun", name: "bun" });
		await expect(resolveShadcnCommand("mcp", [], createTempDir())).resolves.toBe(
			"bun x shadcn-svelte@latest mcp"
		);
	});

	it("runs the version installed in the project", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		await expect(resolveShadcnCommand("add", ["button"], createProjectWithCli())).resolves.toBe(
			"npx shadcn-svelte add button"
		);
	});

	it("runs the installed version through pnpm exec for pnpm", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		await expect(resolveShadcnCommand("add", ["button"], createProjectWithCli())).resolves.toBe(
			"pnpm exec shadcn-svelte add button"
		);
	});

	it("finds an install in a parent directory", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		const cwd = path.join(createProjectWithCli(), "src", "routes");
		fs.mkdirSync(cwd, { recursive: true });
		await expect(resolveShadcnCommand("add", ["button"], cwd)).resolves.toBe(
			"npx shadcn-svelte add button"
		);
	});
});
