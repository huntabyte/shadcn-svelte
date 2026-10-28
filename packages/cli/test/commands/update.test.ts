import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { tmpdir } from "node:os";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import * as registry from "../../src/utils/registry/index.js";
import { update } from "../../src/commands/update/index.js";
import { detectPM } from "../../src/utils/auto-detect.js";
import { installDependencies } from "../../src/utils/install-deps.js";
import type { ResolvedConfig } from "../../src/utils/config/index.js";

const config = {
	resolvedPaths: {
		cwd: "/test",
		ui: "/test/ui",
		components: "/test/components",
		tailwindCss: "/test/src/app.css",
		hooks: "/test/hooks",
		utils: "/test/utils",
		lib: "/test/lib",
	},
	aliases: {
		components: "/test/components",
		utils: "/test/utils",
		ui: "/test/ui",
		hooks: "/test/hooks",
		lib: "/test/lib",
	},
	tailwind: { css: "src/app.css", baseColor: "zinc" },
	typescript: true,
	registry: "https://example.com/registry",
	sveltekit: true,
	style: "vega",
	iconLibrary: "lucide",
	menuColor: "default",
	menuAccent: "subtle",
} satisfies ResolvedConfig;

const button = { name: "button", type: "registry:ui", relativeUrl: "button.json" } as const;

vi.mock("@clack/prompts", async (importOriginal) => ({
	...(await importOriginal<typeof import("@clack/prompts")>()),
	cancel: vi.fn(),
	tasks: vi.fn(),
}));

vi.mock("../../src/utils/config/index.js", () => ({
	getConfig: vi.fn(async () => config),
}));

vi.mock("../../src/utils/preconditions.js", () => ({
	checkPreconditions: vi.fn(({ config }) => config),
}));

vi.mock("../../src/utils/registry/index.js", () => ({
	getRegistryUrl: vi.fn(() => "https://example.com/registry"),
	getRegistryIndex: vi.fn(async () => [button]),
	resolveRegistryItems: vi.fn(async () => [button]),
	fetchRegistryItems: vi.fn(async () => [
		{ ...button, files: [], dependencies: ["bits-ui"], devDependencies: [] },
	]),
	getItemAliasDir: vi.fn(() => "/test/ui"),
}));

vi.mock("../../src/utils/project.js", () => ({
	getComponents: vi.fn(async () => [button]),
}));

vi.mock("../../src/utils/install-deps.js", () => ({
	installDependencies: vi.fn(),
}));

// `intro()` reads the CLI's package.json, which only sits next to the built files.
vi.mock("../../src/utils/prompt-helpers.js", async (importOriginal) => ({
	...(await importOriginal<typeof import("../../src/utils/prompt-helpers.js")>()),
	intro: vi.fn(),
}));

vi.mock("../../src/utils/auto-detect.js", async (importOriginal) => ({
	...(await importOriginal<typeof import("../../src/utils/auto-detect.js")>()),
	detectPM: vi.fn(),
}));

vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
const cancel = vi.mocked(p.cancel);

let cwd: string;
let isTTY: PropertyDescriptor | undefined;

beforeEach(() => {
	vi.clearAllMocks();
	cwd = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-update-"));
	isTTY = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
	Object.defineProperty(process.stdin, "isTTY", { value: false, configurable: true });
	vi.mocked(detectPM).mockResolvedValue("pnpm");
});

afterEach(() => {
	if (isTTY) Object.defineProperty(process.stdin, "isTTY", isTTY);
	else delete (process.stdin as { isTTY?: boolean }).isTTY;
	fs.rmSync(cwd, { recursive: true, force: true });
});

async function runUpdate(...args: string[]) {
	const program = new Command();
	program.addCommand(update);
	await program.parseAsync(["node", "shadcn-svelte", "update", "-c", cwd, ...args]);
}

it.each([{ args: [] }, { args: ["card"] }])(
	"fails without installed components when there's no terminal: $args",
	async ({ args }) => {
		await runUpdate("-y", ...args);

		expect(cancel).toHaveBeenCalledWith(expect.stringContaining("--all"));
		expect(process.exit).toHaveBeenCalledWith(1);
		expect(registry.fetchRegistryItems).not.toHaveBeenCalled();
	}
);

it("fails without `--yes` when there's no terminal", async () => {
	await runUpdate("button");

	expect(cancel).toHaveBeenCalledWith(expect.stringContaining("--yes"));
	expect(process.exit).toHaveBeenCalledWith(1);
	expect(registry.fetchRegistryItems).not.toHaveBeenCalled();
});

it("finds the package manager before updating anything", async () => {
	vi.mocked(detectPM).mockRejectedValue(new Error("Couldn't detect a package manager."));

	await runUpdate("-y", "--all");

	expect(detectPM).toHaveBeenCalledWith(path.resolve(cwd), true);
	expect(cancel).toHaveBeenCalledWith(expect.stringContaining("Couldn't detect a package manager"));
	expect(p.tasks).not.toHaveBeenCalled();
	expect(process.exit).toHaveBeenCalledWith(1);
});

it("installs with the detected package manager", async () => {
	await runUpdate("-y", "button");

	expect(p.tasks).toHaveBeenCalled();
	expect(installDependencies).toHaveBeenCalledWith(
		expect.objectContaining({ installWith: "pnpm", install: true, prompt: false })
	);
});

it.each(["--no-install", "--no-deps-install"])(
	"updates dependencies without installing them with %s",
	async (flag) => {
		await runUpdate("-y", flag, "button");

		expect(detectPM).not.toHaveBeenCalled();
		expect(installDependencies).toHaveBeenCalledWith(expect.objectContaining({ install: false }));
	}
);
