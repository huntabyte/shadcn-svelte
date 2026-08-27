import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { detect, resolveCommand } from "package-manager-detector";
import { exec } from "tinyexec";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as project from "../../src/utils/project.js";

vi.mock("package-manager-detector", () => ({
	detect: vi.fn(),
	resolveCommand: vi.fn(),
}));
vi.mock("tinyexec", () => ({ exec: vi.fn() }));

const tempDirs: string[] = [];

async function createProject(version: string, generated: "none" | "kit2" | "kit3") {
	const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-svelte-kit-"));
	tempDirs.push(cwd);
	await fs.writeFile(
		path.join(cwd, "package.json"),
		JSON.stringify({ devDependencies: { "@sveltejs/kit": version } })
	);

	if (generated === "kit2" || generated === "kit3") {
		await fs.mkdir(path.join(cwd, ".svelte-kit"), { recursive: true });
	}
	if (generated === "kit3") {
		await fs.mkdir(path.join(cwd, "node_modules", "$app"), { recursive: true });
		await fs.writeFile(path.join(cwd, "node_modules", "$app", "tsconfig.json"), "{}");
	}

	return cwd;
}

async function installSvelteKit(cwd: string, version: string) {
	const packageDir = path.join(cwd, "node_modules", "@sveltejs", "kit");
	await fs.mkdir(packageDir, { recursive: true });
	await fs.writeFile(
		path.join(packageDir, "package.json"),
		JSON.stringify({ name: "@sveltejs/kit", version })
	);
}

beforeEach(() => {
	vi.resetAllMocks();
	vi.mocked(detect).mockResolvedValue({ agent: "npm" } as never);
	vi.mocked(resolveCommand).mockImplementation((_agent, command) => {
		if (command === "install") return { command: "npm", args: ["install"] } as never;
		return { command: "npx", args: ["svelte-kit", "sync"] } as never;
	});
	vi.mocked(exec).mockResolvedValue({ stdout: "", stderr: "" } as never);
});

afterEach(async () => {
	await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("syncSvelteKit", () => {
	it("keeps the SvelteKit 2 .svelte-kit readiness check", async () => {
		const cwd = await createProject("^2.60.1", "kit2");

		await project.syncSvelteKit(cwd);

		expect(exec).not.toHaveBeenCalled();
	});

	it("skips sync when SvelteKit 3 has generated $app/tsconfig", async () => {
		const cwd = await createProject("^3.0.0-next.0", "kit3");

		await project.syncSvelteKit(cwd);

		expect(exec).not.toHaveBeenCalled();
	});

	it("syncs SvelteKit 3 when $app/tsconfig is missing even if .svelte-kit exists", async () => {
		const cwd = await createProject("^3.0.0-next.0", "kit2");

		await project.syncSvelteKit(cwd);

		expect(exec).toHaveBeenCalledWith("npx", ["svelte-kit", "sync"], {
			throwOnError: true,
			nodeOptions: { cwd },
		});
	});

	it("keeps the actionable install error when sync cannot run", async () => {
		const cwd = await createProject("^3.0.0-next.0", "none");
		vi.mocked(exec).mockRejectedValueOnce(new Error("missing dependencies"));

		await expect(project.syncSvelteKit(cwd)).rejects.toThrow(
			"Ensure that your dependencies have been installed first with 'npm install'"
		);
	});
});

describe("isUsingSvelteKitV3", () => {
	it("only enables v3 behavior for a declared SvelteKit 3 range", async () => {
		const kit2 = await createProject("^2.60.1", "none");
		const kit3 = await createProject("^3.0.0-next.0", "none");

		expect(project.isUsingSvelteKitV3(kit2)).toBe(false);
		expect(project.isUsingSvelteKitV3(kit3)).toBe(true);
	});

	it("uses the installed version for package manager protocols", async () => {
		const cwd = await createProject("catalog:", "none");
		await installSvelteKit(cwd, "3.0.0-next.25");

		expect(project.isUsingSvelteKitV3(cwd)).toBe(true);
	});

	it("uses the installed version when a declared range spans Kit majors", async () => {
		const cwd = await createProject(">=2 <4", "none");
		await installSvelteKit(cwd, "3.0.0-next.25");

		expect(project.isUsingSvelteKitV3(cwd)).toBe(true);
	});

	it("falls back to the Kit 3 tsconfig shape when dependencies are missing", async () => {
		const cwd = await createProject("next", "none");
		await fs.writeFile(
			path.join(cwd, "tsconfig.json"),
			'{\n\t"extends": "$app/tsconfig",\n\t"compilerOptions": {}\n}'
		);

		expect(project.isUsingSvelteKitV3(cwd)).toBe(true);
	});

	it("does not infer Kit 3 from a Kit 2 config with a non-semver spec", async () => {
		const cwd = await createProject("catalog:", "none");
		await fs.writeFile(
			path.join(cwd, "tsconfig.json"),
			'{\n\t"extends": "./.svelte-kit/tsconfig.json",\n\t"compilerOptions": {}\n}'
		);

		expect(project.isUsingSvelteKitV3(cwd)).toBe(false);
	});
});
