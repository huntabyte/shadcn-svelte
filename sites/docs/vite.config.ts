import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { minimatch } from "minimatch";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { toJsonSchema } from "@valibot/to-json-schema";
import { registrySchema, registryItemSchema } from "@shadcn-svelte/registry";
import { build } from "./scripts/build-registry.js";

console.log("Building registry...");
writeJsonSchemas();
await buildRegistry();
console.log("Registry built.");

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = path.join(__dirname, ".velite");

export default defineConfig({
	plugins: [
		tailwindcss(),
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
	execSync("pnpm shadcn-svelte registry build --output static/registry");
}
