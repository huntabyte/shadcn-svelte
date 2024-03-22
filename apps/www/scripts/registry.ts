import fs from "node:fs/promises";
import path from "node:path";
import { parse, preprocess, walk } from "svelte/compiler";
import config from "../svelte.config";
import type { Registry } from "../src/lib/registry";

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
const ICON_DEPENDENCIES = ["lucide-svelte", "svelte-radix"];
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
	const rootDirs = await fs.readdir(registryRootPath, { withFileTypes: true });
	const styles = rootDirs.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
	const registry: Registry = [];

	for (const style of styles) {
		const uiPath = path.resolve(registryRootPath, style, "ui");
		const uiRegistry = await crawlUI(uiPath, style);

		const examplePath = path.resolve(registryRootPath, style, "example");
		const exampleRegistry = await crawlExample(examplePath, style);

		registry.push(...uiRegistry, ...exampleRegistry);
	}

	return registry;
}

async function crawlUI(rootPath: string, style: string) {
	const dir = await fs.readdir(rootPath, {
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

async function crawlExample(rootPath: string, style: string) {
	const type = "components:example";

	const dir = await fs.readdir(rootPath, {
		// recursive: true, // ignoring examples with directories for now...
		withFileTypes: true,
	});

	const exampleRegistry: Registry = [];

	for (const dirent of dir) {
		if (!dirent.name.endsWith(".svelte")) continue;

		if (dirent.isFile() && dirent.name.endsWith(".svelte")) {
			const [name] = dirent.name.split(".svelte");

			const filepath = path.join(rootPath, dirent.name);
			const source = await fs.readFile(filepath, { encoding: "utf8" });
			const relativePath = path.join("example", dirent.name);

			const file = { name: dirent.name, content: source, path: relativePath };
			const { dependencies, registryDependencies } = await getDependencies(filepath, source);

			exampleRegistry.push({
				name,
				type,
				style,
				files: [file],
				registryDependencies: Array.from(registryDependencies),
				dependencies: Array.from(dependencies),
			});
		}

		// ignoring examples with directories for now...

		// if (dirent.isDirectory()) {
		// 	const componentPath = resolve(rootPath, dirent.name);
		// 	const ui = await buildUIRegistry(componentPath, dirent.name);
		// 	exampleRegistry.push({
		// 		...ui,
		// 		type
		// 	});
		// }
	}

	return exampleRegistry;
}

async function buildUIRegistry(componentPath: string, componentName: string, style: string) {
	const dir = await fs.readdir(componentPath, {
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
		const source = await fs.readFile(filepath, { encoding: "utf8" });

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
		dependencies: Array.from(dependencies),
	} satisfies RegistryItem;
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
