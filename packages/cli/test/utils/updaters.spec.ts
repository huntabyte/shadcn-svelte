import { describe, it, expect } from "vitest";
import { updateCssVars } from "../../src/utils/updaters";

describe("updateCssVars", () => {
	it("should return unchanged CSS when no vars are provided", () => {
		const source = ":root { --test: value; }";
		const result = updateCssVars(source, {});
		expect(result.css).toBe(source);
		expect(result.status).toEqual({
			updated: [],
			skipped: [],
			added: [],
		});
	});

	it("should update existing light theme variables", () => {
		const source = `:root {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const expected = `:root {
			--primary: new;
			--secondary: new;
			--unrelated: value;
		}`;
		const cssVars = {
			light: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(expected);
		expect(result.status.updated).toContain(":root");
	});

	it("should update existing dark theme variables", () => {
		const source = `.dark {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const expected = `.dark {
			--primary: new;
			--secondary: new;
			--unrelated: value;
		}`;
		const cssVars = {
			dark: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(expected);
		expect(result.status.updated).toContain(".dark");
	});

	it("should update existing theme variables", () => {
		const source = `@theme {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const expected = `@theme {
			--primary: new;
			--secondary: new;
			--unrelated: value;
		}`;
		const cssVars = {
			theme: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(expected);
		expect(result.status.updated).toContain("@theme");
	});

	it("should add new variables that don't exist", () => {
		const source = `:root {
			--existing: value;
			--unrelated: value;
		}`;
		const expected = `:root {
			--existing: new;
			--unrelated: value;
			--newVar: value;
		}`;
		const cssVars = {
			light: {
				existing: "new",
				newVar: "value",
			},
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(expected);
		expect(result.status.added).toContain("--newVar");
	});

	it("should track skipped selectors", () => {
		const source = `:root {
			--test: value;
		}`;
		const cssVars = {
			dark: {
				test: "value",
			},
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(source);
		expect(result.status.skipped).toContain(".dark");
	});

	it("should handle missing selectors gracefully", () => {
		const source = `.some-other-class {
			--test: value;
		}`;
		const cssVars = {
			light: { primary: "new" },
			dark: { secondary: "new" },
			theme: { tertiary: "new" },
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(source);
		expect(result.status.skipped).toContain(":root");
		expect(result.status.skipped).toContain(".dark");
		expect(result.status.skipped).toContain("@theme");
		expect(result.status.updated).toHaveLength(0);
		expect(result.status.added).toHaveLength(0);
	});

	it("should handle multiple theme updates simultaneously", () => {
		const source = `:root {
			--primary: old;
			--unrelated: value;
		}
		.dark {
			--secondary: old;
			--unrelated: value;
		}
		@theme {
			--tertiary: old;
			--unrelated: value;
		}`;
		const expected = `:root {
			--primary: new;
			--unrelated: value;
		}
		.dark {
			--secondary: new;
			--unrelated: value;
		}
		@theme {
			--tertiary: new;
			--unrelated: value;
		}`;
		const cssVars = {
			light: { primary: "new" },
			dark: { secondary: "new" },
			theme: { tertiary: "new" },
		};
		const result = updateCssVars(source, cssVars);
		expect(result.css).toBe(expected);
		expect(result.status.updated).toHaveLength(3);
	});
});
