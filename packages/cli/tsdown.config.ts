import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts", "src/icons/index.ts"],
	target: "es2022",
	dts: true,
});
