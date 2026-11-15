import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import {
	injectStyleClasses,
	parseStyleCss,
	toTailwindArbitraryCalc,
} from "@shadcn-svelte/parity/inject-style-classes";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { applyRtlMapping, transformDirection } from "shadcn-svelte/transformers/rtl";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));
const lib = path.resolve(root, "../../src/lib");
const styles = parseStyleCss(
	fs.readFileSync(path.join(lib, "registry/styles/style-nova.css"), "utf8")
);
export default defineConfig({
	root,
	build: { outDir: path.resolve(root, "../../.generated/rtl-test-build"), emptyOutDir: true },
	optimizeDeps: { exclude: ["@tanstack/svelte-table"] },
	resolve: { alias: { $lib: lib }, dedupe: ["svelte"] },
	plugins: [
		{
			name: "rtl-registry-fixture",
			enforce: "pre",
			resolveId(source) {
				if (source.includes("icon-placeholder.svelte"))
					return path.join(root, "fixtures/icon.svelte");
			},
			transform(code, id) {
				if (id === path.join(root, "style.css")) {
					return (
						code +
						`\n@source inline(${JSON.stringify(applyRtlMapping(toTailwindArbitraryCalc(Object.values(styles).join(" ") + " cn-rtl-flip")))});`
					);
				}
				if (id.startsWith(path.join(lib, "registry/ui/")) && /\.(svelte|ts)$/.test(id)) {
					return transformDirection(injectStyleClasses(code, styles), id);
				}
			},
		},
		svelte({ configFile: false }),
		tailwindcss(),
	],
});
