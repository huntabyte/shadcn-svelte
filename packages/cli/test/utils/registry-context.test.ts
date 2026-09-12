import { describe, expect, it, vi } from "vitest";
import {
	getGitHubAuthNoticeFromContext,
	getRegistryEnvFromContext,
	withRegistryContext,
} from "../../src/utils/registry/context.js";
import {
	getGitHubAuthState,
	resetGitHubAuthNotices,
	selectGitHubAuthMode,
} from "../../src/utils/registry/github-auth.js";

describe("registry context", () => {
	it("uses process.env when no scoped environment is set", () => {
		vi.stubEnv("GH_TOKEN", "process-token");
		expect(getRegistryEnvFromContext("GH_TOKEN")).toBe("process-token");
		vi.unstubAllEnvs();
	});

	it("does not fall back to process.env when a scoped environment is set", () => {
		vi.stubEnv("GH_TOKEN", "process-token");
		expect(withRegistryContext(() => getRegistryEnvFromContext("GH_TOKEN"), { env: {} })).toBe(
			undefined
		);
		vi.unstubAllEnvs();
	});

	it("inherits scoped values through nested contexts", () => {
		const notice = vi.fn();
		withRegistryContext(
			() => {
				withRegistryContext(() => {
					expect(getRegistryEnvFromContext("GH_TOKEN")).toBe("context-token");
					expect(getGitHubAuthNoticeFromContext()).toBe(notice);
				});
			},
			{ env: { GH_TOKEN: "context-token" }, onGitHubAuthNotice: notice }
		);
	});

	it("retries auth selection when an async notice callback fails", async () => {
		resetGitHubAuthNotices();
		const source = { owner: "acme", repo: "ui" };
		const state = getGitHubAuthState({}, source);
		const notice = vi.fn().mockRejectedValueOnce(new Error("client unavailable"));

		await expect(
			withRegistryContext(() => selectGitHubAuthMode(state, source, new Error("anonymous")), {
				env: { GH_TOKEN: "context-token" },
				onGitHubAuthNotice: notice,
			})
		).rejects.toThrow("client unavailable");
		await expect(
			withRegistryContext(() => selectGitHubAuthMode(state, source, new Error("anonymous")), {
				env: { GH_TOKEN: "context-token" },
				onGitHubAuthNotice: notice,
			})
		).resolves.toBe("token");
		expect(notice).toHaveBeenCalledTimes(2);
	});
});
