import { describe, expect, it } from "vitest";
import { buildRegistryRequest } from "../../src/utils/registry/builder.js";

describe("buildRegistryRequest", () => {
	it.each(["button", "https://example.com/button.json", "./button.json"])(
		"leaves existing item references unchanged: %s",
		(name) => expect(buildRegistryRequest(name)).toBeUndefined()
	);

	it("builds a URL from a string registry with name and style placeholders", () => {
		const request = buildRegistryRequest("@acme/dashboard/chart", {
			style: "vega",
			registries: { "@acme": "https://acme.com/{style}/{name}.json" },
		});
		expect(request?.url.href).toBe("https://acme.com/vega/dashboard/chart.json");
		expect(request?.headers).toEqual({});
	});

	it("interpolates URL, headers and params without changing the configuration", () => {
		const config = {
			registries: {
				"@acme": {
					url: "https://${REGISTRY_HOST}/{name}.json?existing=true#anchor",
					headers: { Authorization: "Bearer ${REGISTRY_TOKEN}", Empty: " " },
					params: { key: "${REGISTRY_TOKEN}", version: "v2", empty: "" },
				},
			},
		};
		const original = structuredClone(config);
		const request = buildRegistryRequest("@acme/button", config, {
			REGISTRY_HOST: "acme.com",
			REGISTRY_TOKEN: "key+with&symbols",
		});
		expect(request?.url.href).toBe(
			"https://acme.com/button.json?existing=true&key=key%2Bwith%26symbols&version=v2#anchor"
		);
		expect(request?.headers).toEqual({ Authorization: "Bearer key+with&symbols" });
		expect(config).toEqual(original);
	});

	it("reports missing environment variables by name", () => {
		expect(() =>
			buildRegistryRequest(
				"@acme/button",
				{
					registries: {
						"@acme": {
							url: "https://${REGISTRY_HOST}/{name}.json",
							headers: { Authorization: "Bearer ${REGISTRY_TOKEN}" },
							params: { key: "${REGISTRY_TOKEN}" },
						},
					},
				},
				{}
			)
		).toThrow("requires environment variables: REGISTRY_HOST, REGISTRY_TOKEN");
	});

	it("does not expand environment variables supplied by registry item names", () => {
		const request = buildRegistryRequest(
			"@acme/${UNRELATED_SECRET}",
			{
				registries: { "@acme": "https://acme.com/{name}.json" },
			},
			{ UNRELATED_SECRET: "do-not-send" }
		);
		expect(request?.url.href).not.toContain("do-not-send");
	});

	it("does not replace placeholders inside environment values or item names", () => {
		const request = buildRegistryRequest(
			"@acme/{style}",
			{ registries: { "@acme": "https://acme.com/{name}.json?key=${REGISTRY_TOKEN}" } },
			{ REGISTRY_TOKEN: "{name}-${OTHER_TOKEN}" }
		);
		expect(request?.url.pathname).toBe("/%7Bstyle%7D.json");
		expect(request?.url.searchParams.get("key")).toBe("{name}-${OTHER_TOKEN}");
	});

	it.each(["@acme", "@acme/", "@-acme/button"])("rejects malformed references: %s", (name) => {
		expect(() => buildRegistryRequest(name)).toThrow("Use @namespace/name");
	});

	it("reports unconfigured namespaces", () => {
		expect(() => buildRegistryRequest("@acme/button")).toThrow(
			"Registry '@acme' is not configured"
		);
	});

	it.each(["file:///{name}.json", "${REGISTRY_TOKEN}/{name}"])(
		"rejects invalid URLs without exposing expanded credentials",
		(url) => {
			expect(() =>
				buildRegistryRequest(
					"@acme/button",
					{
						registries: { "@acme": url },
					},
					{ REGISTRY_TOKEN: "private-token" }
				)
			).toThrow("Registry '@acme' must resolve to a valid HTTP or HTTPS URL.");
		}
	);
});
