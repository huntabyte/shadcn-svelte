import fs from "node:fs";
import path from "node:path";
import * as acorn from "acorn";
import tsPlugin from "acorn-typescript";
import { walk, type Node } from "estree-walker";
import { parse, preprocess } from "svelte/compiler";
import type { Registry } from "@shadcn-svelte/registry";
import config from "../svelte.config.js";

const REGISTRY_DEPENDENCY = "$lib/";
const UTILS_PATH = "$lib/utils.js";

// @ts-expect-error - shh
const tsParser = acorn.Parser.extend(tsPlugin());

type RegistryItems = Registry["items"];
type RegistryItemFiles = Registry["items"][number]["files"];

export async function buildRegistry() {
	const registryRootPath = path.resolve("src", "lib", "registry");
	const items: RegistryItems = [];

	const paths = {
		ui: path.resolve(registryRootPath, "ui"),
		example: path.resolve(registryRootPath, "example"),
		block: path.resolve(registryRootPath, "block"),
		hook: path.resolve(registryRootPath, "hook"),
	};

	const resolvedItems = await Promise.all([
		crawlUI(paths.ui),
		crawlExample(paths.example),
		crawlBlock(paths.block),
		crawlHook(paths.hook),
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
	const dir = fs.readdirSync(componentPath, {
		withFileTypes: true,
	});

	const files: RegistryItemFiles = [];
	const registryDependencies = new Set<string>();
	const type = "registry:ui";

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const filepath = path.join(componentPath, dirent.name);
		const relativePath = path.relative(process.cwd(), filepath);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });

		files.push({ path: relativePath, type });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		type,
		files,
		name: componentName,
		registryDependencies: Array.from(registryDependencies),
	} satisfies RegistryItems[number];
}

async function crawlExample(rootPath: string) {
	const type = "registry:example" as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
		});
	}

	return items;
}

async function buildBlockRegistry(blockPath: string, blockName: string) {
	const dir = fs.readdirSync(blockPath, { withFileTypes: true, recursive: true });
	const files: RegistryItemFiles = [];
	const registryDependencies = new Set<string>();

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;
		const isPage = dirent.name === "+page.svelte";
		const type = isPage ? "registry:page" : "registry:component";

		// TODO: fix
		const compPath = isPage ? dirent.name : `components/${dirent.name}`;
		const filepath = path.join(blockPath, compPath);
		const relativePath = path.relative(process.cwd(), filepath);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });

		files.push({ path: relativePath, type });

		const deps = await getFileDependencies(filepath, source);
		if (!deps) continue;

		deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
	}

	return {
		type: "registry:block",
		files,
		name: blockName,
		registryDependencies: Array.from(registryDependencies),
	} satisfies RegistryItems[number];
}

async function crawlBlock(rootPath: string) {
	const type = "registry:block" as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		const filepath = path.join(rootPath, dirent.name);
		if (!dirent.isFile()) {
			const result = await buildBlockRegistry(filepath, dirent.name);
			items.push(result);
			continue;
		}
		if (!dirent.name.endsWith(".svelte") || !dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte");
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
		});
	}

	return items;
}

async function crawlHook(rootPath: string) {
	const type = "registry:hook" as const;
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const items: RegistryItems = [];

	for (const dirent of dir) {
		if (!dirent.isFile()) continue;

		const [name] = dirent.name.split(".svelte.ts");

		const filepath = path.join(rootPath, dirent.name);
		const source = fs.readFileSync(filepath, { encoding: "utf8" });
		const relativePath = path.relative(process.cwd(), filepath);

		const file = {
			name: dirent.name,
			content: source,
			path: relativePath,
			target: dirent.name,
			type,
		};
		const { registryDependencies } = await getFileDependencies(filepath, source);

		items.push({
			name,
			type,
			files: [file],
			registryDependencies: Array.from(registryDependencies),
		});
	}

	return items;
}

async function getFileDependencies(filename: string, content: string) {
	let ast: unknown;
	let moduleAst: unknown;

	if (filename.endsWith(".svelte")) {
		const { code } = await preprocess(content, config.preprocess, { filename });
		const result = parse(code, { filename });
		ast = result.instance;
		if (result.module) {
			moduleAst = result.module;
		}
	} else {
		ast = tsParser.parse(content, { ecmaVersion: "latest", sourceType: "module" });
	}

	const registryDependencies = new Set<string>();

	const enter = (node: Node) => {
		if (node.type === "ImportDeclaration") {
			const source = node.source.value as string;

			if (source.startsWith(REGISTRY_DEPENDENCY) && source !== UTILS_PATH) {
				if (source.includes("ui")) {
					const component = source.split("/").at(-2)!;
					registryDependencies.add(component);
				} else if (source.includes("hook")) {
					const hook = source.split("/").at(-1)!.split(".")[0];
					registryDependencies.add(hook);
				}
			}
		}
	};

	// @ts-expect-error yea, stfu
	walk(ast, { enter });

	if (moduleAst) {
		// @ts-expect-error yea, stfu x2
		walk(moduleAst, { enter });
	}

	return { registryDependencies };
}
