import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { injectStyleClasses, parseStyleCss } from "@shadcn-svelte/parity/inject-style-classes";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type Plugin } from "vite";
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

/**
 * Serve docs examples and blocks with *flattened* UI components, with the `cn-*` classes already
 * replaced by the docs style's utilities, instead of the raw `src/lib/registry/ui` source.
 *
 * The raw components lean on the stylesheet (loaded in the `base` layer, e.g. `cn-*` classes) to finish their
 * styling. A stylesheet rule can never beat a tailwind utility that the component sets itself (e.g.
 * `sm:min-h-8` from the stylesheet loses to `min-h-11` that's defined on the component). Users never hit this
 * because the CLI resolves those classes at install time. This gives the docs the same output.
 *
 * The flattening occurs in memory. A docs-side import of a UI component resolves to the same
 * file with a `?flattened=<style>` query, which `load` serves with the classes injected. Keeping
 * the real path in the id means Vite groups it with the raw module, so editing a component
 * hot-updates both variants, and relative imports inside the component keep working.
 *
 * The Tailwind plugin only scans files on disk for class candidates, so the injected utilities need to
 * exist somewhere scannable. Fortunately, the flattened sources are written to disk via the published registry
 * in `static/registry`, which _is_ tracked by Tailwind.
 *
 * The `/create` and `/preview` routes switch styles with CSS and keep using the raw source.
 */
function flattenedRegistry(): Plugin {
	// Keep in sync with the style loaded by `app.css` and set on `<body>` in `app.html`.
	const STYLE = "nova";
	const QUERY = "flattened";
	const rawUiDir = path.join(__dirname, "src/lib/registry/ui");
	const styleCssPath = path.join(__dirname, `src/lib/registry/styles/style-${STYLE}.css`);
	const flattenedImporters = [
		path.join(__dirname, "src/lib/registry/examples"),
		path.join(__dirname, "src/lib/registry/blocks"),
		path.join(__dirname, "content"),
	];
	const rawImporters = [path.join(__dirname, "src/lib/registry/examples/create")];
	const TEXT_EXTENSIONS = new Set([".svelte", ".ts", ".js"]);

	const within = (file: string, dirs: string[]) =>
		dirs.some((dir) => file === dir || file.startsWith(dir + path.sep));
	const splitId = (id: string) => {
		const [file, query] = id.split("?", 2);
		return { file: path.normalize(file!), params: new URLSearchParams(query ?? "") };
	};
	const isFlattened = (id: string) => splitId(id).params.has(QUERY);
	const withQuery = (id: string) => {
		const { file, params } = splitId(id);
		params.set(QUERY, STYLE);
		return `${file}?${params}`;
	};

	let styleMap: Record<string, string> | undefined;
	const getStyleMap = () => (styleMap ??= parseStyleCss(fs.readFileSync(styleCssPath, "utf8")));

	return {
		name: "shadcn-svelte:flattened-registry",
		enforce: "pre",
		async resolveId(source, importer, options) {
			if (!importer) return null;
			// The dependency scanner loads what it resolves straight from disk, where the queried id
			// doesn't exist. It only looks for bare imports, which are the same in both variants.
			if ((options as { scan?: boolean }).scan) return null;
			// Note: Vite passes `scan: true` here ^^ at runtime but only types it on the internal plugin
			// container's options, not on the public hook signature.
			const importerIsFlattened = isFlattened(importer);
			const importerFile = splitId(importer).file;
			if (
				!importerIsFlattened &&
				(within(importerFile, rawImporters) || !within(importerFile, flattenedImporters))
			) {
				return null;
			}
			// Resolve against the real file so relative imports from a flattened module work.
			const resolved = await this.resolve(source, importerIsFlattened ? importerFile : importer, {
				skipSelf: true,
			});
			if (!resolved || resolved.external || isFlattened(resolved.id)) return resolved;
			if (!within(splitId(resolved.id).file, [rawUiDir])) return resolved;
			return { ...resolved, id: withQuery(resolved.id) };
		},
		load(id) {
			if (!isFlattened(id)) return null;
			const { file } = splitId(id);
			const content = fs.readFileSync(file, "utf8");
			return TEXT_EXTENSIONS.has(path.extname(file))
				? injectStyleClasses(content, getStyleMap())
				: content;
		},
		hotUpdate({ file }) {
			if (path.normalize(file) !== styleCssPath) return;
			styleMap = undefined;
			for (const mod of this.environment.moduleGraph.idToModuleMap.values()) {
				if (mod.id && isFlattened(mod.id)) this.environment.moduleGraph.invalidateModule(mod);
			}
			this.environment.hot.send({ type: "full-reload" });
			return [];
		},
	};
}

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
		!process.env.CI && visualizer({ emitFile: true, filename: "stats.html" }),
		flattenedRegistry(),
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
