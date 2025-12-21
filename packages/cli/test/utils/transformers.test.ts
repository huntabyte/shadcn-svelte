import { describe, it, expect } from "vitest";
import {
	transform,
	transformImports,
	transformStripTypes,
} from "../../src/utils/transformers";
import { transformCss } from "../../src/utils/transform-css";
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
	designSystem: {
		style: "vega",
		theme: "neutral",
		iconLibrary: "lucide",
		fonts: [],
		menuAccent: "subtle",
		menuColor: "default",
		radius: "0.5rem",
	},
	sveltekit: true,
	typescript: true,
	registry: "https://shadcn-svelte.com/registry",
};

describe("transformImports", () => {
	it("transforms component imports correctly", async () => {
		const content = 'import { Button } from "$COMPONENTS$/button";';
		const expected = 'import { Button } from "$lib/components/button";';
		const result = await transformImports({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms UI imports correctly", async () => {
		const content = 'import { Button } from "$UI$/button";';
		const expected = 'import { Button } from "$lib/components/ui/button";';
		const result = await transformImports({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms hook imports correctly", async () => {
		const content = 'import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";';
		const result = await transformImports({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms utils imports correctly", async () => {
		const content = 'import { cn } from "$UTILS$/index.js";';
		const expected = 'import { cn } from "$lib/utils/index.js";';
		const result = await transformImports({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).toBe(expected);
	});

	it("handles multiple imports in the same file", async () => {
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
		const result = await transformImports({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).toBe(expected);
	});
});

describe("transformStripTypes", () => {
	it("strips types from TypeScript files", async () => {
		const content = `
      interface Props {
        name: string;
      }
      export function Component({ name }: Props) {
        return name;
      }
    `;
		const result = await transformStripTypes({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).not.toContain("interface Props");
		expect(result.content).not.toContain(": Props");
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
		const result = await transformStripTypes({ content, filePath: "test.svelte", config: mockConfig });
		expect(result.content).not.toContain("interface Props");
		expect(result.content).not.toContain(": string");
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
		const result = await transformStripTypes({ content, filePath: "test.ts", config: mockConfig });
		expect(result.content).not.toMatch(/\n\s*\n\s*\n/);
	});
});

describe("transform", () => {
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
		const result = await transform(
			{ content, filePath: "test.ts", config: mockConfig },
			[transformImports]
		);
		expect(result.content).toContain('import { Button } from "$lib/components/button"');
		expect(result.content).toContain("interface Props");
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
		const result = await transform(
			{ content, filePath: "test.ts", config },
			[transformImports, transformStripTypes]
		);
		expect(result.content).not.toContain("interface Props");
		expect(result.content).not.toContain(": Props");
		expect(result.content).toContain("export function Component({ name })");
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
		designSystem: {
			style: "vega",
			theme: "neutral",
			iconLibrary: "lucide",
			fonts: [],
			menuAccent: "subtle",
			menuColor: "default",
			radius: "0.5rem",
		},
		sveltekit: true,
		typescript: true,
		registry: "https://shadcn-svelte.com/registry",
	};

	it("transforms component imports with custom paths", async () => {
		const content = 'import { Button } from "$COMPONENTS$/button";';
		const expected = 'import { Button } from "@components/button";';
		const result = await transformImports({ content, filePath: "test.ts", config: customConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms UI imports with custom paths", async () => {
		const content = 'import { Button } from "$UI$/button";';
		const expected = 'import { Button } from "@ui/button";';
		const result = await transformImports({ content, filePath: "test.ts", config: customConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms hook imports with custom paths", async () => {
		const content = 'import { IsMobile } from "$HOOKS$/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "@hooks/is-mobile.svelte.js";';
		const result = await transformImports({ content, filePath: "test.ts", config: customConfig });
		expect(result.content).toBe(expected);
	});

	it("transforms utils imports with custom paths", async () => {
		const content = 'import { cn } from "$UTILS$/index.js";';
		const expected = 'import { cn } from "@lib/helpers/index.js";';
		const result = await transformImports({ content, filePath: "test.ts", config: customConfig });
		expect(result.content).toBe(expected);
	});

	it("handles multiple imports with custom paths", async () => {
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
		const result = await transformImports({ content, filePath: "test.ts", config: customConfig });
		expect(result.content).toBe(expected);
	});
});

describe("updateCssVars", () => {
	it("should return unchanged CSS when no vars are provided", () => {
		const source = ":root { --test: value; }";
		const result = transformCss(source, {});
		expect(result).toMatchInlineSnapshot(`":root { --test: value; }"`);
	});

	it("should update existing light theme variables", () => {
		const source = `
:root {
	--primary: old;
	--secondary: old;
	--unrelated: value;
}
`.trim();
		const cssVars = {
			light: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			":root {
				--primary: new;
				--secondary: new;
				--unrelated: value;
			}"
		`);
	});

	it("should update existing dark theme variables", () => {
		const source = `
.dark {
	--primary: old;
	--secondary: old;
	--unrelated: value;
}
`.trim();
		const cssVars = {
			dark: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			".dark {
				--primary: new;
				--secondary: new;
				--unrelated: value;
			}"
		`);
	});

	it("should update existing theme variables", () => {
		const source = `
@theme {
	--primary: old;
	--secondary: old;
	--unrelated: value;
}
`.trim();
		const cssVars = {
			theme: {
				primary: "new",
				secondary: "new",
			},
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			"@theme {
				--primary: new;
				--secondary: new;
				--unrelated: value;
			}"
		`);
	});

	it("should add new variables that don't exist", () => {
		const source = `
:root {
	--existing: value;
	--unrelated: value;
}
`.trim();
		const cssVars = {
			light: {
				existing: "new",
				newVar: "value",
			},
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			":root {
				--existing: new;
				--unrelated: value;
				--newVar: value;
			}"
		`);
	});

	it("should track skipped selectors", () => {
		const source = `
:root {
	--test: value;
}
`.trim();
		const cssVars = {
			dark: {
				test: "value",
			},
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			":root {
				--test: value;
			}"
		`);
	});

	it("should handle missing selectors gracefully", () => {
		const source = `
.some-other-class {
	--test: value;
}
`.trim();
		const cssVars = {
			light: { primary: "new" },
			dark: { secondary: "new" },
			theme: { tertiary: "new" },
		};
		const result = transformCss(source, { cssVars });
		expect(result).toMatchInlineSnapshot(`
			".some-other-class {
				--test: value;
			}"
		`);
	});

	it("should handle multiple theme updates simultaneously", () => {
		const source = `
:root {
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
}
`.trim();
		const cssVars = {
			light: { primary: "new" },
			dark: { secondary: "new" },
			theme: { tertiary: "new" },
		};
		const result = transformCss(source, { cssVars });
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
		const source = `
:root {
	--primary: old;
}
`.trim();
		const result = transformCss(source, { plugins: ["my-plugin"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "my-plugin";
			:root {
				--primary: old;
			}"
		`);
	});

	it("should add multiple plugins", () => {
		const source = `
@plugin "unrelated-plugin";
:root {
	--primary: old;
}
`.trim();
		const result = transformCss(source, { plugins: ["plugin1", "plugin2"] });
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
		const source = `
@plugin "plugin1";
:root {
	--primary: old;
}
`.trim();
		const result = transformCss(source, { plugins: ["plugin1"] });
		expect(result).toMatchInlineSnapshot(`
			"@plugin "plugin1";
			:root {
				--primary: old;
			}"
		`);
	});

	it("should add plugins after imports if imports exist and no other plugins exist", () => {
		const source = `
@import "tailwindcss";
:root {
	--primary: old;
}
`.trim();
		const result = transformCss(source, { plugins: ["plugin2"] });
		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";
			@plugin "plugin2";
			:root {
				--primary: old;
			}"
		`);
	});

	it("should add plugins after other plugins if other plugins exist", () => {
		const source = `
@plugin "plugin1";
@plugin "plugin2";
:root {
	--primary: old;
}
`.trim();
		const result = transformCss(source, { plugins: ["plugin3"] });
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

describe("updateCss", () => {
	it("should add utility classes", async () => {
		const input = `@import "tailwindcss";`;

		const result = transformCss(input, {
			css: {
				"@utility content-auto": {
					"content-visibility": "auto",
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";

			@utility content-auto {
				content-visibility: auto;
			}"
		`);
	});

	it("should add utility classes with pseudo-selectors", async () => {
		const input = `@import "tailwindcss";`;

		const result = transformCss(input, {
			css: {
				"@utility scrollbar-hidden": {
					"&::-webkit-scrollbar": {
						display: "none",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";

			@utility scrollbar-hidden {
				&::-webkit-scrollbar {
					display: none;
				}
			}"
		`);
	});

	it("should add parameterized utility classes", async () => {
		const input = `@import "tailwindcss";`;

		const result = transformCss(input, {
			css: {
				"@utility tab-*": {
					"tab-size": "--value([integer])",
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";

			@utility tab-* {
				tab-size: --value([integer]);
			}"
		`);
	});

	it("should add component styles", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer components": {
					".card": {
						"background-color": "var(--color-white)",
						"border-radius": "var(--rounded-lg)",
						padding: "var(--spacing-6)",
						"box-shadow": "var(--shadow-xl)",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@layer components {
				.card {
					background-color: var(--color-white);
					border-radius: var(--rounded-lg);
					padding: var(--spacing-6);
					box-shadow: var(--shadow-xl);
				}
			}"
		`);
	});

	it("should add base styles", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer base": {
					h1: {
						"font-size": "var(--text-2xl)",
					},
					h2: {
						"font-size": "var(--text-xl)",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@layer base {
				h1 {
					font-size: var(--text-2xl);
				}
				h2 {
					font-size: var(--text-xl);
				}
			}"
    	`);
	});

	it("should update existing rules", async () => {
		const input = `
@import "tailwindcss";

@layer components {
	.card {
		background-color: white;
		padding: 1rem;
	}
}
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer components": {
					".card": {
						"background-color": "var(--color-white)",
						"border-radius": "var(--rounded-lg)",
						"box-shadow": "var(--shadow-xl)",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";

			@layer components {
				.card {
					background-color: var(--color-white);
					padding: 1rem;
					border-radius: var(--rounded-lg);
					box-shadow: var(--shadow-xl);
				}
			}"
		`);
	});

	it("should add multiple rules and types", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@utility content-auto": {
					"content-visibility": "auto",
				},
				"@layer components": {
					".card": {
						"background-color": "var(--color-white)",
						"border-radius": "var(--rounded-lg)",
					},
				},
				"@layer base": {
					h1: {
						"font-size": "var(--text-2xl)",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@utility content-auto {
				content-visibility: auto;
			}

			@layer components {
				.card {
					background-color: var(--color-white);
					border-radius: var(--rounded-lg);
				}
			}

			@layer base {
				h1 {
					font-size: var(--text-2xl);
				}
			}"
		`);
	});

	it("should handle nested selectors with &", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer components": {
					".button": {
						"background-color": "var(--color-primary)",
						"&:hover": {
							"background-color": "var(--color-primary-dark)",
						},
						"&:active": {
							"background-color": "var(--color-primary-darker)",
						},
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@layer components {
				.button {
					background-color: var(--color-primary);
				}
				.button:hover {
					background-color: var(--color-primary-dark);
				}
				.button:active {
					background-color: var(--color-primary-darker);
				}
			}"
		`);
	});

	it("should handle direct string content", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer base": {
					body: "font-family: var(--font-sans); line-height: 1.5;",
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@layer base {
				body {
					font-family: var(--font-sans);
					line-height: 1.5;
				}
			}"
		`);
	});

	it("should handle nested at-rules", async () => {
		const input = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`.trim();

		const result = transformCss(input, {
			css: {
				"@layer components": {
					"@media (min-width: 768px)": {
						".card": {
							padding: "2rem",
						},
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@tailwind base;
			@tailwind components;
			@tailwind utilities;

			@layer components {

				@media (min-width: 768px) {
					.card {
						padding: 2rem;
					}
				}
			}"
		`);
	});

	it("should place keyframes under @theme inline directive", async () => {
		const input = `@import "tailwindcss";`;

		const result = transformCss(input, {
			css: {
				"@keyframes spin": {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
			},
		});

		expect(result).toMatchInlineSnapshot(`
			"@import "tailwindcss";

			@theme inline {
				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			}"
		`);
	});
});
