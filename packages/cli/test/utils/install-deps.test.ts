import fs from "node:fs";
import { exec } from "tinyexec";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as autoDetect from "../../src/utils/auto-detect.js";
import * as project from "../../src/utils/project.js";
import { CLIError } from "../../src/utils/errors.js";
import { installDependencies } from "../../src/utils/install-deps.js";

vi.mock("tinyexec", () => ({ exec: vi.fn(() => ({})) }));

vi.mock("../../src/utils/auto-detect.js", () => ({ detectPM: vi.fn() }));

vi.mock("../../src/utils/project.js", () => ({
	getPackageInfo: vi.fn(),
	isUsingSvelteKitV3: vi.fn(),
	syncSvelteKit: vi.fn(),
}));

vi.mock("node:fs", async (importOriginal) => {
	const actual = await importOriginal<typeof import("node:fs")>();
	return {
		...actual,
		default: {
			...actual,
			readFileSync: vi.fn(),
			writeFileSync: vi.fn(),
		},
		readFileSync: vi.fn(),
		writeFileSync: vi.fn(),
	};
});

vi.mock("@clack/prompts", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@clack/prompts")>();
	return {
		...actual,
		taskLog: vi.fn(() => ({ message: vi.fn(), error: vi.fn(), success: vi.fn() })),
		cancel: vi.fn(),
	};
});

const args = () => vi.mocked(exec).mock.calls.map((c) => c[1] as string[]);
const commands = () => vi.mocked(exec).mock.calls.map((c) => c[0] as string);

const packageJson = (overrides: Record<string, unknown> = {}) =>
	JSON.stringify(
		{
			name: "test",
			dependencies: {},
			devDependencies: { "tailwind-variants": "^0.3.0", "tw-animate-css": "^1.0.0" },
			...overrides,
		},
		null,
		"\t"
	) + "\n";

beforeEach(() => {
	vi.clearAllMocks();
	vi.mocked(autoDetect.detectPM).mockResolvedValue("pnpm");
	vi.mocked(project.getPackageInfo).mockReturnValue({
		dependencies: {},
		devDependencies: { "tailwind-variants": "^0.3.0", "tw-animate-css": "^1.0.0" },
	} as ReturnType<typeof project.getPackageInfo>);
	vi.mocked(project.isUsingSvelteKitV3).mockReturnValue(false);
	vi.mocked(project.syncSvelteKit).mockResolvedValue();
	vi.mocked(fs.readFileSync).mockReturnValue(packageJson());
	vi.mocked(exec).mockResolvedValue({ stdout: "", stderr: "" } as Awaited<ReturnType<typeof exec>>);
});

describe("installDependencies", () => {
	it("reinstalls a present package when an explicit range isn't satisfied", async () => {
		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: [],
			// installed tailwind-variants is ^0.3.0, which doesn't satisfy ^1.0.0
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		expect(exec).toHaveBeenCalledTimes(1);
		expect(args()[0]).toContain("-D");
		expect(args()[0]).toContain("tailwind-variants@^1.0.0");
	});

	it("skips a present package when an explicit range is satisfied", async () => {
		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: [],
			// installed tailwind-variants ^0.3.0 satisfies ^0.3.0
			devDependencies: ["tailwind-variants@^0.3.0"],
		});

		expect(exec).not.toHaveBeenCalled();
	});

	it("preserves the existing section when installing an unsatisfied package", async () => {
		vi.mocked(project.getPackageInfo).mockReturnValue({
			dependencies: { "tailwind-variants": "^0.3.0" },
			devDependencies: {},
		} as ReturnType<typeof project.getPackageInfo>);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: [],
			// registry targets this as a devDependency, but it's already in dependencies
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		expect(exec).toHaveBeenCalledTimes(1);
		expect(args()[0]).not.toContain("-D");
		expect(args()[0]).toContain("tailwind-variants@^1.0.0");
	});

	it("installs with -D when the package already lives in devDependencies", async () => {
		vi.mocked(project.getPackageInfo).mockReturnValue({
			dependencies: {},
			devDependencies: { clsx: "^1.0.0" },
		} as ReturnType<typeof project.getPackageInfo>);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: ["clsx@^2.0.0"],
			devDependencies: [],
		});

		expect(exec).toHaveBeenCalledTimes(1);
		expect(args()[0]).toContain("-D");
		expect(args()[0]).toContain("clsx@^2.0.0");
	});

	it("restores SvelteKit 3 generated config after installing dependencies", async () => {
		vi.mocked(project.isUsingSvelteKitV3).mockReturnValue(true);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: [],
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		expect(project.syncSvelteKit).toHaveBeenCalledWith("/test");
	});

	it("preserves an actionable SvelteKit sync error after installing dependencies", async () => {
		vi.mocked(project.isUsingSvelteKitV3).mockReturnValue(true);
		vi.mocked(project.syncSvelteKit).mockRejectedValue(
			new CLIError("Install dependencies and try again.")
		);

		await expect(
			installDependencies({
				cwd: "/test",
				prompt: false,
				silent: true,
				dependencies: [],
				devDependencies: ["tailwind-variants@^1.0.0"],
			})
		).rejects.toThrow("Install dependencies and try again.");
	});

	it("does not add a post-install sync for SvelteKit 2", async () => {
		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			dependencies: [],
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		expect(project.syncSvelteKit).not.toHaveBeenCalled();
	});

	it("writes package.json without running pm add when install is false", async () => {
		vi.mocked(exec).mockResolvedValue({
			stdout: "2.1.1\n",
			stderr: "",
		} as Awaited<ReturnType<typeof exec>>);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: ["clsx@latest"],
			devDependencies: [],
		});

		expect(commands().every((cmd) => cmd !== "pnpm" || !args()[0]?.includes("add"))).toBe(true);
		expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

		const written = vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string;
		const parsed = JSON.parse(written) as { dependencies: Record<string, string> };
		expect(parsed.dependencies.clsx).toBe("^2.1.1");
		expect(written.endsWith("\n")).toBe(true);
		expect(written).toContain("\t");
	});

	it("resolves dist-tags via the package manager view command", async () => {
		vi.mocked(exec).mockResolvedValue({
			stdout: "2.0.0-next.0\n",
			stderr: "",
		} as Awaited<ReturnType<typeof exec>>);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: ["clsx@next"],
			devDependencies: [],
		});

		expect(exec).toHaveBeenCalledWith(
			"pnpm",
			["view", "clsx@next", "version"],
			expect.objectContaining({ nodeOptions: { cwd: "/test" } })
		);

		const written = JSON.parse(vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string) as {
			dependencies: Record<string, string>;
		};
		expect(written.dependencies.clsx).toBe("^2.0.0-next.0");
	});

	it("falls back to writing the tag as-is when view resolution fails", async () => {
		vi.mocked(exec).mockRejectedValue(new Error("view failed"));

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: ["clsx@latest"],
			devDependencies: [],
		});

		const written = JSON.parse(vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string) as {
			dependencies: Record<string, string>;
		};
		expect(written.dependencies.clsx).toBe("latest");
	});

	it("does not rewrite satisfied entries when install is false", async () => {
		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: [],
			devDependencies: ["tailwind-variants@^0.3.0"],
		});

		expect(exec).not.toHaveBeenCalled();
		expect(fs.writeFileSync).not.toHaveBeenCalled();
	});

	it("writes semver ranges as-is without resolving", async () => {
		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: [],
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		expect(exec).not.toHaveBeenCalled();
		const written = JSON.parse(vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string) as {
			devDependencies: Record<string, string>;
		};
		expect(written.devDependencies["tailwind-variants"]).toBe("^1.0.0");
	});

	it("falls back to npm view when the package manager view fails", async () => {
		vi.mocked(exec)
			.mockRejectedValueOnce(new Error("pnpm view failed"))
			.mockResolvedValueOnce({
				stdout: "2.1.1\n",
				stderr: "",
				exitCode: 0,
			} as Awaited<ReturnType<typeof exec>>);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: ["clsx@latest"],
			devDependencies: [],
		});

		expect(exec).toHaveBeenCalledWith(
			"npm",
			["view", "clsx@latest", "version"],
			expect.objectContaining({ nodeOptions: { cwd: "/test" } })
		);

		const written = JSON.parse(vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string) as {
			dependencies: Record<string, string>;
		};
		expect(written.dependencies.clsx).toBe("^2.1.1");
	});

	it("leaves a package in dependencies when a satisfied version is targeted as a devDependency", async () => {
		vi.mocked(project.getPackageInfo).mockReturnValue({
			dependencies: { clsx: "^2.1.0" },
			devDependencies: {},
		} as ReturnType<typeof project.getPackageInfo>);
		vi.mocked(fs.readFileSync).mockReturnValue(
			packageJson({
				dependencies: { clsx: "^2.1.0" },
				devDependencies: {},
			})
		);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: [],
			devDependencies: ["clsx@^2.0.0"],
		});

		expect(exec).not.toHaveBeenCalled();
		expect(fs.writeFileSync).not.toHaveBeenCalled();
	});

	it("updates the version in place when the package is in the other section and unsatisfied", async () => {
		vi.mocked(project.getPackageInfo).mockReturnValue({
			dependencies: { "tailwind-variants": "^0.3.0" },
			devDependencies: {},
		} as ReturnType<typeof project.getPackageInfo>);
		vi.mocked(fs.readFileSync).mockReturnValue(
			packageJson({
				dependencies: { "tailwind-variants": "^0.3.0" },
				devDependencies: {},
			})
		);

		await installDependencies({
			cwd: "/test",
			prompt: false,
			silent: true,
			install: false,
			dependencies: [],
			devDependencies: ["tailwind-variants@^1.0.0"],
		});

		const written = JSON.parse(vi.mocked(fs.writeFileSync).mock.calls[0]![1] as string) as {
			dependencies: Record<string, string>;
			devDependencies?: Record<string, string>;
		};
		expect(written.dependencies["tailwind-variants"]).toBe("^1.0.0");
		expect(written.devDependencies?.["tailwind-variants"]).toBeUndefined();
	});
});
