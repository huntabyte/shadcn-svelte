import * as acorn from "acorn";
import tsPlugin from "acorn-typescript";
import { walk, type Node } from "estree-walker";
import fs from "node:fs";
import path from "node:path";
import { parse, preprocess } from "svelte/compiler";
import {
	type Registry,
	type RegistryItemFile,
	type RegistryStyle,
	styles,
} from "../src/lib/registry";
import { getPageBlockTarget } from "../src/lib/registry/registry-block-meta.js";
import config from "../svelte.config.js";
import { TMP_NEXT_DEPS } from "./tmp";

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
	["bits-ui", []],
	["formsnap", ["zod", "sveltekit-superforms"]],
	["svelte-sonner", ["mode-watcher"]],
	["vaul-svelte", []],
	["embla-carousel-svelte", []],
	["paneforge", []],
]);
const ICON_DEPENDENCIES = ["@lucide/svelte"];
// these are required dependencies for particular components
// where the dependencies are not specified in the import declarations of the component file
const REQUIRED_COMPONENT_DEPS = new Map<string, string[]>([
	["calendar", ["@internationalized/date"]],
	["range-calendar", ["@internationalized/date"]],
]);
const REGISTRY_DEPENDENCY = "$lib/";
const UTILS_PATH = "$lib/utils.js";

// @ts-expect-error - shh
const tsParser = acorn.Parser.extend(tsPlugin());

type ArrayItem<T> = T extends Array<infer X> ? X : never;
type RegistryItem = ArrayItem<Registry>;

export async function buildRegistry() {
	const registryRootPath = path.resolve("src", "lib", "registry");
	const registry: Registry = [];

	for (const { name: style } of styles) {
		const uiPath = path.resolve(registryRootPath, style, "ui");
		const examplePath = path.resolve(registryRootPath, style, "example");
		const blockPath = path.resolve(registryRootPath, style, "block");
		const hookPath = path.resolve(registryRootPath, style, "hook");

		const [ui, example, block, hook] = await Promise.all([
			crawlUI(uiPath, style),
			crawlExample(examplePath, style),
			crawlBlock(blockPath, style),
			crawlHook(hookPath, style),
		]);

		registry.push(...ui, ...example, ...block, ...hook);
	}

	return registry;
}

async function crawlUI(rootPath: string, style: RegistryStyle) {
	const dir = fs.readdirSync(rootPath, { recursive: true, withFileTypes: true });

	const uiRegistry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.isDirectory()) continue;

		const componentPath = path.resolve(rootPath, dirent.name);
		const ui = await buildUIRegistry(componentPath, dirent.name, style);
		uiRegistry.push(ui);
	}

	return uiRegistry;
}

async function buildUIRegistry(componentPath: string, componentName: string, style: RegistryStyle) {
	const dir = fs.readdirSync(componentPath, {
		withFileTypes: true,
	});

	const files: RegistryItemFile[] = [];
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();
	const type = "registry:ui";

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const filepath = path.join(componentPath, dirent.name);
		const relativePath = path.join("ui", componentName, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const target = `${componentName}/${dirent.name}`;

		files.push({ name: dirent.name, content: source, path: relativePath, type, target });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.dependencies.forEach((dep) => dependencies.add(dep));
		REQUIRED_COMPONENT_DEPS.get(componentName)?.forEach((dep) => dependencies.add(dep));

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		style,
		type,
		files,
		name: componentName,
		registryDependencies: Array.from(registryDependencies),
		dependencies: Array.from(dependencies).map((dep) =>
			TMP_NEXT_DEPS.includes(dep) ? `${dep}@next` : dep
		),
	} satisfies RegistryItem;
}

async function crawlExample(rootPath: string, style: RegistryStyle) {
	const type = `registry:example` as const;

	const dir = fs.readdirSync(rootPath, { withFileTypes: true });

	const registry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.join("example", dirent.name);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			style,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		registry.push({
			name,
			type,
			style,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: Array.from(dependencies).map((dep) =>
				TMP_NEXT_DEPS.includes(dep) ? `${dep}@next` : dep
			),
		});
	}

	return registry;
}

async function buildBlockRegistry(blockPath: string, blockName: string, style: RegistryStyle) {
	const dir = fs.readdirSync(blockPath, { withFileTypes: true, recursive: true });

	const files: RegistryItemFile[] = [];
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;
		const isPage = dirent.name === "+page.svelte";
		const type = isPage ? "registry:page" : "registry:component";

		// TODO: fix
		const compPath = isPage ? dirent.name : `components/${dirent.name}`;
		const filepath = path.join(blockPath, compPath);
		const relativePath = path.join("block", blockName, compPath);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const target = isPage ? getPageBlockTarget(blockName) : dirent.name;

		files.push({ name: dirent.name, content: source, path: relativePath, type, target });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.dependencies.forEach((dep) => dependencies.add(dep));
		REQUIRED_COMPONENT_DEPS.get(blockName)?.forEach((dep) => dependencies.add(dep));

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		style,
		type: "registry:block",
		files,
		name: blockName,
		registryDependencies: Array.from(registryDependencies),
		dependencies: Array.from(dependencies),
	} satisfies RegistryItem;
}

async function crawlBlock(rootPath: string, style: RegistryStyle) {
	const type = `registry:block` as const;

	const dir = fs.readdirSync(rootPath, { withFileTypes: true });

	const registry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) {
			const result = await buildBlockRegistry(
				`${rootPath}/${dirent.name}`,
				dirent.name,
				style
			);
			registry.push(result);
			continue;
		}
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.join("example", dirent.name);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			style,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		registry.push({
			name,
			type,
			style,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: Array.from(dependencies),
		});
	}

	return registry;
}

async function crawlHook(rootPath: string, style: RegistryStyle) {
	const type = `registry:hook` as const;

	const dir = fs.readdirSync(rootPath, { withFileTypes: true });

	const registry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte.ts");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.join("hook", dirent.name);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			style,
			target: dirent.name,
			type,
		};
		const { dependencies, registryDependencies } = await getFileDependencies(filepath, source);

		registry.push({
			name,
			type,
			style,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: Array.from(dependencies),
		});
	}

	return registry;
}

async function getFileDependencies(filename: string, sourceCode: string) {
	let ast: unknown;
	let moduleAst: unknown;

	if (filename.endsWith(".svelte")) {
		const { code } = await preprocess(sourceCode, config.preprocess, { filename });
		const result = parse(code, { filename });
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

			const peerDeps = DEPENDENCIES.get(source);
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
