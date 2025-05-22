import { describe, it, expect, beforeEach } from "vitest";
import { ALIAS_DEFAULTS, ALIASES } from "../../src/constants";
import { parseDependency, resolveURL } from "../../src/utils/utils";
import { transformAliases, transformLocal } from "../../src/commands/registry/build";

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

describe("transformLocal", () => {
	describe("transformLocal", () => {
		it("should transform a local dependency string correctly", () => {
			const registryDep = "local:my-package";
			const expectedOutput = "./my-package.json";
			expect(transformLocal(registryDep)).toBe(expectedOutput);
		});

		it('should return the original string if it does not start with "local:"', () => {
			const registryDep = "other-package";
			expect(transformLocal(registryDep)).toBe(registryDep);
		});

		it("should handle local dependencies with hyphens and numbers", () => {
			const registryDep = "local:my-package-123";
			const expectedOutput = "./my-package-123.json";
			expect(transformLocal(registryDep)).toBe(expectedOutput);
		});

		it("should handle local dependencies with underscores", () => {
			const registryDep = "local:my_package";
			const expectedOutput = "./my_package.json";
			expect(transformLocal(registryDep)).toBe(expectedOutput);
		});

		it('should handle an empty string after "local:"', () => {
			const registryDep = "local:";
			const expectedOutput = "./.json";
			expect(transformLocal(registryDep)).toBe(expectedOutput);
		});

		it("should return an empty string if the input is an empty string", () => {
			const registryDep = "";
			expect(transformLocal(registryDep)).toBe("");
		});

		it('should handle strings that contain "local:" but do not start with it', () => {
			const registryDep = "some-prefix-local:my-package";
			expect(transformLocal(registryDep)).toBe(registryDep);
		});
	});
});

type Aliases = NonNullable<Parameters<typeof transformAliases>[0]>;

describe("transformAliases", () => {
	let aliases = {} as Aliases;

	beforeEach(() => {
		aliases = {} as Aliases;
	});

	it("replaces default paths with placeholders when aliases is empty", () => {
		const key = ALIASES[0];
		const { defaultPath, placeholder } = ALIAS_DEFAULTS[key];

		const content = `import X from "${defaultPath}/foo.js"`;
		const out = transformAliases(aliases, content);

		expect(out).toBe(`import X from "${placeholder}/foo.js"`);
		// aliases object should now have the defaultPath set
		expect(aliases[key]).toBe(defaultPath);
	});

	it("replaces a single custom alias path", () => {
		const key = ALIASES[1];
		const { placeholder } = ALIAS_DEFAULTS[key];
		const customPath = "/my/custom/path";
		aliases = { [key]: customPath };

		const content = `import X from "${customPath}/bar/index.js"`;
		const out = transformAliases(aliases, content);

		expect(out).toBe(`import X from "${placeholder}/bar/index.js"`);
		expect(aliases[key]).toBe(customPath);
	});

	it("replaces multiple occurrences of the same alias", () => {
		const key = ALIASES[2];
		const { defaultPath, placeholder } = ALIAS_DEFAULTS[key];

		const content = [
			`import A from "${defaultPath}/a.js";`,
			`import { B } from "${defaultPath}/b.js";`,
		].join("\n");

		const out = transformAliases(aliases, content);

		expect(out).toContain(`${placeholder}/a.js`);
		expect(out).toContain(`${placeholder}/b.js`);
	});

	it("leaves content unchanged when no alias paths are present", () => {
		const content = `// nothing to transform here\nconsole.log("hello world");`;

		const out = transformAliases(aliases, content);
		expect(out).toBe(content);
		// aliases should now have all defaults populated
		for (const alias of ALIASES) {
			expect(aliases[alias]).toBe(ALIAS_DEFAULTS[alias].defaultPath);
		}
	});

	it("handles an already populated aliases object without modifying it", () => {
		const key = ALIASES[3];
		const { placeholder } = ALIAS_DEFAULTS[key];
		const preset = "/existing/path";
		aliases = { [key]: preset };

		const content = `import X from "${preset}/thing.js"`;
		const out = transformAliases(aliases, content);

		expect(out).toBe(`import X from "${placeholder}/thing.js"`);
		// ensure preset remains untouched
		expect(aliases[key]).toBe(preset);
	});
});
