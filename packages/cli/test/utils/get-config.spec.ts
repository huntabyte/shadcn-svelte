import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { getConfig, getRawConfig } from "../../src/utils/get-config";
import { SITE_BASE_URL } from "../../src/constants";

vi.mock("tinyexec");

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

vi.mock("node:fs", async () => {
	return {
		...(await vi.importActual<typeof import("node:fs")>("node:fs")),
		readFileSync: vi.fn(),
	};
});

// gets the raw config from a fixture directory
async function getRaw(fixtureDir: string) {
	return await getRawConfig(resolvePath(`../fixtures/${fixtureDir}`));
}

describe("getRawConfig", () => {
	it("handles cases where no config is present", async () => {
		expect(await getRaw("config-none")).toEqual(null);
	});

	// this case will be more important once we add support for
	// partial configs via tw prefixes, tw vars, etc.
	it("handles cases where a partial config is present", async () => {
		expect(await getRaw("config-partial")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
			},
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles invalid configurations", async () => {
		expect(getRaw("config-invalid")).rejects.toThrowError();
	});
});

// gets the config from a fixture directory
async function getConf(fixtureDir: string) {
	return await getConfig(resolvePath(`../fixtures/${fixtureDir}`));
}

describe("getConfig", () => {
	it("handles cases where no config is present", async () => {
		expect(await getConf("config-none")).toEqual(null);
	});

	// this case will be more important once we add support for
	// partial configs via tw prefixes, tw vars, etc.
	it("handles cases where a partial config is present", async () => {
		expect(await getConf("config-partial")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-partial/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-partial/src/app.css"),
				utils: resolvePath("../fixtures/config-partial/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-partial"),
				hooks: resolvePath("../fixtures/config-partial/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-partial/src/lib/components/ui"),
			},
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where a full config is present", async () => {
		expect(await getConf("config-full")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-full/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-full/src/app.css"),
				utils: resolvePath("../fixtures/config-full/src/lib/utils"),
				cwd: resolvePath("../fixtures/config-full"),
				hooks: resolvePath("../fixtures/config-full/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-full/src/lib/components/ui"),
			},
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where the project is not svelte-kit", async () => {
		expect(await getConf("config-vite")).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				utils: "$lib/utils",
				components: "$lib/components",
				hooks: "$lib/hooks",
				ui: "$lib/components/ui",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-vite/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-vite/src/app.css"),
				utils: resolvePath("../fixtures/config-vite/src/lib/utils"),
				hooks: resolvePath("../fixtures/config-vite/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-vite/src/lib/components/ui"),
				cwd: resolvePath("../fixtures/config-vite"),
			},
			typescript: true,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});

	it("handles cases where the project uses jsconfig.json", async () => {
		const config = await getConf("config-jsconfig");

		expect(config).toEqual({
			tailwind: {
				css: "src/app.css",
				baseColor: "zinc",
			},
			aliases: {
				components: "$lib/components",
				utils: "$lib/utils",
				ui: "$lib/components/ui",
				hooks: "$lib/hooks",
			},
			resolvedPaths: {
				components: resolvePath("../fixtures/config-jsconfig/src/lib/components"),
				tailwindCss: resolvePath("../fixtures/config-jsconfig/src/app.css"),
				utils: resolvePath("../fixtures/config-jsconfig/src/lib/utils"),
				hooks: resolvePath("../fixtures/config-jsconfig/src/lib/hooks"),
				ui: resolvePath("../fixtures/config-jsconfig/src/lib/components/ui"),
				cwd: resolvePath("../fixtures/config-jsconfig"),
			},
			typescript: false,
			registry: `${SITE_BASE_URL}/registry`,
		});
	});
});
