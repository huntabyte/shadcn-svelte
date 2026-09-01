import path from "node:path";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubFileViaGh, GitHubTransportError } from "../../src/utils/registry/github-cli.js";

const ADDRESS = { owner: "acme", repo: "ui" };
const SHA = "1111111111111111111111111111111111111111";

function createFakeGh(script: string) {
	const dir = mkdtempSync(path.join(tmpdir(), "shadcn-svelte-fake-gh-"));
	const binPath = path.join(dir, "gh");
	writeFileSync(binPath, `#!/bin/sh\n${script}\n`);
	chmodSync(binPath, 0o755);
	return dir;
}

describe.runIf(process.platform !== "win32")("gh executor with a real subprocess", () => {
	const tempDirs: string[] = [];

	afterEach(() => {
		vi.unstubAllEnvs();
		for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true });
	});

	it("returns fake-gh stdout as file content", async () => {
		const dir = createFakeGh("printf 'export const Button = true'");
		tempDirs.push(dir);
		vi.stubEnv("PATH", dir);
		await expect(fetchGitHubFileViaGh(ADDRESS, SHA, "button.ts")).resolves.toBe(
			"export const Button = true"
		);
	});

	it("classifies a real nonzero exit without leaking stderr", async () => {
		const secret = "ghp_secret_abcdef123456";
		const dir = createFakeGh(`echo "gh: ${secret} Not Found (HTTP 404)" >&2\nexit 1`);
		tempDirs.push(dir);
		vi.stubEnv("PATH", dir);
		const caught = await fetchGitHubFileViaGh(ADDRESS, SHA, "button.ts").catch((error) => error);
		expect(caught).toBeInstanceOf(GitHubTransportError);
		expect(caught).toMatchObject({ kind: "http", statusCode: 404 });
		expect(
			JSON.stringify({ message: caught.message, stack: caught.stack, ...caught })
		).not.toContain(secret);
	});

	it("never leaks partial stdout from a failed subprocess", async () => {
		const dir = createFakeGh(
			"printf 'partial private source content'\necho 'gh: boom' >&2\nexit 1"
		);
		tempDirs.push(dir);
		vi.stubEnv("PATH", dir);
		const caught = await fetchGitHubFileViaGh(ADDRESS, SHA, "button.ts").catch((error) => error);
		expect(caught).toBeInstanceOf(GitHubTransportError);
		expect(
			JSON.stringify({ message: caught.message, stack: caught.stack, ...caught })
		).not.toContain("partial private source");
	});

	it("classifies a missing gh binary from a real spawn failure", async () => {
		const dir = mkdtempSync(path.join(tmpdir(), "shadcn-svelte-empty-path-"));
		tempDirs.push(dir);
		vi.stubEnv("PATH", dir);
		await expect(fetchGitHubFileViaGh(ADDRESS, SHA, "button.ts")).rejects.toMatchObject({
			kind: "enoent",
		});
	});
});
