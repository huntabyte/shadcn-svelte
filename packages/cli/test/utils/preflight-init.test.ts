import color from "picocolors";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { preflightInit } from "../../src/commands/init/preflight.js";
import { SITE_BASE_URL, TW3_SITE_BASE_URL } from "../../src/constants";
import { highlight } from "../../src/utils/utils";
import {
	getProjectPackageInfo,
	getDependencyPackageInfo,
} from "../../src/utils/get-package-info.js";

vi.mock("../../src/utils/get-package-info.js");
vi.mock("../../src/utils/utils");

describe("preflightInit", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		vi.mocked(getDependencyPackageInfo).mockReturnValue(undefined);
	});

	it("should throw error for Tailwind v3 + Svelte v5", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).toThrow(
			`Initializing a project with Tailwind v3 is not supported.\n\n` +
				`This CLI version requires Tailwind v4 and Svelte v5 for the ` +
				`${highlight("init")} command.\n\n` +
				`You have two options:\n` +
				`1. Update Tailwind CSS to v4 and try again.\n` +
				`2. Use ${highlight("shadcn-svelte@1.0.0-next.10")} that supports initializing projects with Tailwind v3.\n\n` +
				`References:\n` +
				`Tailwind v4 Guide: ${color.underline(`${SITE_BASE_URL}/docs/migration/tailwind-v4`)}\n` +
				`Legacy Tailwind v3 Docs: ${color.underline(`${TW3_SITE_BASE_URL}/docs`)}\n\n`
		);
	});

	it("should throw error for Tailwind v3 + Svelte v4", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "4.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).toThrow(
			`Initializing a project with Tailwind v3 and Svelte v4 is not supported.\n\n` +
				`This CLI version requires Tailwind v4 and Svelte v5 for the ` +
				`${highlight("init")} command.\n\n` +
				`Please use ${highlight("shadcn-svelte@0.14")} that supports Tailwind v3 + Svelte v4.\n\n`
		);
	});

	it("should throw error for Tailwind v4 + Svelte v4", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
				svelte: "4.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).toThrow(
			`This CLI version requires Tailwind CSS v4 and Svelte v5 to initialize a project.\n`
		);
	});

	it("should pass for Tailwind v4 + Svelte v5", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).not.toThrow();
	});

	it("should check both dependencies and devDependencies", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
			},
			devDependencies: {
				svelte: "5.0.0",
			},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).not.toThrow();
	});

	it("should handle missing dependencies", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: false })).toThrow(
			`This CLI version requires Tailwind CSS v4 and Svelte v5 to initialize a project.\n`
		);
	});

	it("should continue with skip-preflight flag", () => {
		vi.mocked(getProjectPackageInfo).mockReturnValue({
			dependencies: {},
			devDependencies: {},
		});

		expect(() => preflightInit("/test", { skipPreflight: true })).not.toThrow();
	});
});
