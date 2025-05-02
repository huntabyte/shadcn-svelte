import { describe, it, expect } from "vitest";
import { transformContent, transformImports, stripTypes } from "../../src/utils/transformers";
import type { Config } from "../../src/utils/get-config";

const mockConfig: Config = {
	tailwind: {
		css: "src/app.css",
		baseColor: "zinc",
	},
	aliases: {
		utils: "$lib/utils",
		components: "$lib/components",
		hooks: "$lib/hooks",
		ui: "$lib/components/ui",
	},
	resolvedPaths: {
		components: "./src/lib/components",
		tailwindCss: "./src/app.css",
		utils: "./src/lib/utils",
		cwd: "./",
		hooks: "./src/lib/hooks",
		ui: "./src/lib/components/ui",
	},
	typescript: true,
	registry: "https://next.shadcn-svelte.com/registry",
};

describe("transformImports", () => {
	it("transforms component imports correctly", () => {
		const content = 'import { Button } from "$lib/registry/default/components/button";';
		const expected = 'import { Button } from "$lib/components/button";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms UI imports correctly", () => {
		const content = 'import { Button } from "$lib/registry/default/ui/button";';
		const expected = 'import { Button } from "$lib/components/ui/button";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms hook imports correctly", () => {
		const content =
			'import { IsMobile } from "$lib/registry/default/hook/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("transforms utils imports correctly", () => {
		const content = 'import { cn } from "$lib/utils/index.js";';
		const expected = 'import { cn } from "$lib/utils/index.js";';
		expect(transformImports(content, mockConfig)).toBe(expected);
	});

	it("handles multiple imports in the same file", () => {
		const content = `
      import { Button } from "$lib/registry/default/components/button";
      import { IsMobile } from "$lib/registry/default/hook/is-mobile.svelte.js";
      import { cn } from "$lib/utils";
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
      import { Button } from "$lib/registry/default/components/button";
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
      import { Button } from "$lib/registry/default/components/button";
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
	const customConfig: Config = {
		tailwind: {
			css: "styles/global.css",
			baseColor: "slate",
		},
		aliases: {
			utils: "@lib/helpers",
			components: "@components",
			hooks: "@hooks",
			ui: "@ui",
		},
		resolvedPaths: {
			components: "./src/components",
			tailwindCss: "./styles/global.css",
			utils: "./src/helpers",
			cwd: "./",
			hooks: "./src/hooks",
			ui: "./src/ui",
		},
		typescript: true,
		registry: "https://next.shadcn-svelte.com/registry",
	};

	it("transforms component imports with custom paths", () => {
		const content = 'import { Button } from "$lib/registry/default/components/button";';
		const expected = 'import { Button } from "@components/button";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms UI imports with custom paths", () => {
		const content = 'import { Button } from "$lib/registry/default/ui/button";';
		const expected = 'import { Button } from "@ui/button";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms hook imports with custom paths", () => {
		const content =
			'import { IsMobile } from "$lib/registry/default/hook/is-mobile.svelte.js";';
		const expected = 'import { IsMobile } from "@hooks/is-mobile.svelte.js";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("transforms utils imports with custom paths", () => {
		const content = 'import { cn } from "$lib/utils/index.js";';
		const expected = 'import { cn } from "@lib/helpers/index.js";';
		expect(transformImports(content, customConfig)).toBe(expected);
	});

	it("handles multiple imports with custom paths", () => {
		const content = `
      import { Button } from "$lib/registry/default/components/button";
      import { IsMobile } from "$lib/registry/default/hook/is-mobile.svelte.js";
      import { cn } from "$lib/utils";
    `;
		const expected = `
      import { Button } from "@components/button";
      import { IsMobile } from "@hooks/is-mobile.svelte.js";
      import { cn } from "@lib/helpers";
    `;
		expect(transformImports(content, customConfig)).toBe(expected);
	});
});
