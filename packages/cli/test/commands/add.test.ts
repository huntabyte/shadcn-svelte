import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { tmpdir } from "node:os";
import * as p from "@clack/prompts";
import { Command } from "commander";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { add } from "../../src/commands/add/index.js";
import { addRegistryItems } from "../../src/utils/add-registry-items.js";
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

vi.mock("@clack/prompts", async (importOriginal) => ({
	...(await importOriginal<typeof import("@clack/prompts")>()),
	cancel: vi.fn(),
}));

vi.mock("../../src/utils/config/index.js", () => ({
	getConfig: vi.fn(async () => config),
}));

vi.mock("../../src/utils/preconditions.js", () => ({
	checkPreconditions: vi.fn(({ config }) => config),
}));

vi.mock("../../src/utils/registry/index.js", () => ({
	getRegistryUrl: vi.fn(() => "https://example.com/registry"),
	getRegistryIndex: vi.fn(async () => []),
}));

vi.mock("../../src/utils/add-registry-items.js", () => ({
	addRegistryItems: vi.fn(),
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
const warn = vi.spyOn(p.log, "warn");
const cancel = vi.mocked(p.cancel);

let cwd: string;
let isTTY: PropertyDescriptor | undefined;

beforeEach(() => {
	vi.clearAllMocks();
	cwd = fs.mkdtempSync(path.join(tmpdir(), "shadcn-svelte-add-"));
	isTTY = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
	Object.defineProperty(process.stdin, "isTTY", { value: false, configurable: true });
	vi.mocked(detectPM).mockResolvedValue("pnpm");
	vi.mocked(addRegistryItems).mockResolvedValue({
		dependencies: new Set(["bits-ui"]),
		devDependencies: new Set<string>(),
		skippedDeps: new Set<string>(),
		skippedItems: [],
		skippedStylesheet: false,
	});
});

afterEach(() => {
	if (isTTY) Object.defineProperty(process.stdin, "isTTY", isTTY);
	else delete (process.stdin as { isTTY?: boolean }).isTTY;
	fs.rmSync(cwd, { recursive: true, force: true });
});

async function runAdd(...args: string[]) {
	const program = new Command();
	program.addCommand(add);
	await program.parseAsync(["node", "shadcn-svelte", "add", "-c", cwd, ...args]);
}

it("fails without `--yes` when there's no terminal", async () => {
	await runAdd("button");

	expect(cancel).toHaveBeenCalledWith(expect.stringContaining("--yes"));
	expect(process.exit).toHaveBeenCalledWith(1);
	expect(addRegistryItems).not.toHaveBeenCalled();
});

it("fails without components when there's no terminal", async () => {
	await runAdd("-y");

	expect(cancel).toHaveBeenCalledWith(expect.stringContaining("--all"));
	expect(process.exit).toHaveBeenCalledWith(1);
	expect(addRegistryItems).not.toHaveBeenCalled();
});

it.each([
	{ flags: [], overwrite: undefined },
	{ flags: ["--overwrite"], overwrite: true },
	{ flags: ["--no-overwrite"], overwrite: false },
])("passes $flags through to the overwrite option", async ({ flags, overwrite }) => {
	await runAdd("-y", "button", ...flags);

	expect(addRegistryItems).toHaveBeenCalledWith(
		expect.objectContaining({ selectedItems: ["button"], overwrite, interactive: false })
	);
	expect(vi.mocked(addRegistryItems).mock.calls[0]![0].stylesheet).toBeUndefined();
});

it.each([
	{ args: ["dialog", "-o", "button"], selectedItems: ["dialog", "button"], overwrite: ["button"] },
	// commander reads the components as the option's values
	{
		args: ["-o", "button", "card"],
		selectedItems: ["button", "card"],
		overwrite: ["button", "card"],
	},
	{
		args: ["-o", "button", "--", "card"],
		selectedItems: ["card", "button"],
		overwrite: ["button"],
	},
	{ args: ["-o", "sidebar..."], selectedItems: ["sidebar"], overwrite: ["sidebar..."] },
])("adds the items to overwrite: $args", async ({ args, selectedItems, overwrite }) => {
	await runAdd("-y", ...args);

	expect(addRegistryItems).toHaveBeenCalledWith(
		expect.objectContaining({ selectedItems, overwrite })
	);
});

it("finds the package manager before adding anything", async () => {
	vi.mocked(detectPM).mockRejectedValue(new Error("Couldn't detect a package manager."));

	await runAdd("-y", "button");

	expect(detectPM).toHaveBeenCalledWith(path.resolve(cwd), true);
	expect(cancel).toHaveBeenCalledWith(expect.stringContaining("Couldn't detect a package manager"));
	expect(addRegistryItems).not.toHaveBeenCalled();
	expect(process.exit).toHaveBeenCalledWith(1);
});

it("installs with the detected package manager", async () => {
	await runAdd("-y", "button");

	expect(installDependencies).toHaveBeenCalledWith(
		expect.objectContaining({ installWith: "pnpm", install: true, prompt: false })
	);
});

it("installs with `--install-with` without detecting", async () => {
	// npm comes with Node, so it's installed wherever the tests run
	await runAdd("-y", "--install-with", "npm", "button");

	expect(detectPM).not.toHaveBeenCalled();
	expect(installDependencies).toHaveBeenCalledWith(
		expect.objectContaining({ installWith: "npm", install: true })
	);
});

it.each(["--no-install", "--no-deps-install"])(
	"adds dependencies without installing them with %s",
	async (flag) => {
		await runAdd("-y", flag, "button");

		expect(detectPM).not.toHaveBeenCalled();
		expect(installDependencies).toHaveBeenCalledWith(expect.objectContaining({ install: false }));
	}
);

it("warns about the items and stylesheet it kept", async () => {
	vi.mocked(addRegistryItems).mockResolvedValue({
		dependencies: new Set<string>(),
		devDependencies: new Set<string>(),
		skippedDeps: new Set<string>(),
		skippedItems: ["button"],
		skippedStylesheet: true,
	});

	await runAdd("-y", "--no-overwrite", "button");

	expect(warn).toHaveBeenCalledWith(expect.stringMatching(/button.*--overwrite/s));
	expect(warn).toHaveBeenCalledWith(expect.stringMatching(/app\.css.*--overwrite/s));
});
