import { describe, expect, it, vi, beforeEach } from "vitest";
import { getConf } from "./test-helpers";
import { ConfigError } from "../../src/utils/errors.js";
import { TW3_SITE_BASE_URL } from "../../src/constants.js";
import { preflightAdd } from "../../src/commands/add/preflight.js";
import { getConfig, writeConfig } from "../../src/utils/get-config.js";
import {
	getProjectPackageInfo,
	getDependencyPackageInfo,
} from "../../src/utils/get-package-info.js";

const resolvedPaths = {
	cwd: "n/a",
	components: "n/a",
	hooks: "n/a",
	lib: "n/a",
	tailwindCss: "n/a",
	ui: "n/a",
	utils: "n/a",
};

const configFull = {
	tailwind: {
		css: "src/app.css",
		baseColor: "zinc",
	},
	aliases: {
		components: "$lib/components",
		utils: "$lib/utils",
		ui: "$lib/components/ui",
		hooks: "$lib/hooks",
		lib: "$lib",
	},
	resolvedPaths,
	typescript: true,
	registry: "https://shadcn-svelte.com/registry",
};

const configLegacy = {
	style: "default",
	tailwind: {
		css: "src/app.css",
		baseColor: "zinc",
	},
	aliases: {
		components: "$lib/components",
		utils: "$lib/utils",
		ui: "$lib/components/ui",
		hooks: "$lib/hooks",
		lib: "$lib",
	},
	resolvedPaths,
	typescript: true,
	registry: "https://shadcn-svelte.com/registry",
};

const configLegacyUpdated = {
	...configLegacy,
	style: undefined,
};

vi.mock("../../src/utils/get-package-info.js");
vi.mock("../../src/utils/utils.js");

vi.mock("../../src/utils/get-config.js", async () => ({
	...(await vi.importActual<typeof import("../../src/utils/get-config.js")>(
		"../../src/utils/get-config.js"
	)),
	writeConfig: vi.fn(),
	getConfig: vi.fn(),
}));

describe("preflightAdd", () => {
	const mockCwd = "/test/cwd";

	beforeEach(() => {
		vi.resetAllMocks();
		vi.mocked(getDependencyPackageInfo).mockReturnValue(undefined);
	});

	it("should throw if config is missing", async () => {
		vi.mocked(getConfig).mockResolvedValueOnce(await getConf("config-none"));

		await expect(preflightAdd(mockCwd)).rejects.toThrow(ConfigError);
		expect(getConfig).toHaveBeenCalledWith(mockCwd);
	});

	it("should pass for Tailwind v4 + Svelte v5", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configFull);

		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		await expect(preflightAdd(mockCwd)).resolves.not.toThrow();
	});

	it("should update legacy config for Tailwind v3 + Svelte v5", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configLegacy);
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		await preflightAdd(mockCwd);

		const expectedConfig = {
			...configLegacy,
			registry: `${TW3_SITE_BASE_URL}/registry/default`,
		};

		expect(writeConfig).toHaveBeenCalledWith(mockCwd, expectedConfig);
	});

	it("should not update config for Tailwind v3 + Svelte v5 if no style field", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configLegacyUpdated);
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		await preflightAdd(mockCwd);

		expect(writeConfig).not.toHaveBeenCalled();
	});

	it("should throw for incompatible versions", async () => {
		const testCases = [
			{ tailwindcss: "2.0.0", svelte: "5.0.0" },
			{ tailwindcss: "4.0.0", svelte: "4.0.0" },
			{ tailwindcss: "3.0.0", svelte: "4.0.0" },
			{ tailwindcss: "5.0.0", svelte: "5.0.0" },
		];

		for (const deps of testCases) {
			// @ts-expect-error - we're mocking the config
			vi.mocked(getConfig).mockResolvedValue({ ...configFull, resolvedPaths });
			vi.mocked(getProjectPackageInfo).mockReturnValue({
				dependencies: deps,
				devDependencies: {},
			});

			await expect(preflightAdd(mockCwd)).rejects.toThrow(
				"requires Tailwind CSS (v3 or v4) and Svelte v5"
			);
		}
	});
});
