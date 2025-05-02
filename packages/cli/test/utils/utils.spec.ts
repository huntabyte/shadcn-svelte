import { describe, it, expect } from "vitest";
import { resolveURL, normalizeURL } from "../../src/utils/utils";

describe("normalizeURL", () => {
	it("works with string URLs", () => {
		const normalized = normalizeURL("https://example.com");
		expect(normalized.href).toEqual("https://example.com/");
	});

	it("handles URLs that already have trailing slash", () => {
		expect(normalizeURL("https://example.com/").href).toEqual("https://example.com/");
	});

	it("handles URLs with query parameters", () => {
		expect(normalizeURL("https://example.com?foo=bar").href).toEqual(
			"https://example.com/?foo=bar"
		);
	});
});

describe("resolveURL", () => {
	it("Correctly resolves the relative url path", () => {
		const base = "https://example.com/registry";

		expect(resolveURL(base, "index.json").href).toEqual(
			"https://example.com/registry/index.json"
		);

		expect(resolveURL(base, "../index.json").href).toEqual("https://example.com/index.json");

		expect(resolveURL(base, "./foo/bar/index.json").href).toEqual(
			"https://example.com/registry/foo/bar/index.json"
		);
	});

	it("works with URL objects", () => {
		const base = new URL("https://example.com/registry");
		expect(resolveURL(base, "index.json").href).toEqual(
			"https://example.com/registry/index.json"
		);
	});

	it("handles absolute paths", () => {
		const base = "https://example.com/registry";
		expect(resolveURL(base, "/absolute/path").href).toEqual(
			"https://example.com/absolute/path"
		);
	});

	it("handles empty paths", () => {
		const base = "https://example.com/registry";
		expect(resolveURL(base, "").href).toEqual("https://example.com/registry/");
	});

	it("works with different protocols", () => {
		const base = "http://example.com/registry";
		expect(resolveURL(base, "index.json").href).toEqual(
			"http://example.com/registry/index.json"
		);
	});

	it("works with port numbers", () => {
		const base = "https://example.com:8080/registry";
		expect(resolveURL(base, "index.json").href).toEqual(
			"https://example.com:8080/registry/index.json"
		);
	});
});
