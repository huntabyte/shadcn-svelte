import path from "node:path";
import * as p from "@clack/prompts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { promptForAliases } from "../../src/utils/config/utils.js";
import type { TsConfigResult } from "get-tsconfig";

vi.mock("@clack/prompts", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@clack/prompts")>();
	return { ...actual, text: vi.fn() };
});

describe("promptForAliases", () => {
	beforeEach(() => {
		vi.mocked(p.text)
			.mockResolvedValueOnce("#lib")
			.mockResolvedValueOnce("#lib/components")
			.mockResolvedValueOnce("#lib/components/ui")
			.mockResolvedValueOnce("#lib/utils")
			.mockResolvedValueOnce("#lib/hooks");
	});

	it("uses a detected package import as the suggested lib alias", async () => {
		const tsconfig = {
			path: path.join(process.cwd(), "tsconfig.json"),
			config: {},
		} satisfies TsConfigResult;

		await promptForAliases({
			cwd: process.cwd(),
			tsconfig,
			existingConfig: undefined,
			libAliasDefault: "#lib",
		});

		expect(p.text).toHaveBeenNthCalledWith(1, expect.objectContaining({ initialValue: "#lib" }));
		expect(p.text).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({ initialValue: "#lib/components" })
		);
	});
});
