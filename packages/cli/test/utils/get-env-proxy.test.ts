import { describe, it, expect, vi, afterEach } from "vitest";
import { getEnvProxy } from "../../src/utils/get-env-proxy";

describe("getEnvProxy", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("returns HTTP_PROXY if set", () => {
		vi.stubEnv("HTTP_PROXY", "http://proxy.example.com");
		expect(getEnvProxy()).toBe("http://proxy.example.com");
	});

	it("returns http_proxy if HTTP_PROXY not set", () => {
		vi.stubEnv("http_proxy", "http://proxy.example.com");
		expect(getEnvProxy()).toBe("http://proxy.example.com");
	});

	it("returns HTTPS_PROXY if HTTP_PROXY and http_proxy not set", () => {
		vi.stubEnv("HTTPS_PROXY", "https://proxy.example.com");
		expect(getEnvProxy()).toBe("https://proxy.example.com");
	});

	it("returns https_proxy if higher priority proxies not set", () => {
		vi.stubEnv("https_proxy", "https://proxy.example.com");
		expect(getEnvProxy()).toBe("https://proxy.example.com");
	});

	it("returns npm_config_proxy if higher priority proxies not set", () => {
		vi.stubEnv("npm_config_proxy", "http://npm-proxy.example.com");
		expect(getEnvProxy()).toBe("http://npm-proxy.example.com");
	});

	it("returns npm_config_https_proxy if higher priority proxies not set", () => {
		vi.stubEnv("npm_config_https_proxy", "https://npm-proxy.example.com");
		expect(getEnvProxy()).toBe("https://npm-proxy.example.com");
	});

	it("returns undefined if no proxy is set", () => {
		expect(getEnvProxy()).toBeUndefined();
	});

	it("prioritizes HTTP_PROXY over other settings", () => {
		vi.stubEnv("HTTP_PROXY", "http://proxy.example.com");
		vi.stubEnv("https_proxy", "https://other-proxy.example.com");
		vi.stubEnv("npm_config_proxy", "http://npm-proxy.example.com");
		expect(getEnvProxy()).toBe("http://proxy.example.com");
	});
});
