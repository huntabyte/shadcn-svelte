import path from "node:path";
import process from "node:process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { Command } from "commander";
import { exec } from "tinyexec";
import { afterEach, expect, it, vi } from "vitest";
import { mcp, runMcpInit } from "../../src/commands/mcp.js";
import { detectPM } from "../../src/utils/auto-detect.js";
import { getDependencyPackageInfo } from "../../src/utils/get-package-info.js";

vi.mock("tinyexec", () => ({
	exec: vi.fn(async () => ({ stdout: "", stderr: "", exitCode: 0 })),
}));

vi.mock("../../src/utils/auto-detect.js", () => ({
	detectPM: vi.fn(async () => undefined),
}));

// pnpm's bin shims set NODE_PATH to this monorepo's store, where Node's lookup would find
// the workspace's `@shadcn-svelte/mcp` from any directory.
vi.mock("../../src/utils/get-package-info.js", async (importOriginal) => ({
	...(await importOriginal<typeof import("../../src/utils/get-package-info.js")>()),
	getDependencyPackageInfo: vi.fn(() => undefined),
}));

vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

afterEach(() => {
	vi.mocked(exec).mockClear();
	vi.mocked(detectPM).mockReset();
	vi.mocked(detectPM).mockResolvedValue(undefined);
	vi.mocked(getDependencyPackageInfo).mockReset();
	vi.mocked(getDependencyPackageInfo).mockReturnValue(undefined);
	vi.mocked(process.exit).mockClear();
});

it("runs @shadcn-svelte/mcp through the package manager in the requested directory", async () => {
	vi.mocked(detectPM).mockResolvedValue("pnpm");
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync(["node", "shadcn-svelte", "mcp", "-c", cwd]);

	expect(exec).toHaveBeenCalledWith("pnpm", ["dlx", "@shadcn-svelte/mcp@latest"], {
		nodeOptions: { cwd: path.resolve(cwd), stdio: "inherit" },
	});
	expect(process.exit).toHaveBeenCalledWith(0);
});

it.each<string | Record<string, string>>([
	{ "shadcn-sv-mcp": "./dist/index.mjs" },
	{ renamed: "./dist/index.mjs" },
	"./dist/index.mjs",
])("prefers the @shadcn-svelte/mcp installed in the project (bin: %j)", async (bin) => {
	vi.mocked(detectPM).mockResolvedValue("pnpm");
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-local-"));
	const pkgDir = path.join(cwd, "node_modules", "@shadcn-svelte", "mcp");
	vi.mocked(getDependencyPackageInfo).mockReturnValue({
		pkg: { name: "@shadcn-svelte/mcp", bin },
		path: path.join(pkgDir, "package.json"),
	});
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync(["node", "shadcn-svelte", "mcp", "-c", cwd]);

	expect(getDependencyPackageInfo).toHaveBeenCalledWith(path.resolve(cwd), "@shadcn-svelte/mcp");
	expect(exec).toHaveBeenCalledWith(process.execPath, [path.join(pkgDir, "dist", "index.mjs")], {
		nodeOptions: { cwd: path.resolve(cwd), stdio: "inherit" },
	});
});

it("writes a cursor config that runs through npx when no package manager is detected", async () => {
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-init-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync([
		"node",
		"shadcn-svelte",
		"mcp",
		"-c",
		cwd,
		"init",
		"--client",
		"cursor",
	]);

	const config = JSON.parse(await readFile(path.join(cwd, ".cursor/mcp.json"), "utf8"));
	expect(config).toEqual({
		mcpServers: {
			"shadcn-svelte": {
				command: "npx",
				args: ["@shadcn-svelte/mcp@latest"],
			},
		},
	});
});

it("uses the detected package manager to run the server", async () => {
	vi.mocked(detectPM).mockResolvedValue("pnpm");
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-pnpm-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync([
		"node",
		"shadcn-svelte",
		"mcp",
		"-c",
		cwd,
		"init",
		"--client",
		"cursor",
	]);

	const config = JSON.parse(await readFile(path.join(cwd, ".cursor/mcp.json"), "utf8"));
	expect(config.mcpServers["shadcn-svelte"]).toEqual({
		command: "pnpm",
		args: ["dlx", "@shadcn-svelte/mcp@latest"],
	});
});

it("runs yarn dlx quietly so its install log stays off the MCP stdout", async () => {
	vi.mocked(detectPM).mockResolvedValue("yarn@berry");
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-yarn-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync([
		"node",
		"shadcn-svelte",
		"mcp",
		"-c",
		cwd,
		"init",
		"--client",
		"cursor",
	]);

	const config = JSON.parse(await readFile(path.join(cwd, ".cursor/mcp.json"), "utf8"));
	expect(config.mcpServers["shadcn-svelte"]).toEqual({
		command: "yarn",
		args: ["dlx", "-q", "@shadcn-svelte/mcp@latest"],
	});
});

it("merges into an existing client config and replaces command arrays", async () => {
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-merge-"));
	await runMcpInit({ client: "opencode", cwd });

	const configPath = path.join(cwd, "opencode.json");
	const existing = JSON.parse(await readFile(configPath, "utf8"));
	existing.mcp.other = { type: "local", command: ["stay"] };
	existing.mcp["shadcn-svelte"].command = ["old"];
	await writeFile(configPath, JSON.stringify(existing));

	await runMcpInit({ client: "opencode", cwd });

	const config = JSON.parse(await readFile(configPath, "utf8"));
	expect(config.mcp.other).toEqual({ type: "local", command: ["stay"] });
	expect(config.mcp["shadcn-svelte"].command).toEqual(["npx", "@shadcn-svelte/mcp@latest"]);
});

it("prints Codex instructions without writing a project config", async () => {
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-codex-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync([
		"node",
		"shadcn-svelte",
		"mcp",
		"-c",
		cwd,
		"init",
		"--client",
		"codex",
	]);

	await expect(readFile(path.join(cwd, ".codex/config.toml"), "utf8")).rejects.toThrow();
	expect(process.exit).toHaveBeenCalledWith(0);
});
