import { describe, expect, it } from "vitest";
import { mergeThemeCss } from "../src/utils/css.js";
import { resolveProjectPath } from "../src/utils/templates.js";

describe("resolveProjectPath", () => {
	const directory = { lib: "src/lib", kitRoutes: "src/routes", src: "src" };

	it("maps registry and lib/routes paths", () => {
		expect(resolveProjectPath("registry.json", directory)).toBe("registry.json");
		expect(resolveProjectPath("src/lib/utils.ts", directory)).toBe("src/lib/utils.ts");
		expect(resolveProjectPath("src/lib/registry/ui/button/button.svelte", directory)).toBe(
			"src/lib/registry/ui/button/button.svelte"
		);
		expect(resolveProjectPath("src/routes/+page.svelte", directory)).toBe(
			"src/routes/+page.svelte"
		);
	});

	it("respects custom kit directories", () => {
		const custom = { lib: "src/my-lib", kitRoutes: "src/my-routes", src: "src" };
		expect(resolveProjectPath("src/lib/utils.ts", custom)).toBe("src/my-lib/utils.ts");
		expect(resolveProjectPath("src/routes/+page.svelte", custom)).toBe(
			"src/my-routes/+page.svelte"
		);
	});
});

describe("mergeThemeCss", () => {
	it("appends theme CSS once", () => {
		const template = `@import "tailwindcss";
@import "tw-animate-css";

:root {
	--color-sidebar-ring: var(--sidebar-ring);
	--radius: 0.625rem;
}
`;
		const once = mergeThemeCss("@import 'tailwindcss';\n\n", template);
		expect(once).toContain("tw-animate-css");

		const twice = mergeThemeCss(once, template);
		expect(twice).toBe(once);
	});
});
