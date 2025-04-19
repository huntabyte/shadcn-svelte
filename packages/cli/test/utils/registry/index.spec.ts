import path from "node:path";
import { describe, expect, it } from "vitest";
import { getItemTargetPath } from "../../../src/utils/registry/index";
import { SITE_BASE_URL } from "../../../src/constants";

const config = {
	style: "new-york",
	tailwind: {
		config: "tailwind.config.js",
		css: "src/app.pcss",
		baseColor: "zinc",
	},
	aliases: {
		utils: "$lib/utils",
		components: "$lib/components",
		hooks: "$lib/hooks",
		ui: "$lib/components/ui",
	},
	// not how they will look in the end but works for the tests
	resolvedPaths: {
		components: "./src/lib/components",
		tailwindConfig: "./tailwind.config.js",
		tailwindCss: "./src/app.pcss",
		utils: "./src/lib/utils",
		cwd: "./",
		hooks: "./src/lib/hooks",
		ui: "./src/lib/components/ui",
	},
	typescript: true,
	registry: `${SITE_BASE_URL}/registry`,
};

describe("getItemTargetPath", () => {
	it("returns null if invalid type missing `:`", async () => {
		expect(
			getItemTargetPath(config, {
				name: "label",
				dependencies: ["bits-ui@next"],
				registryDependencies: [],
				files: [
					//... snip this since it doesn't matter
				],
				// @ts-expect-error Comes from over the wire in prod
				type: "registry",
			})
		).toEqual(null);
	});

	it("returns null if `item.type` has invalid `:<type>`", async () => {
		expect(
			getItemTargetPath(config, {
				name: "label",
				dependencies: ["bits-ui@next"],
				registryDependencies: [],
				files: [
					//... snip this since it doesn't matter
				],
				// @ts-expect-error Comes from over the wire in prod
				type: "registry:foo",
			})
		).toEqual(null);
	});

	it("disallows overrides for `registry:ui`", async () => {
		expect(
			getItemTargetPath(
				config,
				{
					name: "label",
					dependencies: ["bits-ui@next"],
					registryDependencies: [],
					files: [
						//... snip this since it doesn't matter
					],
					type: "registry:ui",
				},
				"./override-path"
			)
		).toEqual(path.join("src", "lib", "components", "ui"));
	});

	it("resolves item target path", async () => {
		expect(
			getItemTargetPath(config, {
				name: "label",
				dependencies: ["bits-ui@next"],
				registryDependencies: [],
				files: [
					//... snip this since it doesn't matter
				],
				type: "registry:ui",
			})
		).toEqual(path.join("src", "lib", "components", "ui"));
	});
});
