import * as fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { expect, it } from "vitest";

const run = promisify(execFile);
const cli = fileURLToPath(new URL("../../dist/index.mjs", import.meta.url));

it("preserves the RTL output from add when updating a component", async () => {
	const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-rtl-update-"));
	const type = "registry:ui";
	const target = "breadcrumb/breadcrumb.svelte";
	const name = "breadcrumb";
	let content = '<span class="cn-rtl-flip ml-2">Original</span>';
	const server = createServer((req, res) => {
		res.setHeader("Content-Type", "application/json");
		switch (req.url) {
			case "/index.json":
				res.end(JSON.stringify([{ name, type, relativeUrl: "breadcrumb.json" }]));
				break;
			case "/breadcrumb.json":
				res.end(JSON.stringify({ name, type, files: [{ type, target, content }] }));
				break;
			default:
				res.writeHead(404).end();
		}
	});

	try {
		server.listen(0, "127.0.0.1");
		await once(server, "listening");
		const address = server.address();
		if (!address || typeof address === "string") throw new Error("Missing test registry port");
		const env = { ...process.env, COMPONENTS_REGISTRY_URL: `http://127.0.0.1:${address.port}` };
		await fs.writeFile(
			path.join(cwd, "package.json"),
			JSON.stringify({ devDependencies: { svelte: "^5.0.0", tailwindcss: "^4.0.0" } })
		);
		await fs.writeFile(
			path.join(cwd, "components.json"),
			JSON.stringify({
				tailwind: { css: "src/app.css", baseColor: "zinc" },
				aliases: { components: "$lib/components", utils: "$lib/utils", ui: "$lib/components/ui" },
				rtl: true,
			})
		);
		await fs.writeFile(
			path.join(cwd, "tsconfig.json"),
			JSON.stringify({ compilerOptions: { baseUrl: ".", paths: { "$lib/*": ["src/lib/*"] } } })
		);
		const args = [name, "--cwd", cwd, "--yes", "--no-deps"];
		const file = path.join(cwd, "src/lib/components/ui", target);
		await run(process.execPath, [cli, "add", ...args], { env });
		const added = await fs.readFile(file, "utf8");
		expect(added).toBe('<span class="rtl:rotate-180 ms-2">Original</span>');

		content = content.replace("Original", "Updated");
		await run(process.execPath, [cli, "update", ...args], { env });
		expect(await fs.readFile(file, "utf8")).toBe(added.replace("Original", "Updated"));
	} finally {
		await Promise.all([
			new Promise<void>((resolve) => server.close(() => resolve())),
			fs.rm(cwd, { recursive: true, force: true }),
		]);
	}
}, 15_000);
