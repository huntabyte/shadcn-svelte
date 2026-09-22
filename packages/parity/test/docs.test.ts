import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { compareDocsContract, DOCS_SURFACES } from "../src/docs.ts";

describe("docs UI parity", () => {
	it("keeps the mapped source files explicit", () => {
		expect(Object.keys(DOCS_SURFACES)).toEqual([
			"component-preview",
			"docs-sidebar",
			"homepage",
			"attachment",
		]);
	});

	it("compares a named class contract", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "parity-docs-test-"));
		const docsRoot = path.join(root, "docs");
		const upstreamRoot = path.join(root, "upstream");
		fs.mkdirSync(docsRoot, { recursive: true });
		fs.mkdirSync(upstreamRoot, { recursive: true });
		fs.writeFileSync(path.join(docsRoot, "local.svelte"), '<div class="flex h-72 p-10" />');
		fs.writeFileSync(path.join(upstreamRoot, "upstream.tsx"), '<div className="flex h-72 p-10" />');

		const result = await compareDocsContract(
			{
				name: "preview",
				local: "local.svelte",
				upstream: "upstream.tsx",
				marker: ["h-72", "p-10"],
			},
			docsRoot,
			upstreamRoot
		);

		expect(result.error).toBeUndefined();
		expect(result.pair?.kind).toBe("exact");
	});

	it("reports a missing local contract", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "parity-docs-test-"));
		const docsRoot = path.join(root, "docs");
		const upstreamRoot = path.join(root, "upstream");
		fs.mkdirSync(docsRoot, { recursive: true });
		fs.mkdirSync(upstreamRoot, { recursive: true });
		fs.writeFileSync(path.join(docsRoot, "local.svelte"), '<div class="flex h-64 p-10" />');
		fs.writeFileSync(path.join(upstreamRoot, "upstream.tsx"), '<div className="flex h-72 p-10" />');

		const result = await compareDocsContract(
			{
				name: "preview",
				local: "local.svelte",
				upstream: "upstream.tsx",
				marker: ["h-72", "p-10"],
			},
			docsRoot,
			upstreamRoot
		);

		expect(result.error).toContain("local class not found");
	});
});
