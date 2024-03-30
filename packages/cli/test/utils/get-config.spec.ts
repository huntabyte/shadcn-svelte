import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { getConfig, getRawConfig } from "../../src/utils/get-config";

vi.mock("execa");

vi.mock("node:fs", async () => {
	return {
		...(await vi.importActual<typeof import("node:fs")>("node:fs")),
		readFileSync: vi.fn(),
	};
});

// gets the raw config from a fixture directory
async function getRaw(fixtureDir: string) {
	return await getRawConfig(path.resolve(__dirname, `../fixtures/${fixtureDir}`));
}

describe("getRawConfig", () => {
	it("handles cases where no config is present", async () => {
		expect(await getRaw("config-none")).toEqual(null);
	});

	// this case will be more important once we add support for
	// partial configs via tw prefixes, tw vars, etc.
	it("handles cases where a partial config is present", async () => {
		expect(await getRaw("config-partial")).toEqual({
			style: "new-york",
			tailwind: {
				config: "tailwind.config.js",
				css: "src/app.pcss",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
			},
			typescript: true,
		});
	});

	it("handles invalid configurations", async () => {
		expect(getRaw("config-invalid")).rejects.toThrowError();
	});
});

// gets the config from a fixture directory
async function getConf(fixtureDir: string) {
	return await getConfig(path.resolve(__dirname, `../fixtures/${fixtureDir}`));
}

describe("getConfig", () => {
	it("handles cases where no config is present", async () => {
		expect(await getConf("config-none")).toEqual(null);
	});

	// this case will be more important once we add support for
	// partial configs via tw prefixes, tw vars, etc.
	it("handles cases where a partial config is present", async () => {
		expect(await getConf("config-partial")).toEqual({
			style: "new-york",
			tailwind: {
				config: "tailwind.config.js",
				css: "src/app.pcss",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
			},
			resolvedPaths: {
				components: path.resolve(__dirname, "../fixtures/config-partial", "./src/lib/components"),
				tailwindConfig: path.resolve(
					__dirname,
					"../fixtures/config-partial",
					"./tailwind.config.js"
				),
				tailwindCss: path.resolve(__dirname, "../fixtures/config-partial", "./src/app.pcss"),
				utils: path.resolve(__dirname, "../fixtures/config-partial", "./src/lib/utils"),
			},
			typescript: true,
		});
	});

	it("handles cases where a full config is present", async () => {
		expect(await getConf("config-full")).toEqual({
			style: "new-york",
			tailwind: {
				config: "tailwind.config.js",
				css: "src/app.pcss",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
			},
			resolvedPaths: {
				components: path.resolve(__dirname, "../fixtures/config-full", "./src/lib/components"),
				tailwindConfig: path.resolve(__dirname, "../fixtures/config-full", "./tailwind.config.js"),
				tailwindCss: path.resolve(__dirname, "../fixtures/config-full", "./src/app.pcss"),
				utils: path.resolve(__dirname, "../fixtures/config-full", "./src/lib/utils"),
			},
			typescript: true,
		});
	});

	it("handles cases where the project is not svelte-kit", async () => {
		expect(await getConf("config-vite")).toEqual({
			style: "new-york",
			tailwind: {
				config: "tailwind.config.js",
				css: "src/app.pcss",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
			},
			resolvedPaths: {
				components: path.resolve(__dirname, "../fixtures/config-vite", "./src/lib/components"),
				tailwindConfig: path.resolve(__dirname, "../fixtures/config-vite", "./tailwind.config.js"),
				tailwindCss: path.resolve(__dirname, "../fixtures/config-vite", "./src/app.pcss"),
				utils: path.resolve(__dirname, "../fixtures/config-vite", "./src/lib/utils"),
			},
			typescript: true,
		});
	});

	it("handles cases where the project uses jsconfig.json", async () => {
		expect(await getConf("config-jsconfig")).toEqual({
			style: "new-york",
			tailwind: {
				config: "tailwind.config.js",
				css: "src/app.pcss",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
			},
			resolvedPaths: {
				components: path.resolve(__dirname, "../fixtures/config-jsconfig", "./src/lib/components"),
				tailwindConfig: path.resolve(
					__dirname,
					"../fixtures/config-jsconfig",
					"./tailwind.config.js"
				),
				tailwindCss: path.resolve(__dirname, "../fixtures/config-jsconfig", "./src/app.pcss"),
				utils: path.resolve(__dirname, "../fixtures/config-jsconfig", "./src/lib/utils"),
			},
			typescript: false,
		});
	});
});
