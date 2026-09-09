import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts", "src/compare.ts", "src/parity-ignore.ts", "src/inject-style-classes.ts"],
	target: "es2022",
	dts: true,
});
