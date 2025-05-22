import { log } from "@clack/prompts";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkPreconditions } from "../../src/utils/preconditions.js";
import { loadProjectPackageInfo } from "../../src/utils/get-package-info.js";

vi.mock("../../src/utils/get-package-info.js", () => ({
	loadProjectPackageInfo: vi.fn(),
}));

vi.mock("@clack/prompts", () => ({
	log: {
		warn: vi.fn(),
	},
}));

describe("preconditions", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should not warn when dependencies are compatible", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				svelte: "5.0.0",
				tailwindcss: "4.0.0",
			},
			devDependencies: {},
		});

		checkPreconditions("/test/path");
		expect(log.warn).not.toHaveBeenCalled();
	});

	it("should warn when svelte version is incompatible", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				svelte: "4.0.0",
				tailwindcss: "4.0.0",
			},
			devDependencies: {},
		});

		checkPreconditions("/test/path");
		expect(log.warn).toHaveBeenCalled();
	});

	it("should warn when tailwindcss version is incompatible", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				svelte: "5.0.0",
				tailwindcss: "3.0.0",
			},
			devDependencies: {},
		});

		checkPreconditions("/test/path");
		expect(log.warn).toHaveBeenCalled();
	});

	it("should check both dependencies and devDependencies", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				svelte: "5.0.0",
			},
			devDependencies: {
				tailwindcss: "3.0.0",
			},
		});

		checkPreconditions("/test/path");
		expect(log.warn).toHaveBeenCalled();
	});

	it("should handle missing dependencies gracefully", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {},
			devDependencies: {},
		});

		checkPreconditions("/test/path");
		expect(log.warn).not.toHaveBeenCalled();
	});

	it("should handle invalid version strings", () => {
		vi.mocked(loadProjectPackageInfo).mockReturnValue({
			dependencies: {
				svelte: "invalid-version",
				tailwindcss: "4.0.0",
			},
			devDependencies: {},
		});

		checkPreconditions("/test/path");
		expect(log.warn).not.toHaveBeenCalled();
	});
});
