import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as p from "@clack/prompts";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Command } from "commander";
import { detectPM } from "../utils/auto-detect.js";
import { highlight } from "../utils/colors.js";
import { handleError } from "../utils/prompt-helpers.js";
import { server } from "../mcp/index.js";
import { resolveCommand } from "package-manager-detector";
import { exec } from "tinyexec";
import { z } from "zod";

const SHADCN_SVELTE_MCP_VERSION = "latest";

const CLIENTS = [
	{
		name: "claude",
		label: "Claude Code",
		configPath: ".mcp.json",
		config: {
			mcpServers: {
				"shadcn-svelte": {
					command: "npx",
					args: [`shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}`, "mcp"],
				},
			},
		},
	},
	{
		name: "cursor",
		label: "Cursor",
		configPath: ".cursor/mcp.json",
		config: {
			mcpServers: {
				"shadcn-svelte": {
					command: "npx",
					args: [`shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}`, "mcp"],
				},
			},
		},
	},
	{
		name: "vscode",
		label: "VS Code",
		configPath: ".vscode/mcp.json",
		config: {
			servers: {
				"shadcn-svelte": {
					command: "npx",
					args: [`shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}`, "mcp"],
				},
			},
		},
	},
	{
		name: "codex",
		label: "Codex",
		configPath: ".codex/config.toml",
		config: `[mcp_servers.shadcn-svelte]
command = "npx"
args = ["shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}", "mcp"]
`,
	},
	{
		name: "opencode",
		label: "OpenCode",
		configPath: "opencode.json",
		config: {
			$schema: "https://opencode.ai/config.json",
			mcp: {
				"shadcn-svelte": {
					type: "local",
					command: ["npx", `shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}`, "mcp"],
					enabled: true,
				},
			},
		},
	},
] as const;

const DEPENDENCIES = [`shadcn-svelte@${SHADCN_SVELTE_MCP_VERSION}`];

const mcpInitOptionsSchema = z.object({
	client: z.enum(["claude", "cursor", "vscode", "codex", "opencode"]),
	cwd: z.string(),
});

export const mcp = new Command()
	.command("mcp")
	.description("MCP server and configuration commands")
	.option("-c, --cwd <path>", "the working directory", process.cwd())
	.action(async (options) => {
		try {
			process.chdir(path.resolve(options.cwd));
			const transport = new StdioServerTransport();
			await server.connect(transport);
		} catch (error) {
			handleError(error);
		}
	});

mcp.command("init")
	.description("initialize MCP configuration for your client")
	.option("--client <client>", `MCP client (${CLIENTS.map((client) => client.name).join(", ")})`)
	.action(async (opts, command) => {
		try {
			const parentOpts = command.parent?.opts() ?? {};
			const cwd = path.resolve(parentOpts.cwd ?? process.cwd());
			let client = opts.client;

			if (!client) {
				const response = await p.select({
					message: "Which MCP client are you using?",
					options: CLIENTS.map((client) => ({
						label: client.label,
						value: client.name,
					})),
				});

				if (p.isCancel(response)) {
					p.cancel("Operation cancelled.");
					process.exit(0);
				}

				client = response;
			}

			const options = mcpInitOptionsSchema.parse({ client, cwd });

			if (options.client === "codex") {
				await installDependencies(options.cwd);
				p.log.info(
					`Add the following configuration to ${highlight("~/.codex/config.toml")}:`
				);
				p.log.message(CLIENTS.find((client) => client.name === "codex")!.config);
				p.log.info("Restart Codex to load the MCP server.");
				process.exit(0);
			}

			const configPath = await runMcpInit(options);
			await installDependencies(options.cwd);

			p.log.success(`Configuration saved to ${highlight(configPath)}.`);
		} catch (error) {
			handleError(error);
		}
	});

async function runMcpInit(options: z.infer<typeof mcpInitOptionsSchema>) {
	const clientInfo = CLIENTS.find((client) => client.name === options.client);
	if (!clientInfo) {
		throw new Error(`Unknown MCP client: ${options.client}.`);
	}

	const configPath = path.join(options.cwd, clientInfo.configPath);
	await fs.mkdir(path.dirname(configPath), { recursive: true });

	let output: string;
	if (typeof clientInfo.config === "string") {
		output = clientInfo.config;
	} else {
		const existingConfig = await (async () => {
			try {
				const content = await fs.readFile(configPath, "utf8");
				return JSON.parse(content);
			} catch {
				return {};
			}
		})();

		output = `${JSON.stringify(mergeConfig(existingConfig, clientInfo.config), null, "\t")}\n`;
	}

	await fs.writeFile(configPath, output, "utf8");
	return clientInfo.configPath;
}

function mergeConfig(target: unknown, source: unknown): unknown {
	if (Array.isArray(source)) return source;
	if (!isRecord(target) || !isRecord(source)) return source;

	return Object.entries(source).reduce<Record<string, unknown>>(
		(acc, [key, value]) => {
			acc[key] = key in acc ? mergeConfig(acc[key], value) : value;
			return acc;
		},
		{ ...target }
	);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function installDependencies(cwd: string) {
	const pm = await detectPM(cwd, false);
	if (!pm) return;

	const addDevDeps = resolveCommand(pm, "add", ["-D", ...DEPENDENCIES]);
	if (!addDevDeps) return;

	const task = p.taskLog({
		title: `Installing dependencies with ${pm}...`,
		limit: Math.ceil((process.stdout.rows ?? 20) / 2),
		spacing: 0,
		retainLog: true,
	});

	try {
		const proc = exec(addDevDeps.command, addDevDeps.args, {
			throwOnError: true,
			nodeOptions: { cwd },
		});

		proc.process?.stdout?.on("data", (data) => task.message(data.toString(), { raw: true }));
		proc.process?.stderr?.on("data", (data) => task.message(data.toString(), { raw: true }));

		await proc;
		task.success("Successfully installed dependencies");
	} catch {
		task.error("Failed to install dependencies");
		p.cancel("Operation failed.");
		process.exit(2);
	}
}
