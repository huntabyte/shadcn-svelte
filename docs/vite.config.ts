import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { toJSONSchema } from "zod/v4";
import { minimatch } from "minimatch";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { registrySchema, registryItemSchema, componentsJsonSchema } from "@shadcn-svelte/registry";
import { build } from "./scripts/build-registry.js";
import { visualizer } from "rollup-plugin-visualizer";
import { enhancedImages } from "@sveltejs/enhanced-img";

// don't build when we're running `vite preview`
if (!process.argv.includes("preview")) {
	console.log("Building registry...");
	writeJsonSchemas();
	await buildRegistry();
	console.log("Registry built.");
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = path.join(__dirname, ".velite");
export const staticDirPath = path.join(__dirname, "src/registry/json");
export const contentDirPath = path.join(__dirname, "content");
export const ogDirPath = path.join(__dirname, "src/routes/og");

export default defineConfig({
	plugins: [
		visualizer({
			emitFile: true,
			filename: "stats.html",
		}),
		tailwindcss(),
		enhancedImages(),
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
			allow: [veliteDirPath, staticDirPath, contentDirPath, ogDirPath],
		},
	},
	build: {
		// minify: false,
		rollupOptions: {
			output: {
				manualChunks: {
					icons: ["@lucide/svelte", "@tabler/icons-svelte"],
				},
			},
		},
	},
	resolve: { external: ["node:dns/promises"], noExternal: true },
});

function writeJsonSchemas() {
	const schemaDir = path.resolve("static", "schema");
	if (!fs.existsSync(schemaDir)) {
		fs.mkdirSync(schemaDir, { recursive: true });
	}

	const componentsJSON = toJSONSchema(componentsJsonSchema);
	fs.writeFileSync(
		path.resolve("static", "schema.json"),
		JSON.stringify(componentsJSON, null, "\t")
	);

	const registry = toJSONSchema(registrySchema);
	fs.writeFileSync(
		path.resolve(schemaDir, "registry.json"),
		JSON.stringify(registry, null, "\t")
	);

	const registryItem = toJSONSchema(registryItemSchema);
	fs.writeFileSync(
		path.resolve(schemaDir, "registry-item.json"),
		JSON.stringify(registryItem, null, "\t")
	);
}

async function buildRegistry() {
	await build();
	execSync("pnpm shadcn-svelte registry build --output static/registry", {
		stdio: ["pipe", "pipe", "inherit"],
	});
	fs.cpSync(path.resolve("static", "registry"), path.resolve("src", "__registry__", "json"), {
		recursive: true,
	});
}
