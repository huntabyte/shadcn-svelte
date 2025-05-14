import { describe, it, expect } from "vitest";
import { resolveImport } from "../../src/utils/resolve-imports.js";
import type { TsConfigResult } from "get-tsconfig";
import path from "node:path";
import { toPosixPath } from "./test-helpers.js";

describe("resolveImport", () => {
	it("returns first path match from tsconfig", () => {
		const mockConfig = {
			config: {
				compilerOptions: {
					paths: {
						"@/*": ["./src/*"],
					},
				},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		} as TsConfigResult;

		const result = resolveImport("@/components/Button", mockConfig);
		expect(result).toBeDefined();
		expect(toPosixPath(result!)).toBe("/project/src/components/Button");
	});

	it("returns undefined when the path alias being used is not defined in the tsconfig", () => {
		const mockConfig = {
			config: {
				compilerOptions: {},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		} as TsConfigResult;

		const result = resolveImport("@/components/Button", mockConfig);
		expect(result).toBeUndefined();
	});

	it("returns undefined when no matching path is found", () => {
		const mockConfig = {
			config: {
				compilerOptions: {
					paths: {
						"@/*": ["./src/*"],
					},
				},
			},
			path: path.posix.normalize("/project/tsconfig.json"),
		} as TsConfigResult;

		const result = resolveImport("unknown/path", mockConfig);
		expect(result).toBeUndefined();
	});
});
