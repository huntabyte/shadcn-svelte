import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { EventEmitter } from "node:events";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { Command } from "commander";
import { afterEach, expect, it, vi } from "vitest";
import { mcp, runMcpInit } from "../../src/commands/mcp.js";
import { detectPM } from "../../src/utils/auto-detect.js";

vi.mock("node:child_process", () => ({
	spawn: vi.fn(() => {
		const child = new EventEmitter() as EventEmitter & { kill: ReturnType<typeof vi.fn> };
		child.kill = vi.fn();
		queueMicrotask(() => child.emit("exit", 0, null));
		return child;
	}),
}));

vi.mock("../../src/utils/auto-detect.js", () => ({
	detectPM: vi.fn(async () => undefined),
}));

vi.spyOn(process, "exit").mockImplementation(() => undefined as never);

afterEach(() => {
	vi.mocked(spawn).mockClear();
	vi.mocked(detectPM).mockReset();
	vi.mocked(detectPM).mockResolvedValue(undefined);
	vi.mocked(process.exit).mockClear();
});

it("shells out to @shadcn-svelte/mcp in the requested directory", async () => {
	const cwd = await mkdtemp(path.join(tmpdir(), "shadcn-svelte-mcp-"));
	const program = new Command();
	program.addCommand(mcp);

	await program.parseAsync(["node", "shadcn-svelte", "mcp", "-c", cwd]);

	const require = createRequire(import.meta.url);
	expect(spawn).toHaveBeenCalledWith(process.execPath, [require.resolve("@shadcn-svelte/mcp")], {
		cwd: path.resolve(cwd),
		stdio: "inherit",
		env: process.env,
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
