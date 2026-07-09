import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { enhancedImages } from "@sveltejs/enhanced-img";

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
		noExternal: [
			"@dnd-kit-svelte/svelte",
			"@dnd-kit/abstract",
			"@dnd-kit/collision",
			"@dnd-kit/helpers",
			"@hugeicons/core-free-icons",
			"@hugeicons/svelte",
			"@internationalized/date",
			"@lucide/svelte",
			"@sveltejs/kit",
			"@tabler/icons-svelte",
			"bits-ui",
			"clsx",
			"d3-scale",
			"d3-shape",
			"formsnap",
			"layerchart",
			"mode-watcher",
			"package-manager-detector",
			"paneforge",
			"phosphor-svelte",
			"qrcode",
			"remixicon-svelte",
			"runed",
			"svelte-toolbelt",
			"sveltekit-superforms",
			"tailwind-merge",
			"tailwind-variants",
			"vaul-svelte",
			"zod",
		],
	},
});
