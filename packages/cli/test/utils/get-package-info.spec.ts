import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPackageInfo, loadProjectPackageInfo } from "../../src/utils/get-package-info";
import fs from "node:fs";
import path from "node:path";

vi.mock("node:fs");
vi.mock("node:path");
vi.mock("node:url");

describe("getPackageInfo", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("reads and parses package.json", () => {
		const mockPackageJson = { name: "test-package", version: "1.0.0" };
		vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));
		vi.mocked(path.resolve).mockReturnValue("/mock/path/package.json");

		const result = getPackageInfo();
		expect(result).toEqual(mockPackageJson);
		expect(fs.readFileSync).toHaveBeenCalledWith("/mock/path/package.json", {
			encoding: "utf8",
		});
	});

	it("throws on invalid JSON", () => {
		vi.mocked(fs.readFileSync).mockReturnValue("invalid json");
		vi.mocked(path.resolve).mockReturnValue("/mock/path/package.json");

		expect(() => getPackageInfo()).toThrow();
	});
});

describe("loadProjectPackageInfo", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("reads and parses project package.json", () => {
		const mockPackageJson = { name: "project-package", version: "1.0.0" };
		vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));
		vi.mocked(path.resolve).mockReturnValue("/project/package.json");

		const result = loadProjectPackageInfo("/project");
		expect(result).toEqual(mockPackageJson);
		expect(path.resolve).toHaveBeenCalledWith("/project", "package.json");
		expect(fs.readFileSync).toHaveBeenCalledWith("/project/package.json", { encoding: "utf8" });
	});

	it("throws on invalid JSON", () => {
		vi.mocked(fs.readFileSync).mockReturnValue("invalid json");
		vi.mocked(path.resolve).mockReturnValue("/project/package.json");

		expect(() => loadProjectPackageInfo("/project")).toThrow();
	});
});
