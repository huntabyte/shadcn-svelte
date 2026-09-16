import os from "node:os";
import path from "node:path";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
	DEFAULT_CONFIG,
	loadConfig,
	parseRawConfig,
	registryConfigSchema,
	writeConfig,
} from "../../src/utils/config/index.js";
import { componentsJsonSchema } from "../../src/utils/registry/schema.js";

describe("registry configuration", () => {
	const registries = {
		"@acme": "https://acme.com/r/{name}.json",
		"@private": {
			url: "https://private.example.com/{style}/{name}.json",
			headers: { Authorization: "Bearer ${REGISTRY_TOKEN}" },
			params: { version: "${REGISTRY_VERSION}" },
		},
	};

	it("accepts string and object registries in the CLI and public schema", () => {
		const config = { ...DEFAULT_CONFIG, registries };
		expect(parseRawConfig(config).registries).toEqual(registries);
		expect(componentsJsonSchema.parse(config).registries).toEqual(registries);
	});

	it("keeps existing configurations unchanged", () => {
		expect(parseRawConfig(DEFAULT_CONFIG)).not.toHaveProperty("registries");
	});

	it("includes namespace and URL validation in the generated JSON schema", () => {
		const schema = z.toJSONSchema(registryConfigSchema);
		const names = schema.propertyNames;
		if (!names || typeof names === "boolean") throw new Error("Missing registry name schema");
		const namespacePattern = names.pattern;
		expect(namespacePattern).toBeDefined();
		expect(new RegExp(namespacePattern!).test("@acme")).toBe(true);
		expect(new RegExp(namespacePattern!).test("acme")).toBe(false);
		const entry = schema.additionalProperties;
		if (!entry || typeof entry === "boolean") throw new Error("Missing registry entry schema");
		const pattern = entry.anyOf?.[0]?.pattern;
		expect(pattern).toBeDefined();
		expect(new RegExp(pattern!).test("https://acme.com/{name}.json")).toBe(true);
		expect(new RegExp(pattern!).test("https://acme.com/button.json")).toBe(false);
	});

	it.each([
		{ acme: "https://acme.com/{name}.json" },
		{ "@acme": "https://acme.com/button.json" },
		{ "@acme": { url: "https://acme.com/button.json" } },
		{ "@acme": { url: "https://acme.com/{name}.json", headers: { token: 123 } } },
		{ "@acme": { url: "https://acme.com/{name}.json", params: { version: 1 } } },
	])("rejects invalid registry configuration: %j", (config) => {
		expect(registryConfigSchema.safeParse(config).success).toBe(false);
	});

	it("preserves registry templates when reading and writing components.json", () => {
		const cwd = mkdtempSync(path.join(os.tmpdir(), "shadcn-svelte-config-"));
		try {
			writeConfig(cwd, { ...DEFAULT_CONFIG, registries });
			const config = loadConfig(cwd)!;
			expect(config.registries).toEqual(registries);
			writeConfig(cwd, config);
			expect(
				JSON.parse(readFileSync(path.join(cwd, "components.json"), "utf8")).registries
			).toEqual(registries);
		} finally {
			rmSync(cwd, { recursive: true, force: true });
		}
	});
});
