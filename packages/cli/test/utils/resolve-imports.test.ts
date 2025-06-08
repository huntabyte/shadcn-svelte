import path from "node:path";
import { beforeEach, describe, it, expect, vi } from "vitest";
import type { TsConfigResult } from "get-tsconfig";
import { toPosixPath } from "./test-helpers.js";
import { resolveImportAlias } from "../../src/utils/resolve-imports.js";
import {
	getProjectPackageInfo,
	getDependencyPackageInfo,
} from "../../src/utils/get-package-info.js";

vi.mock("../../src/utils/get-package-info.js");

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(getProjectPackageInfo).mockReturnValue({
		name: "foo",
		imports: {
			"#lib/*": "./src/*",
		},
		dependencies: { "@workspace/ui": "workspace:*" },
		devDependencies: {},
	});
	vi.mocked(getDependencyPackageInfo).mockReturnValue({
		pkg: {
			name: "@workspace/ui",
			exports: {
				"./components/*": "./src/components/*",
			},
		},
		path: "/project/node_modules/@workspace/ui/package.json",
	});
});

describe("resolveImportAlias", () => {
	it("returns first path match from tsconfig", () => {
		const mockTsconfig: TsConfigResult = {
			config: {
				compilerOptions: {
					paths: {
						"@/*": ["./src/*"],
					},
				},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		};

		const result = resolveImportAlias({
			importPath: "@/components/Button",
			tsconfig: mockTsconfig,
			cwd: "/project",
		});
		expect(result).toBeDefined();
		expect(toPosixPath(result!)).toBe("/project/src/components/Button");
	});

	it("returns first path match from import map", () => {
		const mockTsconfig: TsConfigResult = {
			config: { compilerOptions: {} },
			path: path.posix.normalize("/project/tsconfig.json"),
		};

		const result = resolveImportAlias({
			importPath: "#lib/components/Button",
			tsconfig: mockTsconfig,
			cwd: "/project",
		});
		expect(result).toBeDefined();
		expect(toPosixPath(result!)).toBe("/project/src/components/Button");
	});

	it("returns first path match from workspace dependencies", () => {
		const mockTsconfig: TsConfigResult = {
			config: { compilerOptions: {} },
			path: path.posix.normalize("/project/tsconfig.json"),
		};

		const result = resolveImportAlias({
			importPath: "@workspace/ui/components/Button",
			tsconfig: mockTsconfig,
			cwd: "/project",
		});
		expect(result).toBeDefined();
		expect(toPosixPath(result!)).toBe(
			"/project/node_modules/@workspace/ui/src/components/Button"
		);
	});

	it("returns undefined when the path alias being used is not defined in the tsconfig", () => {
		const mockTsconfig: TsConfigResult = {
			config: {
				compilerOptions: {},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		};

		const result = resolveImportAlias({
			importPath: "@/components/Button",
			tsconfig: mockTsconfig,
			cwd: "/project",
		});
		expect(result).toBeUndefined();
	});

	it("returns undefined when no matching path is found", () => {
		const mockTsconfig: TsConfigResult = {
			config: {
				compilerOptions: {
					paths: {
						"@/*": ["./src/*"],
					},
				},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		};

		const result = resolveImportAlias({
			importPath: "unknown/path",
			tsconfig: mockTsconfig,
			cwd: "/project",
		});
		expect(result).toBeUndefined();
	});
});
