import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { compareDocsContract, DOCS_SURFACES, runDocsParity } from "../src/docs.ts";

describe("docs UI parity", () => {
	it("keeps the mapped source files explicit", () => {
		expect(Object.keys(DOCS_SURFACES)).toContain("component-preview");
		expect(Object.keys(DOCS_SURFACES)).toContain("site-header");
		expect(
			Object.values(DOCS_SURFACES).flatMap((surface) => surface.contracts).length
		).toBeGreaterThan(35);
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

	it("allows only the documented flexible preview height difference", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "parity-docs-height-test-"));
		const docsRoot = path.join(root, "docs");
		const upstreamRoot = path.join(root, "upstream");
		fs.mkdirSync(docsRoot, { recursive: true });
		fs.mkdirSync(upstreamRoot, { recursive: true });
		const contract = {
			name: "preview",
			local: "local.svelte",
			upstream: "upstream.tsx",
			marker: ["preview", "h-72", "p-10"],
			localMarker: ["preview", "min-h-72", "p-10"],
			allowedDifference: { added: ["min-h-72"], removed: ["h-72"] },
		};
		fs.writeFileSync(
			path.join(upstreamRoot, "upstream.tsx"),
			'<div className="preview h-72 p-10" />'
		);
		fs.writeFileSync(path.join(docsRoot, "local.svelte"), '<div class="preview min-h-72 p-10" />');
		expect((await compareDocsContract(contract, docsRoot, upstreamRoot)).pair?.kind).toBe(
			"ignored"
		);

		fs.writeFileSync(
			path.join(docsRoot, "local.svelte"),
			'<div class="preview min-h-72 p-10 rounded-md" />'
		);
		expect((await compareDocsContract(contract, docsRoot, upstreamRoot)).pair?.kind).toBe("diff");
	});
});

describe("docs selector integrity", () => {
	it.each([
		[
			"changed duplicate",
			'<div class="flex h-72 p-10"/><div class="flex h-72 p-10 rounded-md"/>',
			"ambiguous local",
		],
		["missing occurrence", '<div class="flex h-72 p-10"/>', "expected 2 occurrences"],
		[
			"extra occurrence",
			'<div class="flex h-72 p-10"/><div class="flex h-72 p-10"/><div class="flex h-72 p-10"/>',
			"expected 2 occurrences",
		],
		[
			"comment is not an occurrence",
			'<div class="flex h-72 p-10"/><!-- class="flex h-72 p-10" -->',
			"expected 2 occurrences",
		],
	])("rejects %s", async (_, content, error) => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "parity-docs-integrity-"));
		try {
			fs.writeFileSync(path.join(root, "local.svelte"), content);
			fs.writeFileSync(path.join(root, "upstream.tsx"), '<div className="flex h-72 p-10"/>');
			const result = await compareDocsContract(
				{
					name: "duplicate",
					local: "local.svelte",
					upstream: "upstream.tsx",
					marker: ["h-72", "p-10"],
					occurrences: 2,
				},
				root,
				root
			);
			expect(result.error).toContain(error);
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});
});

it("pins remote URLs and isolates caches by upstream commit", async () => {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "parity-docs-ref-"));
	const filename = `contract-${path.basename(root)}.tsx`;
	const first = "1".repeat(40),
		second = "2".repeat(40);
	const fetchMock = vi.fn(
		async (_url: string) => new Response('<div className="flex h-72 p-10"/>')
	);
	vi.stubGlobal("fetch", fetchMock);
	try {
		fs.writeFileSync(path.join(root, "local.svelte"), '<div class="flex h-72 p-10"/>');
		const contract = {
			name: "remote",
			local: "local.svelte",
			upstream: filename,
			marker: ["h-72", "p-10"],
		};
		await compareDocsContract(contract, root, undefined, false, first);
		await compareDocsContract(contract, root, undefined, false, first);
		await compareDocsContract(contract, root, undefined, false, second);
		expect(fetchMock).toHaveBeenCalledTimes(2);
		expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([
			`https://raw.githubusercontent.com/shadcn-ui/ui/${first}/${filename}`,
			`https://raw.githubusercontent.com/shadcn-ui/ui/${second}/${filename}`,
		]);
	} finally {
		vi.unstubAllGlobals();
		fs.rmSync(root, { recursive: true, force: true });
		for (const ref of [first, second])
			fs.rmSync(path.join(os.tmpdir(), "shadcn-svelte-upstream-docs", ref, filename), {
				force: true,
			});
	}
});
it("rejects mutable upstream refs", async () => {
	await expect(runDocsParity({ upstreamRef: "main" })).rejects.toThrow("commit SHA");
});
