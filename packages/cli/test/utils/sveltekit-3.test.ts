import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import * as p from "@clack/prompts";
import { afterEach, expect, it, vi } from "vitest";
import {
	getConfig,
	getDefaultAliases,
	promptForAliases,
	type RawConfig,
} from "../../src/utils/config/index.js";
import type { TsConfigResult } from "get-tsconfig";

vi.mock("@clack/prompts", async (importOriginal) => ({
	...(await importOriginal<typeof import("@clack/prompts")>()),
	text: vi.fn(),
}));

const tempDirs: string[] = [];

async function createProject(version: string) {
	const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "shadcn-svelte-config-"));
	tempDirs.push(cwd);
	await fs.writeFile(
		path.join(cwd, "package.json"),
		JSON.stringify({
			devDependencies: { "@sveltejs/kit": version },
			imports: { "#lib": "./src/lib/index.js", "#lib/*": "./src/lib/*" },
		})
	);
	return cwd;
}

afterEach(async () => {
	vi.restoreAllMocks();
	await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

it("uses version-specific default aliases", async () => {
	const kit2 = await createProject("^2.60.1");
	const kit3 = await createProject("^3.0.0-next.0");

	expect(getDefaultAliases(kit2)).toEqual({
		lib: "$lib",
		components: "$lib/components",
		ui: "$lib/components/ui",
		utils: "$lib/utils",
		hooks: "$lib/hooks",
	});
	expect(getDefaultAliases(kit3)).toEqual({
		lib: "#lib",
		components: "#lib/components",
		ui: "#lib/components/ui",
		utils: "#lib/utils",
		hooks: "#lib/hooks",
	});
});

it("keeps explicit alias options unchanged in SvelteKit 3", async () => {
	const cwd = await createProject("^3.0.0-next.0");
	const aliases = await promptForAliases({
		cwd,
		tsconfig: {} as TsConfigResult,
		existingConfig: undefined,
		libAlias: "@lib",
		componentsAlias: "@components",
		uiAlias: "@ui",
		utilsAlias: "@utils",
		hooksAlias: "@hooks",
	});

	expect(aliases).toEqual({
		libAlias: "@lib",
		componentAlias: "@components",
		uiAlias: "@ui",
		utilsAlias: "@utils",
		hooksAlias: "@hooks",
	});
	expect(p.text).not.toHaveBeenCalled();
});

it("keeps aliases from an existing components.json", async () => {
	const cwd = await createProject("^3.0.0-next.0");
	const existingConfig = {
		tailwind: { css: "src/app.css", baseColor: "slate" },
		aliases: {
			lib: "@lib",
			components: "@components",
			ui: "@ui",
			utils: "@utils",
			hooks: "@hooks",
		},
		typescript: true,
		registry: "https://shadcn-svelte.com/registry",
	} satisfies RawConfig;
	vi.mocked(p.text).mockImplementation(async (options) => options.initialValue as string);

	const aliases = await promptForAliases({
		cwd,
		tsconfig: {} as TsConfigResult,
		existingConfig,
	});

	expect(aliases).toEqual({
		libAlias: "@lib",
		componentAlias: "@components",
		uiAlias: "@ui",
		utilsAlias: "@utils",
		hooksAlias: "@hooks",
	});
});

it("resolves a SvelteKit 3 components.json through $app/tsconfig and package imports", async () => {
	const cwd = await createProject("^3.0.0-next.0");
	await fs.mkdir(path.join(cwd, "node_modules", "$app"), { recursive: true });
	await fs.mkdir(path.join(cwd, "src", "lib", "components", "ui"), { recursive: true });
	await fs.mkdir(path.join(cwd, "src", "lib", "hooks"), { recursive: true });
	await fs.writeFile(
		path.join(cwd, "node_modules", "$app", "tsconfig.json"),
		JSON.stringify({ compilerOptions: { paths: {} } })
	);
	await fs.writeFile(
		path.join(cwd, "tsconfig.json"),
		JSON.stringify({ extends: "$app/tsconfig", include: ["src"] })
	);
	await fs.writeFile(path.join(cwd, "src", "app.css"), "");
	await fs.writeFile(path.join(cwd, "src", "lib", "index.ts"), "");
	await fs.writeFile(path.join(cwd, "src", "lib", "utils.ts"), "");
	await fs.writeFile(
		path.join(cwd, "components.json"),
		JSON.stringify({
			$schema: "https://shadcn-svelte.com/schema.json",
			style: "nova",
			tailwind: { css: "src/app.css", baseColor: "slate" },
			aliases: {
				lib: "#lib",
				components: "#lib/components",
				ui: "#lib/components/ui",
				utils: "#lib/utils",
				hooks: "#lib/hooks",
			},
			typescript: true,
			registry: "https://shadcn-svelte.com/registry",
		})
	);

	const config = await getConfig(cwd);

	expect(config?.aliases).toEqual({
		lib: "#lib",
		components: "#lib/components",
		ui: "#lib/components/ui",
		utils: "#lib/utils",
		hooks: "#lib/hooks",
	});
	expect(config?.resolvedPaths).toMatchObject({
		lib: path.join(cwd, "src", "lib"),
		components: path.join(cwd, "src", "lib", "components"),
		ui: path.join(cwd, "src", "lib", "components", "ui"),
		utils: path.join(cwd, "src", "lib", "utils"),
		hooks: path.join(cwd, "src", "lib", "hooks"),
	});
});
