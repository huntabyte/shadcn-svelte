import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import packageJson from "./package.json" with { type: "json" };

// NOTE: the registry (`static/registry`, `src/__registry__`) is intentionally NOT built here.
// Building it during config load costs ~15s on every server (re)start, and importing the
// build script from the config makes every source file it touches a "config dependency"
// that restarts the whole dev server on change. Run `pnpm build:registry` (done by
// `pnpm sync` / `pnpm build`) or `pnpm dev`, which runs `dev:registry` in watch mode.

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = path.join(__dirname, ".velite");
export const staticDirPath = path.join(__dirname, "src/registry/json");
export const contentDirPath = path.join(__dirname, "content");
export const ogDirPath = path.join(__dirname, "src/routes/og");

export default defineConfig({
	resolve: {
		// Use the browser implementation everywhere so SSR/Workers bundles avoid the Node
		// `canvas` server build (main → lib/server) and so `qrcode` can be inlined into
		// the Cloudflare worker instead of remaining a bare external import.
		alias: {
			qrcode: "qrcode/lib/browser.js",
		},
	},
	plugins: [
		!process.env.CI &&
			visualizer({
				emitFile: true,
				filename: "stats.html",
			}),
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
	],
	server: {
		fs: {
			allow: [veliteDirPath, staticDirPath, contentDirPath, ogDirPath],
		},
	},
	build: {
		// minify: false,
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{
							test: /node_modules\/@lucide\/svelte/,
							name: "lucide-icons",
						},
						{
							test: /node_modules\/@tabler\/icons-svelte/,
							name: "tabler-icons",
						},
						{
							test: /node_modules\/@hugeicons\/svelte/,
							name: "hugeicons",
						},
						{
							test: /node_modules\/@hugeicons\/core-free-icons/,
							name: "hugeicons-core-free-icons",
						},
						{
							test: /node_modules\/phosphor-svelte/,
							name: "phosphor-icons",
						},
						{
							test: /node_modules\/remixicon-svelte/,
							name: "remixicon-icons",
						},
					],
				},
			},
		},
	},
	ssr: {
		noExternal: Object.keys(packageJson.devDependencies),
	},
});
