import fs from "node:fs";
import path from "node:path";
import * as acorn from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk, type Node } from "estree-walker";
import * as svelte from "svelte/compiler";
import type { Registry } from "@shadcn-svelte/registry";

// will be removed once moving from `next` to `latest`
export const TMP_NEXT_DEPS = ["paneforge", "vaul-svelte"];

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES: Record<string, string[]> = {
	"bits-ui": [],
	formsnap: ["zod", "sveltekit-superforms"],
	"svelte-sonner": ["mode-watcher"],
	"vaul-svelte": [],
	"embla-carousel-svelte": [],
	paneforge: [],
};
const ICON_DEPENDENCIES = ["@lucide/svelte"];
// these are required dependencies for particular components
// where the dependencies are not specified in the import declarations of the component file
const REQUIRED_COMPONENT_DEPS: Record<string, string[]> = {
	calendar: ["@internationalized/date"],
	"range-calendar": ["@internationalized/date"],
};
const REGISTRY_DEPENDENCY = "$lib/";
const UTILS_PATH = "$lib/utils.js";

const tsParser = acorn.Parser.extend(tsPlugin());

type RegistryItems = Registry["items"];
type RegistryItemFiles = Registry["items"][number]["files"];

export async function buildRegistry(): Promise<Registry["items"]> {
	const registryRootPath = path.resolve("src", "lib", "registry");
	const items: RegistryItems = [];

	const paths = {
		ui: path.resolve(registryRootPath, "ui"),
		example: path.resolve(registryRootPath, "examples"),
		block: path.resolve(registryRootPath, "blocks"),
		hook: path.resolve(registryRootPath, "hooks"),
		lib: path.resolve(registryRootPath, "lib"),
	};

	const resolvedItems = await Promise.all([
		crawlUI(paths.ui),
		crawlExample(paths.example),
		crawlBlock(paths.block),
		crawlHook(paths.hook),
		crawlLib(paths.lib),
	]);

	resolvedItems.forEach((i) => items.push(...i));

	return items;
}

async function crawlUI(rootPath: string) {
	const dir = fs.readdirSync(rootPath, { recursive: true, withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.isDirectory()) continue;

		const componentPath = path.resolve(rootPath, dirent.name);
		const ui = await buildUIRegistry(componentPath, dirent.name);
		items.push(ui);
	}

	return items;
}

async function buildUIRegistry(componentPath: string, componentName: string) {
	const dir = fs.readdirSync(componentPath, { withFileTypes: true });

	const files: RegistryItemFiles = [];
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();
	const type = "registry:ui";

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const filepath = path.join(componentPath, dirent.name);
		const relativePath = path.relative(process.cwd(), filepath);
		const source = fs.readFileSync(filepath, "utf8");

		files.push({ path: relativePath, type });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.dependencies.forEach((dep) => dependencies.add(dep));
		REQUIRED_COMPONENT_DEPS[componentName]?.forEach((dep) => dependencies.add(dep));

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		type,
		files,
		name: componentName,
		registryDependencies: Array.from(registryDependencies),
		dependencies: toArray(dependencies)?.map((dep) =>
			TMP_NEXT_DEPS.includes(dep) ? `${dep}@next` : dep
		),
	} satisfies RegistryItems[number];
}

async function crawlExample(rootPath: string) {
	const type = `registry:example` as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, "utf8");
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: toArray(dependencies),
		});
	}

	return items;
}

async function buildBlockRegistry(blockPath: string, blockName: string) {
	const dir = fs.readdirSync(blockPath, { withFileTypes: true, recursive: true });

	const files: RegistryItemFiles = [];
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;
		const isPage = dirent.name === "+page.svelte";
		const type = isPage ? "registry:page" : "registry:component";

		// TODO: fix
		const compPath = isPage ? dirent.name : `components/${dirent.name}`;
		const filepath = path.join(blockPath, compPath);
		const relativePath = path.relative(process.cwd(), filepath);
		const source = fs.readFileSync(filepath, "utf8");

		files.push({ path: relativePath, type });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.dependencies.forEach((dep) => dependencies.add(dep));
		REQUIRED_COMPONENT_DEPS[blockName]?.forEach((dep) => dependencies.add(dep));

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		type: "registry:block",
		files,
		name: blockName,
		registryDependencies: Array.from(registryDependencies),
		dependencies: toArray(dependencies),
	} satisfies RegistryItems[number];
}

async function crawlBlock(rootPath: string) {
	const type = `registry:block` as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) {
			const result = await buildBlockRegistry(`${rootPath}/${dirent.name}`, dirent.name);
			items.push(result);
			continue;
		}
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, "utf8");
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: toArray(dependencies),
		});
	}

	return items;
}

async function crawlHook(rootPath: string) {
	const type = `registry:hook` as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte.ts")[0].split(".ts");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, "utf8");
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: toArray(dependencies),
		});
	}

	return items;
}

// TODO: this isn't being used yet, but this will be used to gather all the files for the lib
// folder once I work out how to get the registry index setup to depend on utils and whatnot
async function crawlLib(rootPath: string) {
	const type = `registry:lib` as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte.ts")[0].split(".ts");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, "utf8");
		const relativePath = path.relative(process.cwd(), filepath);

		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [{ path: relativePath, type }],
			registryDependencies: Array.from(registryDependencies),
			dependencies: toArray(dependencies),
		});
	}

	return items;
}

async function getFileDependencies(filename: string, sourceCode: string) {
	let ast: unknown;
	let moduleAst: unknown;

	if (filename.endsWith(".svelte")) {
		const { code } = await svelte.preprocess(sourceCode, [], { filename });
		const result = svelte.parse(code, { filename });
		ast = result.instance;
		if (result.module) {
			moduleAst = result.module;
		}
	} else {
		ast = tsParser.parse(sourceCode, {
			ecmaVersion: "latest",
			sourceType: "module",
		});
	}

	const registryDependencies = new Set<string>();
	const dependencies = new Set<string>();

	const enter = (node: Node) => {
		if (node.type === "ImportDeclaration") {
			const source = node.source.value as string;

			const peerDeps = DEPENDENCIES[source];
			if (peerDeps !== undefined) {
				dependencies.add(source);
				peerDeps.forEach((dep) => dependencies.add(dep));
			}

			if (source.startsWith(REGISTRY_DEPENDENCY) && source !== UTILS_PATH) {
				if (source.includes("ui")) {
					const component = source.split("/").at(-2)!;
					registryDependencies.add(component);
				} else if (source.includes("hook")) {
					const hook = source.split("/").at(-1)!.split(".")[0];
					registryDependencies.add(hook);
				}
			}

			const iconDep = ICON_DEPENDENCIES.find((dep) => source.startsWith(dep));
			if (iconDep !== undefined) {
				dependencies.add(iconDep);
			}
		}
	};

	// @ts-expect-error yea, stfu
	walk(ast, { enter });

	if (moduleAst) {
		// @ts-expect-error yea, stfu x2
		walk(moduleAst, { enter });
	}

	return { registryDependencies, dependencies };
}

/** Converts a `Set` into an array if its size is greater than 0. Otherwise, `undefined` is returned. */
function toArray<T>(set: Set<T>): Array<T> | undefined {
	if (set.size > 0) {
		return Array.from(set);
	}
	return undefined;
}
