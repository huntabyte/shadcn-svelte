import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import * as p from "@clack/prompts";
import * as jsonc from "jsonc-parser/lib/esm/main.js";
import { Command, Option } from "commander";
import { resolveCommand } from "package-manager-detector";
import { exec } from "tinyexec";
import { z } from "zod";
import { detectPM } from "../../utils/auto-detect.js";
import { highlight } from "../../utils/colors.js";
import { error } from "../../utils/errors.js";
import { getDependencyPackageInfo } from "../../utils/get-package-info.js";
import { handleError, cancel } from "../../utils/prompt-helpers.js";

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
			// Prefer the version installed in the project over the registry's latest.
			const localBin = resolveLocalMcpBin(cwd);
			const run = localBin
				? { command: process.execPath, args: [localBin] }
				: await resolveMcpCommand(cwd);
			const result = await exec(run.command, run.args, {
				nodeOptions: { cwd, stdio: "inherit" },
			});
			process.exit(result.exitCode ?? 1);
		} catch (error) {
			console.error(error instanceof Error ? error.message : error);
			process.exit(1);
		}
	});

mcp
	.command("init")
	.description("Initialize MCP configuration for your client")
	// `--cwd` is defined on `mcp`
	.configureHelp({ showGlobalOptions: true })
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

export async function runMcpInit(options: { client: JsonClientName; cwd: string }) {
	const { client, cwd } = options;
	const clientInfo = CLIENTS[client];
	const configPath = path.join(cwd, clientInfo.configPath);
	let content = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";
	if (!content.trim()) content = "{}";

	// Client configs are often JSONC (e.g. VS Code's `mcp.json`), so refuse to touch files we
	// can't parse, and edit the text in place to keep the user's comments and formatting.
	const errors: jsonc.ParseError[] = [];
	jsonc.parse(content, errors, { allowTrailingComma: true });
	if (errors.length > 0) {
		const { error: code, offset } = errors[0]!;
		const line = content.slice(0, offset).split("\n").length;
		throw error(
			`Failed to parse ${highlight(clientInfo.configPath)} (${jsonc.printParseErrorCode(code)} on line ${line}). Fix the file and try again.`
		);
	}

	// Setting each value individually merges objects and replaces arrays.
	const formattingOptions = { insertSpaces: false };
	const config = buildClientConfig(client, await resolveMcpCommand(cwd));
	for (const [jsonPath, value] of leafPaths(config)) {
		content = jsonc.applyEdits(
			content,
			jsonc.modify(content, jsonPath, value, { formattingOptions })
		);
	}

	fs.mkdirSync(path.dirname(configPath), { recursive: true });
	fs.writeFileSync(configPath, content.endsWith("\n") ? content : content + "\n", "utf8");

	return clientInfo.configPath;
}

function* leafPaths(value: unknown, jsonPath: string[] = []): Generator<[string[], unknown]> {
	if (typeof value === "object" && value !== null && !Array.isArray(value)) {
		for (const [key, child] of Object.entries(value)) {
			yield* leafPaths(child, [...jsonPath, key]);
		}
	} else {
		yield [jsonPath, value];
	}
}

async function resolveMcpCommand(cwd: string) {
	const pm = (await detectPM(cwd, false)) ?? "npm";
	const pkg = `@shadcn-svelte/mcp@${SHADCN_SVELTE_MCP_VERSION}`;
	// `yarn dlx` logs the install to stdout, which corrupts the MCP stdio stream.
	const resolved = resolveCommand(pm, "execute", pm === "yarn@berry" ? ["-q", pkg] : [pkg]);
	if (!resolved) {
		return { command: "npx", args: [pkg] };
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

function resolveLocalMcpBin(cwd: string) {
	const local = getDependencyPackageInfo(cwd, "@shadcn-svelte/mcp");
	if (!local) return undefined;

	// Like `npx @shadcn-svelte/mcp`, run the package's only bin, whatever it's named.
	const { bin } = local.pkg;
	const bins = typeof bin === "string" ? [bin] : Object.values(bin ?? {});
	const [binPath] = bins;
	return bins.length === 1 && binPath ? path.resolve(path.dirname(local.path), binPath) : undefined;
}
