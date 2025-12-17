import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts", "src/icons/index.ts"],
	format: ["esm"],
	target: "es2022",
	outDir: "dist",
	dts: true
});
