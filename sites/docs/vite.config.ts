import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path, { join } from "node:path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { minimatch } from "minimatch";
import { toJsonSchema } from "@valibot/to-json-schema";
import { registrySchema, registryItemSchema } from "@shadcn-svelte/registry";
import { build } from "./scripts/build-registry.js";
import { execSync } from "node:child_process";

console.log("Building registry...");
writeJsonSchemas();
await buildRegistry();
console.log("Registry built.");

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = join(__dirname, ".velite");

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "registry-builder",
			enforce: "pre",
			async watchChange(id) {
				if (!minimatch(id, "**/src/lib/registry/**")) return;
				this.info("Registry file updated. Rebuilding registry...");
				await buildRegistry();
				this.info("Registry built.");
			},
		},
	],
	server: {
		fs: {
			allow: [veliteDirPath],
		},
	},
});

function writeJsonSchemas() {
	const registry = toJsonSchema(registrySchema);
	const registryItem = toJsonSchema(registryItemSchema);
	const schemaDir = path.resolve("static", "schema");
	if (!fs.existsSync(schemaDir)) {
		fs.mkdirSync(schemaDir, { recursive: true });
	}
	fs.writeFileSync(
		path.resolve(schemaDir, "registry.json"),
		JSON.stringify(registry, null, "\t")
	);
	fs.writeFileSync(
		path.resolve(schemaDir, "registry-item.json"),
		JSON.stringify(registryItem, null, "\t")
	);
}

async function buildRegistry() {
	await build();
	for (const style of ["default", "new-york"]) {
		execSync(
			`pnpm shadcn-svelte registry build ./registry-${style}.json --output static/registry/${style}`
		);
	}
}
