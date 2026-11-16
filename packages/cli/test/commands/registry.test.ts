import path from "node:path";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { exec } from "tinyexec";
import { afterEach, beforeEach, expect, it } from "vitest";

const cli = fileURLToPath(new URL("../../dist/index.mjs", import.meta.url));
let cwd: string;

beforeEach(async () => {
	cwd = await mkdtemp(path.join(tmpdir(), "shadcn-registry-cli-"));
});
afterEach(async () => {
	await rm(cwd, { recursive: true, force: true });
});

function run(...args: string[]) {
	return exec(process.execPath, [cli, ...args], {
		throwOnError: false,
		nodeOptions: {
			cwd,
			timeout: 10_000,
			env: {
				...process.env,
				HTTP_PROXY: undefined,
				HTTPS_PROXY: undefined,
				http_proxy: undefined,
				https_proxy: undefined,
			},
		},
	});
}

async function putJson(file: string, value: unknown) {
	await writeFile(path.join(cwd, file), JSON.stringify(value));
}
async function getJson(file: string) {
	return JSON.parse(await readFile(path.join(cwd, file), "utf8"));
}

it("registers explicit URLs in the correct config, preserving fields and requiring --force to replace mappings", async () => {
	await putJson("package.json", { name: "fixture" });
	const first = "@acme=https://one.example/r/{name}.json";
	const second = "@acme=https://two.example/r/{name}.json";

	expect((await run("registry", "add", first)).exitCode).toBe(0);
	const manifest = { name: "fixture", registries: { "@acme": first.split("=")[1] } };
	expect(await getJson("package.json")).toEqual(manifest);

	expect((await run("registry", "add", second)).exitCode).toBe(1);
	expect(await getJson("package.json")).toEqual(manifest);
	expect((await run("registry", "add", second, "--force")).exitCode).toBe(0);
	expect((await getJson("package.json")).registries["@acme"]).toBe(second.split("=")[1]);

	await putJson("components.json", { style: "nova" });
	expect((await run("registry", "add", first)).exitCode).toBe(0);
	expect(await getJson("components.json")).toEqual({
		style: "nova",
		registries: manifest.registries,
	});
	expect((await getJson("package.json")).registries["@acme"]).toBe(second.split("=")[1]);
});

it("builds include-only registries, preserving nested item paths and relative dependencies", async () => {
	await putJson("package.json", { name: "fixture" });
	await mkdir(path.join(cwd, "forms"));
	await putJson("registry.json", {
		name: "fixture",
		homepage: "https://example.com",
		include: ["forms/registry.json"],
		items: [{ name: "helper", type: "registry:lib", files: [], registryDependencies: [] }],
	});
	await putJson("forms/registry.json", {
		items: [
			{
				name: "forms/login",
				type: "registry:lib",
				registryDependencies: ["local:helper"],
				files: [{ path: "login.ts", type: "registry:lib" }],
			},
		],
	});
	await writeFile(path.join(cwd, "forms/login.ts"), "export const login = true;\n");

	const build = await run("registry", "build", "--output", "./out");
	expect(build.exitCode, build.stdout + build.stderr).toBe(0);
	expect(
		(await getJson("out/registry.json")).items.map((item: { name: string }) => item.name)
	).toEqual(["forms/login", "helper"]);
	expect((await getJson("out/index.json"))[0].relativeUrl).toBe("forms/login.json");

	const view = await run("view", "./out/forms/login.json", "./out/helper.json");
	expect(view.exitCode, view.stdout + view.stderr).toBe(0);
	expect(JSON.parse(view.stdout)).toMatchObject([
		{
			name: "forms/login",
			registryDependencies: ["../helper.json"],
			files: [{ content: "export const login = true;\n" }],
		},
		{ name: "helper" },
	]);

	await putJson("registry.json", {
		name: "fixture",
		homepage: "https://example.com",
		include: ["forms/registry.json"],
	});
	expect((await run("registry", "build", "--output", "./include-only")).exitCode).toBe(0);
	expect((await getJson("include-only/registry.json")).items).toHaveLength(1);
});

it("lists configured and explicit catalogs with pagination and reports failed sources", async () => {
	const server = createServer((req, res) => {
		if (req.url !== "/r/registry.json") return res.writeHead(404).end();
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				items: [
					{ name: "login", title: "Sign in", type: "registry:ui" },
					{ name: "logout", title: "Sign out", type: "registry:ui" },
					{ name: "auth", title: "Sign in helper", type: "registry:lib" },
				],
			})
		);
	});
	await new Promise<void>((resolve, reject) => {
		server.once("error", reject);
		server.listen(0, "127.0.0.1", resolve);
	});
	try {
		const address = server.address();
		if (!address || typeof address === "string") throw new Error("Missing test server address");
		const base = `http://127.0.0.1:${address.port}`;
		await putJson("package.json", {
			registries: { "@acme": `${base}/r/{name}.json`, "@missing": `${base}/missing/{name}.json` },
		});

		const list = await run(
			"list",
			"--type",
			"registry:ui",
			"--query",
			"sign",
			"--limit",
			"1",
			"--offset",
			"1"
		);
		expect(list.exitCode, list.stdout + list.stderr).toBe(0);
		expect(JSON.parse(list.stdout)).toMatchObject({
			items: [{ name: "logout", registry: "@acme" }],
			pagination: { total: 2, offset: 1, limit: 1, hasMore: false },
			errors: [{ registry: "@missing" }],
		});
		const explicit = await run("search", `${base}/r/registry.json`, "--type", "lib");
		expect(explicit.exitCode, explicit.stdout + explicit.stderr).toBe(0);
		expect(JSON.parse(explicit.stdout).items).toMatchObject([{ name: "auth" }]);

		const failed = await run("search", "@missing");
		expect(failed.exitCode).toBe(1);
		expect(JSON.parse(failed.stdout)).toMatchObject({
			items: [],
			errors: [{ registry: "@missing" }],
		});
	} finally {
		server.closeAllConnections();
		await new Promise<void>((resolve, reject) =>
			server.close((error) => (error ? reject(error) : resolve()))
		);
	}
});

it("rejects invalid GitHub registry addresses from the validate command", async () => {
	const result = await run("registry", "validate", "https://example.com/registry.json");
	expect(result.exitCode).toBe(1);
	expect(result.stdout + result.stderr).toContain("Expected owner/repo or owner/repo#ref");
});
