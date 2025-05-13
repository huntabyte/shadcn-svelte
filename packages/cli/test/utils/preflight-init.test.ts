import { describe, it, expect, vi, beforeEach } from "vitest";
import { preflightInit } from "../../src/utils/preflight-init.js";
import { loadProjectPackageInfo } from "../../src/utils/get-package-info.js";

vi.mock("../../src/utils/get-package-info.js");

describe("preflightInit", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should throw error for Tailwind v3 + Svelte v5", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test")).toThrow(
			"You are using Tailwind CSS v3 with Svelte v5.\n\n" +
				"You have two options:\n" +
				"1. Update Tailwind CSS to v4 and try again.\n" +
				"2. Use shadcn-svelte@<TODO: version> that supports Tailwind v3.\n\n"
		);
	});

	it("should throw error for Tailwind v3 + Svelte v4", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "3.0.0",
				svelte: "4.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test")).toThrow(
			"You are using Tailwind CSS v3 with Svelte v4.\n\n" +
				"This CLI version requires Tailwind CSS v4 and Svelte v5.\n" +
				"Please use shadcn-svelte@<TODO: version> that supports Tailwind v3 + Svelte v4.\n\n"
		);
	});

	it("should throw error for Tailwind v4 + Svelte v4", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
				svelte: "4.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test")).toThrow(
			"This CLI version requires Tailwind CSS v4 and Svelte v5.\n"
		);
	});

	it("should pass for Tailwind v4 + Svelte v5", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
				svelte: "5.0.0",
			},
			devDependencies: {},
		});

		expect(() => preflightInit("/test")).not.toThrow();
	});

	it("should check both dependencies and devDependencies", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				tailwindcss: "4.0.0",
			},
			devDependencies: {
				svelte: "5.0.0",
			},
		});

		expect(() => preflightInit("/test")).not.toThrow();
	});

	it("should handle missing dependencies", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {},
			devDependencies: {},
		});

		expect(() => preflightInit("/test")).toThrow(
			"This CLI version requires Tailwind CSS v4 and Svelte v5.\n"
		);
	});
});
