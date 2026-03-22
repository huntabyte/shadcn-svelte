import fs from "node:fs";
import path from "node:path";
import { server } from "../../mcp/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Command } from "commander";
import * as p from "@clack/prompts";
import { cancel } from "../../utils/prompt-helpers.js";
import deepmerge from "deepmerge";

const SHADCN_MCP_VERSION = "latest";

const CLIENTS = [
	{
		name: "claude",
		label: "Claude Code",
		configPath: ".mcp.json",
		config: {
			mcpServers: {
				"shadcn-svelte": {
					command: "npx",
					args: [`shadcn-svelte@${SHADCN_MCP_VERSION}`, "mcp"],
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
					args: [`shadcn-svelte@${SHADCN_MCP_VERSION}`, "mcp"],
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
					args: [`shadcn-svelte@${SHADCN_MCP_VERSION}`, "mcp"],
				},
			},
		},
	},
	{
		name: "codex",
		label: "Codex",
		configPath: ".codex/config.toml",
		toml: `[mcp_servers.shadcn-svelte]
command = "npx"
args = ["shadcn-svelte@${SHADCN_MCP_VERSION}", "mcp"]
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
					command: ["npx", `shadcn-svelte@${SHADCN_MCP_VERSION}`, "mcp"],
					enabled: true,
				},
			},
		},
	},
] as const;

export const mcp = new Command()
	.name("mcp")
	.description("MCP server and configuration commands")
	.option(
		"-c, --cwd <cwd>",
		"the working directory. defaults to the current directory.",
		process.cwd()
	)
	.action(async () => {
		const transport = new StdioServerTransport();
		await server.connect(transport);
	});

mcp
	.command("init")
	.description("Initialize MCP configuration for your editor")
	.option(
		"--client <client>",
		`MCP client (${CLIENTS.map((c) => c.name).join(", ")})`
	)
	.action(async (opts, command) => {
		const parentOpts = command.parent?.opts() ?? {};
		const cwd: string = parentOpts.cwd ?? process.cwd();

		let client = opts.client;

		if (!client) {
			const response = await p.select({
				message: "Which MCP client are you using?",
				options: CLIENTS.map((c) => ({
					label: c.label,
					value: c.name,
				})),
			});

			if (p.isCancel(response)) {
				cancel();
				return;
			}

			client = response;
		}

		const clientInfo = CLIENTS.find((c) => c.name === client);
		if (!clientInfo) {
			p.log.error(
				`Unknown client: ${client}. Available clients: ${CLIENTS.map((c) => c.name).join(", ")}`
			);
			process.exit(1);
		}

		// Handle TOML format (Codex)
		if ("toml" in clientInfo) {
			p.log.info("To configure the shadcn-svelte MCP server in Codex:");
			p.log.message("");
			p.log.message(`1. Open or create the file ~/.codex/config.toml`);
			p.log.message("2. Add the following configuration:");
			p.log.message("");
			p.log.message(clientInfo.toml);
			p.log.message("");
			p.log.message("3. Restart Codex to load the MCP server");
			process.exit(0);
		}

		const configPath = path.resolve(cwd, clientInfo.configPath);
		const dir = path.dirname(configPath);

		// Ensure directory exists
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		// Read existing config if it exists
		let existingConfig = {};
		try {
			const content = fs.readFileSync(configPath, "utf-8");
			existingConfig = JSON.parse(content);
		} catch {
			// No existing config, that's fine
		}

		// Merge configs
		const overwriteMerge = (_: unknown[], sourceArray: unknown[]) => sourceArray;
		const mergedConfig = deepmerge(
			existingConfig,
			clientInfo.config as Record<string, unknown>,
			{ arrayMerge: overwriteMerge }
		);

		fs.writeFileSync(
			configPath,
			JSON.stringify(mergedConfig, null, 2) + "\n",
			"utf-8"
		);

		p.log.success(`Configuration saved to ${clientInfo.configPath}`);
	});
