import { detect } from "package-manager-detector";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { npxShadcnSvelte } from "../src/utils.js";

vi.mock("package-manager-detector", async (importOriginal) => {
	const actual = await importOriginal<typeof import("package-manager-detector")>();
	return {
		...actual,
		detect: vi.fn(),
	};
});

describe("npxShadcnSvelte", () => {
	beforeEach(() => {
		vi.mocked(detect).mockReset();
	});

	it("uses npx by default", async () => {
		vi.mocked(detect).mockResolvedValue(null);
		await expect(npxShadcnSvelte("add button")).resolves.toBe(
			"npx shadcn-svelte@latest add button"
		);
	});

	it("uses pnpm dlx for pnpm", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "pnpm", name: "pnpm" });
		await expect(npxShadcnSvelte("mcp")).resolves.toBe("pnpm dlx shadcn-svelte@latest mcp");
	});

	it("uses bun x for bun", async () => {
		vi.mocked(detect).mockResolvedValue({ agent: "bun", name: "bun" });
		await expect(npxShadcnSvelte("mcp")).resolves.toBe("bun x shadcn-svelte@latest mcp");
	});
});
