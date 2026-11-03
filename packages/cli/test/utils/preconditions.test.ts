import { describe, expect, it, vi, beforeEach } from "vitest";
import * as project from "../../src/utils/project.js";
import { TW3_SITE_BASE_URL } from "../../src/constants.js";
import { getConfig, writeConfig } from "../../src/utils/config/index.js";
import { checkPreconditions } from "../../src/utils/preconditions.js";

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

vi.mock("../../src/utils/project.js");

vi.mock("../../src/utils/config/index.js", async () => ({
	...(await vi.importActual<typeof import("../../src/utils/config/index.js")>(
		"../../src/utils/config/index.js"
	)),
	writeConfig: vi.fn(),
	getConfig: vi.fn(),
}));

function mockVersions(versions: Record<string, string>) {
	vi.mocked(project.getPackageVersion).mockImplementation((_cwd, name) => versions[name]);
}

describe("checkPreconditions", () => {
	const mockCwd = "/test/cwd";

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should pass for Tailwind v4 + Svelte v5", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configFull);

		mockVersions({
			tailwindcss: "4.0.0",
			svelte: "5.0.0",
		});

		const config = (await getConfig(mockCwd))!;

		expect(() => checkPreconditions({ cwd: mockCwd, config, skipPreflight: false })).not.toThrow();
	});

	it("should update legacy config for Tailwind v3 + Svelte v5", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configLegacy);
		mockVersions({
			tailwindcss: "3.0.0",
			svelte: "5.0.0",
		});

		const config = (await getConfig(mockCwd))!;
		const updatedConfig = checkPreconditions({ cwd: mockCwd, config, skipPreflight: false });

		const expectedConfig = {
			...configLegacy,
			registry: `${TW3_SITE_BASE_URL}/registry/default`,
		};

		expect(updatedConfig).toStrictEqual(expectedConfig);
	});

	it("should not update config for Tailwind v3 + Svelte v5 if no style field", async () => {
		// @ts-expect-error - we're mocking the config
		vi.mocked(getConfig).mockResolvedValue(configLegacyUpdated);
		mockVersions({
			tailwindcss: "3.0.0",
			svelte: "5.0.0",
		});

		const config = (await getConfig(mockCwd))!;
		checkPreconditions({ cwd: mockCwd, config, skipPreflight: false });

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
			mockVersions(deps);

			const config = (await getConfig(mockCwd))!;
			expect(() => checkPreconditions({ cwd: mockCwd, config, skipPreflight: false })).toThrow(
				"requires Tailwind CSS (v3 or v4) and Svelte v5"
			);
		}
	});
});
