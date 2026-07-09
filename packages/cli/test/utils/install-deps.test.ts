import { beforeEach, describe, expect, it, vi } from "vitest";
import { exec } from "tinyexec";
import { installDependencies } from "../../src/utils/install-deps.js";
import * as autoDetect from "../../src/utils/auto-detect.js";
import * as project from "../../src/utils/project.js";

vi.mock("tinyexec", () => ({ exec: vi.fn(() => ({})) }));

vi.mock("../../src/utils/auto-detect.js", () => ({ detectPM: vi.fn() }));

vi.mock("../../src/utils/project.js", () => ({ getPackageInfo: vi.fn() }));

vi.mock("@clack/prompts", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@clack/prompts")>();
	return {
		...actual,
		taskLog: vi.fn(() => ({ message: vi.fn(), error: vi.fn(), success: vi.fn() })),
		cancel: vi.fn(),
	};
});

const args = () => vi.mocked(exec).mock.calls.map((c) => c[1] as string[]);

beforeEach(() => {
	vi.clearAllMocks();
	vi.mocked(autoDetect.detectPM).mockResolvedValue("pnpm");
	vi.mocked(project.getPackageInfo).mockReturnValue({
		dependencies: {},
		devDependencies: { "tailwind-variants": "^0.3.0", "tw-animate-css": "^1.0.0" },
	} as ReturnType<typeof project.getPackageInfo>);
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
});
