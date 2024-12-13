import fs from "node:fs";
import path from "node:path";
import { parse, preprocess, walk } from "svelte/compiler";
import { type Registry, styles } from "../src/lib/registry";
import config from "../svelte.config.js";
import { TMP_PINNED_DEPS } from "./tmp";

// [Dependency, [...PeerDependencies]]
const DEPENDENCIES = new Map<string, string[]>([
	["bits-ui", []],
	["formsnap", ["zod", "sveltekit-superforms"]],
	["cmdk-sv", ["bits-ui"]],
	["svelte-sonner", ["mode-watcher"]],
	["vaul-svelte", []],
	["embla-carousel-svelte", []],
	["paneforge", []],
]);
const ICON_DEPENDENCIES = ["lucide-svelte", "svelte-radix@1.1.1"];
// these are required dependencies for particular components
// where the dependencies are not specified in the import declarations of the component file
const REQUIRED_COMPONENT_DEPS = new Map<string, string[]>([
	["calendar", ["@internationalized/date"]],
	["range-calendar", ["@internationalized/date"]],
]);
const REGISTRY_DEPENDENCY = "$lib/";
const UTILS_PATH = "$lib/utils.js";

type ArrayItem<T> = T extends Array<infer X> ? X : never;
type RegistryItem = ArrayItem<Registry>;

export async function buildRegistry() {
	const registryRootPath = path.resolve("src", "lib", "registry");
	const registry: Registry = [];

	for (const { name: style } of styles) {
		const uiPath = path.resolve(registryRootPath, style, "ui");
		const examplePath = path.resolve(registryRootPath, style, "example");
		const blockPath = path.resolve(registryRootPath, style, "block");

		const [ui, example, block] = await Promise.all([
			crawlUI(uiPath, style),
			crawlDemo(examplePath, style, "example"),
			crawlDemo(blockPath, style, "block"),
		]);

		registry.push(...ui, ...example, ...block);
	}

	return registry;
}

async function crawlUI(rootPath: string, style: string) {
	const dir = fs.readdirSync(rootPath, {
		recursive: true,
		withFileTypes: true,
	});

	const uiRegistry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.isDirectory()) continue;

		const componentPath = path.resolve(rootPath, dirent.name);
		const ui = await buildUIRegistry(componentPath, dirent.name, style);
		uiRegistry.push(ui);
	}

	return uiRegistry;
}

async function buildUIRegistry(componentPath: string, componentName: string, style: string) {
	const dir = fs.readdirSync(componentPath, {
		withFileTypes: true,
	});

	const files = [];
	const dependencies = new Set<string>();
	const registryDependencies = new Set<string>();
	const type = "components:ui";

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const filepath = path.join(componentPath, dirent.name);
		const relativePath = path.join("ui", componentName, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });

		files.push({ name: dirent.name, content: source, path: relativePath });

		// only grab deps from the svelte files
		if (!dirent.name.endsWith(".svelte")) continue;
		const deps = await getDependencies(filepath, source);

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
		dependencies: Array.from(dependencies).map((dep) => TMP_PINNED_DEPS.get(dep) ?? dep),
	} satisfies RegistryItem;
}

async function crawlDemo(rootPath: string, style: string, demoType: "example" | "block") {
	const type = `components:${demoType}` as const;

	const dir = fs.readdirSync(rootPath, {
		withFileTypes: true,
	});

	const registry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.join(demoType, dirent.name);

		const file = { name: dirent.name, content: source, path: relativePath };
		const { dependencies, registryDependencies } = await getDependencies(filepath, source);

		registry.push({
			name,
			type,
			style,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
			dependencies: Array.from(dependencies).map((dep) => TMP_PINNED_DEPS.get(dep) ?? dep),
		});
	}

	return registry;
}

async function getDependencies(filename: string, source: string) {
	const { code } = await preprocess(source, config.preprocess, { filename });
	const ast = parse(code, { filename });

	const registryDependencies = new Set<string>();
	const dependencies = new Set<string>();

	// @ts-expect-error annoying
	walk(ast.instance, {
		enter(node) {
			if (node.type === "ImportDeclaration") {
				const source = node.source.value as string;

				const peerDeps = DEPENDENCIES.get(source);
				if (peerDeps !== undefined) {
					dependencies.add(source);
					peerDeps.forEach((dep) => dependencies.add(dep));
				}

				if (source.startsWith(REGISTRY_DEPENDENCY) && source !== UTILS_PATH) {
					const component = source.split("/").at(-2)!;
					registryDependencies.add(component);
				}

				const iconDep = ICON_DEPENDENCIES.find((dep) => source.startsWith(dep));
				if (iconDep !== undefined) {
					dependencies.add(iconDep);
				}
			}
		},
	});

	return { registryDependencies, dependencies };
}
