import { describe, it, expect } from "vitest";
import { parseDependency, resolveURL } from "../../src/utils/utils";

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

	it("handles URLs that already a have trailing slash", () => {
		const base = "https://example.com/";
		expect(resolveURL(base, "index.json").href).toEqual("https://example.com/index.json");
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

	it("works with query parameters", () => {
		const base = "http://example.com/registry?foo=bar";
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

describe("parseDependency", () => {
	it("parses without tags", () => {
		expect(parseDependency("foo")).toEqual({ name: "foo", version: "latest" });
		expect(parseDependency("@foo/bar")).toEqual({ name: "@foo/bar", version: "latest" });
	});
	it("parses with tags", () => {
		expect(parseDependency("svelte@5.0.0")).toEqual({ name: "svelte", version: "5.0.0" });
		expect(parseDependency("@foo/bar@1.0.0")).toEqual({ name: "@foo/bar", version: "1.0.0" });
	});
});
