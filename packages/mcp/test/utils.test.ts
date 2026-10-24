import fs from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { detect } from "package-manager-detector";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getInstalledAgents, resolveShadcnCommand } from "../src/utils.js";

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
		await expect(resolveShadcnCommand("add", ["button"], createTempDir())).resolves.toEqual({
			command: "npx",
			args: ["shadcn-svelte@latest", "add", "button"],
		});
	});

	it("uses pnpm dlx for pnpm", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		await expect(resolveShadcnCommand("mcp", [], createTempDir())).resolves.toEqual({
			command: "pnpm",
			args: ["dlx", "shadcn-svelte@latest", "mcp"],
		});
	});

	it("uses bun x for bun", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "bun", name: "bun" });
		await expect(resolveShadcnCommand("mcp", [], createTempDir())).resolves.toEqual({
			command: "bun",
			args: ["x", "shadcn-svelte@latest", "mcp"],
		});
	});

	it("runs the version installed in the project", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		await expect(resolveShadcnCommand("add", ["button"], createProjectWithCli())).resolves.toEqual({
			command: "npx",
			args: ["shadcn-svelte", "add", "button"],
		});
	});

	it("runs the installed version through pnpm exec for pnpm", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		await expect(resolveShadcnCommand("add", ["button"], createProjectWithCli())).resolves.toEqual({
			command: "pnpm",
			args: ["exec", "shadcn-svelte", "add", "button"],
		});
	});

	it("finds an install in a parent directory", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		const cwd = path.join(createProjectWithCli(), "src", "routes");
		fs.mkdirSync(cwd, { recursive: true });
		await expect(resolveShadcnCommand("add", ["button"], cwd)).resolves.toEqual({
			command: "npx",
			args: ["shadcn-svelte", "add", "button"],
		});
	});

	it("finds an install next to the lockfile", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		const root = createProjectWithCli();
		fs.writeFileSync(path.join(root, "pnpm-lock.yaml"), "");
		const cwd = path.join(root, "apps", "web");
		fs.mkdirSync(cwd, { recursive: true });
		await expect(resolveShadcnCommand("add", ["button"], cwd)).resolves.toEqual({
			command: "pnpm",
			args: ["exec", "shadcn-svelte", "add", "button"],
		});
	});

	it("always runs the latest CLI for Yarn Berry", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "yarn@berry", name: "yarn" });
		await expect(resolveShadcnCommand("add", ["button"], createProjectWithCli())).resolves.toEqual({
			command: "yarn",
			args: ["dlx", "shadcn-svelte@latest", "add", "button"],
		});
	});

	it("ignores an install above the project's lockfile", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		// `pnpm exec` only finds the project's and the workspace root's installs.
		const cwd = path.join(createProjectWithCli(), "app");
		fs.mkdirSync(cwd);
		fs.writeFileSync(path.join(cwd, "pnpm-lock.yaml"), "");
		await expect(resolveShadcnCommand("add", ["button"], cwd)).resolves.toEqual({
			command: "pnpm",
			args: ["dlx", "shadcn-svelte@latest", "add", "button"],
		});
	});
});

describe("getInstalledAgents", () => {
	it("lists the package managers whose commands are on the PATH", () => {
		const dir = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-mcp-path-"));
		const ext = process.platform === "win32" ? ".cmd" : "";
		// `pnpm-rush` runs `rush-pnpm`
		for (const command of ["pnpm", "rush-pnpm"]) {
			fs.writeFileSync(path.join(dir, command + ext), "");
			fs.chmodSync(path.join(dir, command + ext), 0o755);
		}
		// Windows finds `where` through the PATH too
		const system =
			process.platform === "win32" ? [path.join(process.env.SystemRoot!, "System32")] : [];
		vi.stubEnv("PATH", [dir, ...system].join(path.delimiter));

		try {
			expect(getInstalledAgents()).toEqual(["pnpm", "pnpm-rush"]);
		} finally {
			vi.unstubAllEnvs();
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});
});
