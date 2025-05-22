import { describe, it, expect } from "vitest";
import {
	transformContent,
	transformImports,
	stripTypes,
	transformCss,
} from "../../src/utils/transformers";
import type { ResolvedConfig } from "../../src/utils/get-config";

const mockConfig: ResolvedConfig = {
	tailwind: {
		css: "src/app.css",
		baseColor: "zinc",
	},
	aliases: {
		utils: "$lib/utils",
		components: "$lib/components",
		hooks: "$lib/hooks",
		ui: "$lib/components/ui",
		lib: "$lib",
	},
	resolvedPaths: {
		components: "./src/lib/components",
		tailwindCss: "./src/app.css",
		utils: "./src/lib/utils",
		cwd: "./",
		hooks: "./src/lib/hooks",
		ui: "./src/lib/components/ui",
		lib: "./src/lib",
	},
	sveltekit: true,
	typescript: true,
	registry: "https://next.shadcn-svelte.com/registry",
};

describe("transformImports", () => {
	it("transforms component imports correctly", () => {
		const content = 'import { Button } from "$COMPONENTS$/button";';
		const expected = 'import { Button } from "$lib/components/button";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms UI imports correctly", () => {
		const content = 'import { Button } from "$UI$/button";';
		const expected = 'import { Button } from "$lib/components/ui/button";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms hook imports correctly", () => {
		const content = 'import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms utils imports correctly", () => {
		const content = 'import { cn } from "$UTILS$/index.js";';
		const expected = 'import { cn } from "$lib/utils/index.js";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("handles multiple imports in the same file", () => {
		const content = `
      import { Button } from "$COMPONENTS$/button";
      import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";
      import { cn } from "$UTILS$";
    `;
		const expected = `
      import { Button } from "$lib/components/button";
      import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
      import { cn } from "$lib/utils";
    `;
		expect(transformImports(content, mockConfig)).toBe(expected);
	});
});

describe("stripTypes", () => {
	it("strips types from TypeScript files", async () => {
		const content = `
      interface Props {
        name: string;
      }
      export function Component({ name }: Props) {
        return name;
      }
    `;
		const result = await stripTypes(content, "test.ts");
		expect(result).not.toContain("interface Props");
		expect(result).not.toContain(": Props");
	});

	it("strips types from Svelte files", async () => {
		const content = `
      <script lang="ts">
        interface Props {
          name: string;
        }
        export let name: string;
      </script>
      <div>{name}</div>
    `;
		const result = await stripTypes(content, "test.svelte");
		expect(result).not.toContain("interface Props");
		expect(result).not.toContain(": string");
	});

	it("removes consecutive newlines", async () => {
		const content = `
      interface Props {
        name: string;
      }


      export function Component({ name }: Props) {
        return name;
      }
    `;
		const result = await stripTypes(content, "test.ts");
		expect(result).not.toMatch(/\n\s*\n\s*\n/);
	});
});

describe("transformContent", () => {
	it("transforms content with TypeScript enabled", async () => {
		const content = `
      import { Button } from "$COMPONENTS$/button";
      interface Props {
        name: string;
      }
      export function Component({ name }: Props) {
        return name;
      }
    `;
		const result = await transformContent(content, "test.ts", mockConfig);
		expect(result).toContain('import { Button } from "$lib/components/button"');
		expect(result).toContain("interface Props");
	});

	it("transforms content with TypeScript disabled", async () => {
		const content = `
      import { Button } from "$COMPONENTS$/button";
      interface Props {
        name: string;
      }
      export function Component({ name }: Props) {
        return name;
      }
    `;
		const config = { ...mockConfig, typescript: false };
		const result = await transformContent(content, "test.ts", config);
		expect(result).not.toContain("interface Props");
		expect(result).not.toContain(": Props");
		expect(result).toContain("export function Component({ name })");
	});
});

describe("transformImports with more custom paths", () => {
	const customConfig: ResolvedConfig = {
		tailwind: {
			css: "styles/global.css",
			baseColor: "slate",
		},
		aliases: {
			utils: "@lib/helpers",
			components: "@components",
			hooks: "@hooks",
			ui: "@ui",
			lib: "@lib",
		},
		resolvedPaths: {
			components: "./src/components",
			tailwindCss: "./styles/global.css",
			utils: "./src/helpers",
			cwd: "./",
			hooks: "./src/hooks",
			ui: "./src/ui",
			lib: "./src/lib",
		},
		sveltekit: true,
		typescript: true,
		registry: "https://next.shadcn-svelte.com/registry",
	};

	it("transforms component imports with custom paths", () => {
		const content = 'import { Button } from "$COMPONENTS$/button";';
		const expected = 'import { Button } from "@components/button";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms UI imports with custom paths", () => {
		const content = 'import { Button } from "$UI$/button";';
		const expected = 'import { Button } from "@ui/button";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms hook imports with custom paths", () => {
		const content = 'import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "@hooks/is-mobile.svelte.js";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms utils imports with custom paths", () => {
		const content = 'import { cn } from "$UTILS$/index.js";';
		const expected = 'import { cn } from "@lib/helpers/index.js";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("handles multiple imports with custom paths", () => {
		const content = `
      import { Button } from "$COMPONENTS$/button";
      import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";
      import { cn } from "$UTILS$";
    `;
		const expected = `
      import { Button } from "@components/button";
      import { IsMobile } from "@hooks/is-mobile.svelte.js";
      import { cn } from "@lib/helpers";
    `;
		expect(transformImports(content, customConfig)).toBe(expected);
	});
});

describe("updateCssVars", () => {
	it("should return unchanged CSS when no vars are provided", () => {
		const source = ":root { --test: value; }";
		const result = transformCss(source, {});
		expect(result).toMatchInlineSnapshot(`":root { --test: value; }"`);
	});

	it("should update existing light theme variables", () => {
		const source = `:root {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const cssVars = {
			light: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			":root {
						--primary: new;
						--secondary: new;
						--unrelated: value;
					}"
		`);
	});

	it("should update existing dark theme variables", () => {
		const source = `.dark {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const cssVars = {
			dark: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			".dark {
						--primary: new;
						--secondary: new;
						--unrelated: value;
					}"
		`);
	});

	it("should update existing theme variables", () => {
		const source = `@theme {
			--primary: old;
			--secondary: old;
			--unrelated: value;
		}`;
		const cssVars = {
			theme: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			"@theme {
						--primary: new;
						--secondary: new;
						--unrelated: value;
					}"
		`);
	});

	it("should add new variables that don't exist", () => {
		const source = `:root {
			--existing: value;
			--unrelated: value;
		}`;
		const cssVars = {
			light: {
				existing: "new",
				newVar: "value",
			},
		};
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			":root {
						--existing: new;
						--unrelated: value;
						--newVar: value;
					}"
		`);
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
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			":root {
						--test: value;
					}"
		`);
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
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			".some-other-class {
						--test: value;
					}"
		`);
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
		const cssVars = {
			light: { primary: "new" },
			dark: { secondary: "new" },
			theme: { tertiary: "new" },
		};
		const result = transformCss(source, cssVars);
		expect(result).toMatchInlineSnapshot(`
			":root {
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
					}"
		`);
	});

	it("should add plugins that don't exist", () => {
		const source = `:root {
			--primary: old;
		}`;
		const result = transformCss(source, {}, { plugins: ["my-plugin"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "my-plugin";
			:root {
						--primary: old;
					}"
		`);
	});

	it("should add multiple plugins", () => {
		const source = `@plugin "unrelated-plugin";
		:root {
			--primary: old;
		}`;
		const result = transformCss(source, {}, { plugins: ["plugin1", "plugin2"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "unrelated-plugin";
			@plugin "plugin2";
			@plugin "plugin1";
					:root {
						--primary: old;
					}"
		`);
	});

	it("should not add/duplicate plugins that already exist", () => {
		const source = `@plugin "plugin1";
		:root {
			--primary: old;
		}`;
		const result = transformCss(source, {}, { plugins: ["plugin1"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "plugin1";
					:root {
						--primary: old;
					}"
		`);
	});

	it("should add plugins after imports if imports exist and no other plugins exist", () => {
		const source = `@import "tailwindcss";
		:root {
			--primary: old;
		}`;
		const result = transformCss(source, {}, { plugins: ["plugin2"] });
		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";
			@plugin "plugin2";
					:root {
						--primary: old;
					}"
		`);
	});

	it("should add plugins after other plugins if other plugins exist", () => {
		const source = `@plugin "plugin1";
		@plugin "plugin2";
		:root {
			--primary: old;
		}`;
		const result = transformCss(source, {}, { plugins: ["plugin3"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "plugin1";
					@plugin "plugin2";
					@plugin "plugin3";
					:root {
						--primary: old;
					}"
		`);
	});
});
