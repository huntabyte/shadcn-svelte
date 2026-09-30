import os from "node:os";
import path from "node:path";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { fileURLToPath } from "node:url";
import { exec } from "tinyexec";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "../../src/utils/config/schema.js";
import type { RegistryItem } from "../../src/utils/registry/schema.js";

const cli = fileURLToPath(new URL("../../dist/index.mjs", import.meta.url));
const component =
	'<script lang="ts">\n  import { label } from "$LIB$/label.js";\n</script>\n\n<p>{label}</p>\n';

describe("add from a private namespaced registry", () => {
	let cwd: string;
	let server: Server;
	let baseUrl: string;
	let requests: Array<{ path: string; authorization?: string; apiKey?: string }>;
	let includePublicDependency: boolean;

	beforeEach(async () => {
		cwd = mkdtempSync(path.join(os.tmpdir(), "shadcn-svelte add-"));
		requests = [];
		includePublicDependency = false;
		server = createServer((req, res) => {
			const url = new URL(req.url!, baseUrl);
			requests.push({
				path: url.pathname,
				authorization: req.headers.authorization,
				apiKey: req.headers["x-api-key"] as string | undefined,
			});
			res.setHeader("Content-Type", "application/json");
			if (
				url.pathname.startsWith("/private/") &&
				(req.headers.authorization !== "Bearer test-token" ||
					url.searchParams.get("key") !== "test-token")
			) {
				res.writeHead(401).end(JSON.stringify({ error: "Unauthorized" }));
				return;
			}
			if (url.pathname.startsWith("/other/") && req.headers["x-api-key"] !== "other-token") {
				res.writeHead(403).end(JSON.stringify({ error: "Forbidden" }));
				return;
			}
			const items: Record<string, RegistryItem> = {
				"/private/nova/card.json": {
					name: "card",
					type: "registry:component",
					files: [
						{ type: "registry:component", target: "private-card.svelte", content: component },
					],
					registryDependencies: ["@other/label", ...(includePublicDependency ? ["button"] : [])],
					dependencies: ["clsx@2.1.1"],
					cssVars: { light: { brand: "red" } },
				},
				"/other/label.json": {
					name: "label",
					type: "registry:lib",
					files: [
						{
							type: "registry:lib",
							target: "label.ts",
							content: 'export const label: string = "Private card";\n',
						},
					],
				},
				"/public/styles/nova/button.json": {
					name: "button",
					type: "registry:ui",
					files: [
						{
							type: "registry:ui",
							target: "button/index.ts",
							content: "export const button = true;\n",
						},
					],
				},
			};
			if (url.pathname === "/public/styles/nova/index.json") {
				res.end(
					JSON.stringify([{ name: "button", type: "registry:ui", relativeUrl: "button.json" }])
				);
			} else if (items[url.pathname]) {
				res.end(JSON.stringify(items[url.pathname]));
			} else {
				res.writeHead(404).end(JSON.stringify({ error: "Not found" }));
			}
		});
		await new Promise<void>((resolve, reject) => {
			server.once("error", reject);
			server.listen(0, "127.0.0.1", resolve);
		});
		const address = server.address();
		if (!address || typeof address === "string") throw new Error("Missing registry server address");
		baseUrl = `http://127.0.0.1:${address.port}`;
	});

	afterEach(async () => {
		server.closeAllConnections();
		await new Promise<void>((resolve, reject) => server.close((e) => (e ? reject(e) : resolve())));
		rmSync(cwd, { recursive: true, force: true });
	});

	function setupProject(typescript = true) {
		mkdirSync(path.join(cwd, "src"), { recursive: true });
		writeFileSync(path.join(cwd, "src/app.css"), '@import "tailwindcss";\n');
		writeFileSync(
			path.join(cwd, "package.json"),
			JSON.stringify({
				name: "registry-test",
				type: "module",
				packageManager: "npm@10.0.0",
				devDependencies: { svelte: "^5.0.0", tailwindcss: "^4.0.0" },
			})
		);
		writeFileSync(
			path.join(cwd, typescript ? "tsconfig.json" : "jsconfig.json"),
			JSON.stringify({
				compilerOptions: { paths: { "@/*": ["./src/*"] } },
			})
		);
		writeFileSync(
			path.join(cwd, "components.json"),
			JSON.stringify(
				{
					...DEFAULT_CONFIG,
					typescript,
					registry: `${baseUrl}/public`,
					aliases: {
						lib: "@/shared",
						components: "@/widgets",
						ui: "@/widgets/ui",
						utils: "@/shared/utils",
						hooks: "@/hooks",
					},
					registries: {
						"@private": {
							url: `${baseUrl}/private/{style}/{name}.json`,
							headers: { Authorization: "Bearer ${SHADCN_TEST_TOKEN}" },
							params: { key: "${SHADCN_TEST_TOKEN}" },
						},
						"@other": {
							url: `${baseUrl}/other/{name}.json`,
							headers: { "X-Api-Key": "other-token" },
						},
					},
				},
				null,
				"\t"
			)
		);
		writeFileSync(path.join(cwd, ".env.local"), "SHADCN_TEST_TOKEN=test-token\n");
	}

	function runAdd() {
		return exec(
			process.execPath,
			[cli, "add", "@private/card", "--cwd", cwd, "--yes", "--overwrite", "--no-deps-install"],
			{
				throwOnError: false,
				nodeOptions: {
					cwd: os.tmpdir(),
					timeout: 10_000,
					env: {
						...process.env,
						SHADCN_TEST_TOKEN: undefined,
						COMPONENTS_REGISTRY_URL: undefined,
						REGISTRY_URL: undefined,
						HTTP_PROXY: undefined,
						HTTPS_PROXY: undefined,
						http_proxy: undefined,
						https_proxy: undefined,
						NO_COLOR: "1",
						FORCE_COLOR: undefined,
					},
				},
			}
		);
	}

	it.each([true, false])("installs with custom aliases and typescript=%s", async (typescript) => {
		setupProject(typescript);
		includePublicDependency = !typescript;
		const originalConfig = readFileSync(path.join(cwd, "components.json"), "utf8");
		const result = await runAdd();
		expect(result.exitCode, result.stdout + result.stderr).toBe(0);
		const installed = readFileSync(path.join(cwd, "src/widgets/private-card.svelte"), "utf8");
		expect(installed).toContain('from "@/shared/label.js"');
		expect(installed).not.toContain("$LIB$");
		const label = readFileSync(
			path.join(cwd, `src/shared/label.${typescript ? "ts" : "js"}`),
			"utf8"
		);
		expect(label).toContain('"Private card"');
		if (!typescript) expect(label).not.toContain(": string");
		expect(readFileSync(path.join(cwd, "src/app.css"), "utf8")).toContain("--brand: red");
		expect(JSON.parse(readFileSync(path.join(cwd, "package.json"), "utf8")).dependencies.clsx).toBe(
			"2.1.1"
		);
		expect(readFileSync(path.join(cwd, "components.json"), "utf8")).toBe(originalConfig);
		expect(result.stdout + result.stderr).not.toContain("test-token");
		if (includePublicDependency) {
			expect(readFileSync(path.join(cwd, "src/widgets/ui/button/index.js"), "utf8")).toContain(
				"button = true"
			);
			for (const request of requests.filter((request) => request.path.startsWith("/public/"))) {
				expect(request.authorization).toBeUndefined();
				expect(request.apiKey).toBeUndefined();
			}
		} else {
			expect(requests.map((request) => request.path)).toEqual([
				"/private/nova/card.json",
				"/other/label.json",
			]);
		}
		writeFileSync(path.join(cwd, "src/widgets/private-card.svelte"), "<p>Modified locally</p>");
		const update = await runAdd();
		expect(update.exitCode, update.stdout + update.stderr).toBe(0);
		expect(readFileSync(path.join(cwd, "src/widgets/private-card.svelte"), "utf8")).toBe(installed);
	});

	it("fails before requesting a registry when a credential is missing", async () => {
		setupProject();
		rmSync(path.join(cwd, ".env.local"));
		const result = await runAdd();
		expect(result.exitCode).toBe(1);
		expect(result.stdout + result.stderr).toContain("SHADCN_TEST_TOKEN");
		expect(requests).toEqual([]);
	});

	it("reports authentication failures without printing credentials", async () => {
		setupProject();
		writeFileSync(path.join(cwd, ".env.local"), "SHADCN_TEST_TOKEN=invalid-private-token\n");
		const result = await runAdd();
		expect(result.exitCode).toBe(1);
		expect(result.stdout + result.stderr).toContain("@private/card: 401");
		expect(result.stdout + result.stderr).not.toContain("invalid-private-token");
		expect(requests).toHaveLength(1);
	});
});
