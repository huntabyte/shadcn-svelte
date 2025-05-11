import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { toJsonSchema } from "@valibot/to-json-schema";
import { registrySchema, registryItemSchema } from "@shadcn-svelte/registry";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = path.join(__dirname, ".velite");

writeJsonSchemas();

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
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
