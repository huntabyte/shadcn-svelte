import { inspect } from "node:util";
import { fetch } from "node-fetch-native";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchRegistry, type RegistryRequest } from "../../src/utils/registry/fetcher.js";

vi.mock("node-fetch-native", () => ({ fetch: vi.fn() }));

describe("authenticated registry requests", () => {
	const request: RegistryRequest = {
		url: new URL("https://acme.com/r/button.json?key=private-token"),
		headers: {
			Authorization: "Bearer private-token",
			"X-Api-Key": "private-token",
			Accept: "application/json",
		},
		label: "@acme/button",
	};

	beforeEach(() => {
		vi.resetAllMocks();
		for (const key of ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"])
			vi.stubEnv(key, undefined);
	});
	afterEach(() => vi.unstubAllEnvs());

	it("keeps authentication on same-origin redirects and strips it on other origins", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(
				new Response(null, { status: 302, headers: { location: "/moved.json" } })
			)
			.mockResolvedValueOnce(
				new Response(null, {
					status: 307,
					headers: { location: "https://cdn.example.com/button.json" },
				})
			)
			.mockResolvedValueOnce(Response.json({ name: "button" }));
		await expect(fetchRegistry([request])).resolves.toEqual([{ name: "button" }]);
		expect(fetch).toHaveBeenNthCalledWith(1, request.url, {
			headers: request.headers,
			redirect: "manual",
		});
		expect(fetch).toHaveBeenNthCalledWith(2, new URL("https://acme.com/moved.json"), {
			headers: request.headers,
			redirect: "manual",
		});
		expect(fetch).toHaveBeenNthCalledWith(3, new URL("https://cdn.example.com/button.json"), {
			headers: { Accept: "application/json" },
			redirect: "manual",
		});
	});

	it("strips credentials when a redirect changes the port or downgrades to HTTP", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(
				new Response(null, {
					status: 302,
					headers: { location: "http://acme.com:8080/button.json" },
				})
			)
			.mockResolvedValueOnce(Response.json({}));
		await fetchRegistry([request]);
		expect(vi.mocked(fetch).mock.calls[1]?.[1]?.headers).toEqual({ Accept: "application/json" });
	});

	it.each([401, 403, 404, 500])(
		"reports status %i without exposing credentials",
		async (status) => {
			vi.mocked(fetch).mockResolvedValueOnce(
				new Response("private-token", { status, statusText: "private-token" })
			);
			const failure = await fetchRegistry([request]).catch((e: Error) => e);
			expect(failure).toBeInstanceOf(Error);
			expect(inspect(failure)).toContain(`@acme/button: ${status}`);
			expect(inspect(failure)).not.toContain("private-token");
			if (status === 401 || status === 403) expect(inspect(failure)).toContain("credentials");
		}
	);

	it("does not expose credentials in network errors or malformed responses", async () => {
		vi.mocked(fetch).mockRejectedValueOnce(new Error(`Unable to fetch ${request.url}`));
		const networkError = await fetchRegistry([request]).catch((e: Error) => e);
		expect(inspect(networkError)).toContain("Failed to fetch registry item @acme/button.");
		expect(inspect(networkError)).not.toContain("private-token");
		vi.mocked(fetch).mockResolvedValueOnce(new Response("private-token is not JSON"));
		const parseError = await fetchRegistry([request]).catch((e: Error) => e);
		expect(inspect(parseError)).toContain("Error parsing JSON response for @acme/button.");
		expect(inspect(parseError)).not.toContain("private-token");
	});

	it("limits redirect loops", async () => {
		vi.mocked(fetch).mockImplementation(
			async () => new Response(null, { status: 302, headers: { location: "/loop.json" } })
		);
		await expect(fetchRegistry([request])).rejects.toThrow(
			"Too many redirects while fetching @acme/button."
		);
		expect(fetch).toHaveBeenCalledTimes(6);
	});

	it("does not attach registry headers to later public requests", async () => {
		vi.mocked(fetch).mockImplementation(async () => Response.json({}));
		await fetchRegistry([request]);
		await fetchRegistry([new URL("https://acme.com/public.json")]);
		expect(fetch).toHaveBeenLastCalledWith(new URL("https://acme.com/public.json"), {});
	});
});
