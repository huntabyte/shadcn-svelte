import fs from "node:fs";
import path from "node:path";
import { it, expect } from "vitest";
import { resolveItemFilePath } from "../src/utils/registry/index.js";
import type { ResolvedConfig } from "../src/utils/config/index.js";
import type { RegistryItem } from "../src/utils/registry/schema.js";

it("should install the complex-component page at the pokemon route", () => {
	const registryPath = path.resolve(
		import.meta.dirname,
		"../../../sv-addons/registry/demo/static/r/complex-component.json"
	);
	const item: RegistryItem = JSON.parse(fs.readFileSync(registryPath, "utf8"));
	const page = item.files!.find((file) => file.type === "registry:page")!;
	const cwd = path.resolve("/registry-consumer");
	const config = { sveltekit: true, resolvedPaths: { cwd } } as ResolvedConfig;
	expect(resolveItemFilePath(config, item, page)).toBe(
		path.resolve(cwd, "src/routes/pokemon/+page.svelte")
	);
});
