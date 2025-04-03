import { describe, it, expect } from "vitest";
import { urlSplitLastPathSegment } from "../../src/utils/utils";

describe("urlSplitLastPathSegment", () => {
	it("Correctly returns the expected segments", () => {
		expect(
			urlSplitLastPathSegment(new URL("https://example.com/registry/index.json"))
		).toStrictEqual(["https://example.com/registry", "index.json"]);

		expect(
			urlSplitLastPathSegment(new URL("https://example.com/registry/index.json/"))
		).toStrictEqual(["https://example.com/registry", "index.json"]);
	});
});
