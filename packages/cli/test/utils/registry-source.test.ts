import { describe, expect, it } from "vitest";
import {
	loadRegistryCatalogFromSource,
	loadRegistryItemFromSource,
} from "../../src/utils/registry/source.js";

function createReader(files: Record<string, unknown>) {
	return {
		async readText(filePath: string) {
			if (!(filePath in files)) throw new Error(`Missing ${filePath}`);
			const value = files[filePath];
			return typeof value === "string" ? value : JSON.stringify(value);
		},
	};
}

describe("registry source validation", () => {
	it("rejects includes that escape the repository root", async () => {
		const reader = createReader({
			"registry.json": {
				name: "test",
				homepage: "https://example.com",
				include: ["../registry.json"],
			},
		});
		await expect(loadRegistryCatalogFromSource(reader)).rejects.toThrow(
			"include paths must be relative registry.json files inside the same repository"
		);
	});

	it("rejects include cycles and duplicate includes", async () => {
		const cycleReader = createReader({
			"registry.json": {
				name: "test",
				homepage: "https://example.com",
				include: ["./registry.json"],
			},
		});
		await expect(loadRegistryCatalogFromSource(cycleReader)).rejects.toThrow(
			"Registry include cycle detected"
		);

		const duplicateReader = createReader({
			"registry.json": {
				name: "test",
				homepage: "https://example.com",
				include: ["a/registry.json", "a/registry.json"],
			},
			"a/registry.json": { items: [] },
		});
		await expect(loadRegistryCatalogFromSource(duplicateReader)).rejects.toThrow(
			"Registry file included more than once"
		);
	});

	it("rejects duplicate item names across included registries", async () => {
		const reader = createReader({
			"registry.json": {
				name: "test",
				homepage: "https://example.com",
				include: ["a/registry.json"],
				items: [{ name: "button", type: "registry:ui" }],
			},
			"a/registry.json": { items: [{ name: "button", type: "registry:ui" }] },
		});
		await expect(loadRegistryCatalogFromSource(reader)).rejects.toThrow(
			'Duplicate registry item name "button"'
		);
	});

	it("rejects item file paths outside the declaring registry chunk", async () => {
		const reader = createReader({
			"registry.json": {
				name: "test",
				homepage: "https://example.com",
				include: ["chunks/registry.json"],
			},
			"chunks/registry.json": {
				items: [
					{
						name: "button",
						type: "registry:ui",
						files: [{ path: "../button.svelte", type: "registry:ui" }],
					},
				],
			},
		});
		await expect(loadRegistryItemFromSource("button", reader)).rejects.toThrow(
			"file paths must be relative and stay inside the registry chunk directory"
		);
	});

	it("requires name and homepage only on the root registry", async () => {
		const reader = createReader({
			"registry.json": { include: ["chunks/registry.json"] },
			"chunks/registry.json": { items: [] },
		});
		await expect(loadRegistryCatalogFromSource(reader)).rejects.toThrow(
			'root registry.json must define "name" and "homepage"'
		);
	});
});
