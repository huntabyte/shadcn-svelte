import path from "node:path";
import { vol } from "memfs";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCLIPackageInfo } from "../../src/utils/get-package-info";

vi.mock("node:path");
vi.mock("node:url");
vi.mock("node:fs");
vi.mock("node:fs/promises");
beforeEach(() => {
	vol.reset();
	vi.resetAllMocks();
});

describe("getCLIPackageInfo", () => {
	it("reads and parses package.json", () => {
		const mockPackageJson = { name: "test-package", version: "1.0.0" };
		vol.fromJSON(
			{
				"./package.json": JSON.stringify(mockPackageJson),
			},
			"/tmp"
		);

		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		const result = getCLIPackageInfo();
		expect(result).toEqual(mockPackageJson);
	});

	it("throws on invalid JSON", () => {
		vol.fromJSON(
			{
				"./package.json": "invalid json",
			},
			"/tmp"
		);
		vi.mocked(path.resolve).mockReturnValue("/tmp/package.json");

		expect(() => getCLIPackageInfo()).toThrow();
	});
});
