import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import { createRequire } from "node:module";
import * as p from "@clack/prompts";
import deepmerge from "deepmerge";
import { Command, Option } from "commander";
import { resolveCommand } from "package-manager-detector";
import { z } from "zod";
import { detectPM } from "../utils/auto-detect.js";
import { highlight } from "../utils/colors.js";
import { handleError, cancel } from "../utils/prompt-helpers.js";

const SHADCN_SVELTE_MCP_VERSION = "latest";

const CLIENTS = {
	claude: { label: "Claude Code", configPath: ".mcp.json" },
	cursor: { label: "Cursor", configPath: ".cursor/mcp.json" },
	vscode: { label: "VS Code", configPath: ".vscode/mcp.json" },
	codex: { label: "Codex", configPath: ".codex/config.toml" },
	opencode: { label: "OpenCode", configPath: "opencode.json" },
} as const;

type ClientName = keyof typeof CLIENTS;
type JsonClientName = Exclude<ClientName, "codex">;

const CLIENT_NAMES = Object.keys(CLIENTS) as [ClientName, ...ClientName[]];

const mcpOptionsSchema = z.object({
	cwd: z.string(),
});

const mcpInitOptionsSchema = mcpOptionsSchema.extend({
	client: z.enum(CLIENT_NAMES).optional(),
});

export const mcp = new Command()
	.command("mcp")
	.description("MCP server and configuration commands")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async (opts) => {
		try {
			const options = mcpOptionsSchema.parse(opts);
			const cwd = path.resolve(options.cwd);
			const entry = resolveMcpEntry();
			const child = spawn(process.execPath, [entry], {
				cwd,
				stdio: "inherit",
				env: process.env,
			});

			child.on("error", (error) => {
				console.error(error);
				process.exit(1);
			});
			child.on("exit", (code, signal) => {
				if (signal) {
					process.exit(1);
				}
				process.exit(code ?? 1);
			});
		} catch (error) {
			console.error(error instanceof Error ? error.message : error);
			process.exit(1);
		}
	});

mcp
	.command("init")
	.description("Initialize MCP configuration for your client")
	.addOption(new Option("--client <client>", "MCP client to configure").choices(CLIENT_NAMES))
	.action(async (opts, command) => {
		try {
			const parentOptions = mcpOptionsSchema.parse(command.parent?.opts() ?? {});
			const options = mcpInitOptionsSchema.parse({
				cwd: path.resolve(parentOptions.cwd),
				client: opts.client,
			});

			let client = options.client;
			if (!client) {
				const response = await p.select({
					message: "Which MCP client are you using?",
					options: CLIENT_NAMES.map((name) => ({
						label: CLIENTS[name].label,
						value: name,
					})),
				});

				if (p.isCancel(response)) cancel();

				client = response;
			}

			if (client === "codex") {
				const mcpCommand = await resolveMcpCommand(options.cwd);
				p.log.info("To configure the shadcn-svelte MCP server in Codex:");
				p.log.message(`1. Open or create the file ${highlight("~/.codex/config.toml")}`);
				p.log.message("2. Add the following configuration:");
				p.log.message(formatCodexConfig(mcpCommand));
				p.log.info("3. Restart Codex to load the MCP server");
				process.exit(0);
				return;
			}

			const configSpinner = p.spinner();
			configSpinner.start("Configuring MCP server...");
			const configPath = await runMcpInit({ cwd: options.cwd, client });
			configSpinner.stop("Configuring MCP server.");

			p.log.success(`Configuration saved to ${highlight(configPath)}.`);
		} catch (error) {
			handleError(error);
		}
	});

const overwriteMerge = (_target: unknown[], source: unknown[]) => source;

export async function runMcpInit(options: { client: JsonClientName; cwd: string }) {
	const { client, cwd } = options;
	const clientInfo = CLIENTS[client];
	const configPath = path.join(cwd, clientInfo.configPath);
	const dir = path.dirname(configPath);
	await fs.mkdir(dir, { recursive: true });

	// Handle JSON format.
	let existingConfig = {};
	try {
		const content = await fs.readFile(configPath, "utf-8");
		existingConfig = JSON.parse(content);
	} catch {
		// No existing config.
	}

	const mergedConfig = deepmerge(
		existingConfig,
		buildClientConfig(client, await resolveMcpCommand(cwd)),
		{
			arrayMerge: overwriteMerge,
		}
	);

	await fs.writeFile(configPath, JSON.stringify(mergedConfig, null, 2) + "\n", "utf-8");

	return clientInfo.configPath;
}

async function resolveMcpCommand(cwd: string) {
	const pm = (await detectPM(cwd, false)) ?? "npm";
	const resolved = resolveCommand(pm, "execute", [
		`@shadcn-svelte/mcp@${SHADCN_SVELTE_MCP_VERSION}`,
	]);
	if (!resolved) {
		return {
			command: "npx",
			args: [`@shadcn-svelte/mcp@${SHADCN_SVELTE_MCP_VERSION}`],
		};
	}

	return resolved;
}

function buildClientConfig(
	client: JsonClientName,
	run: { command: string; args: string[] }
): Record<string, unknown> {
	const server = { command: run.command, args: run.args };

	switch (client) {
		case "claude":
		case "cursor":
			return { mcpServers: { "shadcn-svelte": server } };
		case "vscode":
			return { servers: { "shadcn-svelte": server } };
		case "opencode":
			return {
				$schema: "https://opencode.ai/config.json",
				mcp: {
					"shadcn-svelte": {
						type: "local",
						command: [run.command, ...run.args],
						enabled: true,
					},
				},
			};
	}
}

function formatCodexConfig(run: { command: string; args: string[] }) {
	return `[mcp_servers.shadcn-svelte]
command = ${JSON.stringify(run.command)}
args = ${JSON.stringify(run.args)}
`;
}

function resolveMcpEntry() {
	const require = createRequire(import.meta.url);
	return require.resolve("@shadcn-svelte/mcp");
}
