import { describe, it, expect } from "vitest";
import { resolveURL } from "../../src/utils/utils";

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
});
