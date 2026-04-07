import fs from "node:fs";
import path from "node:path";
import * as acorn from "acorn";
import { tsPlugin } from "@sveltejs/acorn-typescript";
import { walk, type Node } from "estree-walker";
import * as svelte from "svelte/compiler";
import { registryItemSchema, type Registry } from "shadcn-svelte/schema";
import { fonts } from "../src/lib/registry/fonts.js";

const REGISTRY_DEPENDENCY = "$lib/";
const UTILS_PATH = "$lib/utils.js";

const tsParser = acorn.Parser.extend(tsPlugin());

type RegistryItems = Registry["items"];
type RegistryItemFiles = Registry["items"][number]["files"];

export async function buildRegistry(): Promise<RegistryItems> {
	const registryRootPath = path.resolve("src", "lib", "registry");

	const paths = {
		ui: path.resolve(registryRootPath, "ui"),
		examples: path.resolve(registryRootPath, "examples"),
		blocks: path.resolve(registryRootPath, "blocks"),
		hooks: path.resolve(registryRootPath, "hooks"),
		lib: path.resolve(registryRootPath, "lib"),
		fonts: path.resolve(registryRootPath, "fonts.ts"),
	};

	return (
		await Promise.all([
			crawlUI(paths.ui),
			crawlExamples(paths.examples),
			crawlBlocks(paths.blocks),
			crawlHooks(paths.hooks),
			crawlLib(paths.lib),
			assembleFonts(),
		])
	).flat();
}

async function crawlUI(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { recursive: true, withFileTypes: true });
	const dirs = dir.filter((dirent) => dirent.isDirectory());
	return Promise.all(
		dirs.map((dirent) => buildUIRegistry(path.resolve(rootPath, dirent.name), dirent.name))
	);
}

async function buildUIRegistry(
	componentPath: string,
	componentName: string
): Promise<RegistryItems[number]> {
	const dir = fs.readdirSync(componentPath, {
		withFileTypes: true,
	});

	const fileEntries = dir.filter((d) => d.isFile());
	const registryDependencies = new Set<string>();

	let meta = {};
	const files: RegistryItemFiles = [];

	await Promise.all(
		fileEntries.map(async (dirent) => {
			const filepath = path.join(componentPath, dirent.name);
			const relativePath = path.relative(process.cwd(), filepath);
			const source = fs.readFileSync(filepath, { encoding: "utf8" });

			if (dirent.name === "meta.json") {
				meta = registryItemSchema.parse(JSON.parse(source));
				return;
			}

			files.push({ path: relativePath, type: "registry:file" });

			const deps = await getFileDependencies(filepath, source);
			if (!deps) return;
			deps.registryDependencies.forEach((dep) => registryDependencies.add(dep));
		})
	);

	return {
		...meta,
		type: "registry:ui",
		files,
		name: componentName,
		registryDependencies: Array.from(registryDependencies),
	} satisfies RegistryItems[number];
}

async function crawlExamples(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.name.endsWith(".svelte") && d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const [name] = dirent.name.split(".svelte");
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: "utf8" });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name,
				type: "registry:example" as const,
				files: [{ path: relativePath, type: "registry:component" as const }],
				registryDependencies: Array.from(registryDependencies),
			};
		})
	);
}

async function buildBlockRegistry(
	blockPath: string,
	blockName: string
): Promise<RegistryItems[number]> {
	const dir = fs.readdirSync(blockPath, { withFileTypes: true, recursive: true });
	const files: RegistryItemFiles = [];
	const registryDependencies = new Set<string>();

	const pagesNames = ["+page.svelte"];
	const fileNames = ["data.json", "data.ts"];
	for (const dirent of dir) {
		if (!dirent.isFile()) continue;
		const isPage = pagesNames.includes(dirent.name);
		const isFile = fileNames.includes(dirent.name);

		const type = isPage || isFile ? "registry:page" : "registry:component";

		// TODO: fix
		const compPath =
			isPage || isFile
				? dirent.name
				: path.join(path.basename(dirent.parentPath), dirent.name);
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

async function crawlBlocks(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	return Promise.all(
		dir.map(async (dirent) => {
			const filepath = path.join(rootPath, dirent.name);
			if (!dirent.isFile()) {
				return buildBlockRegistry(filepath, dirent.name);
			}
			if (!dirent.name.endsWith(".svelte")) return null;

			const [name] = dirent.name.split(".svelte");
			const source = fs.readFileSync(filepath, { encoding: "utf8" });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name,
				type: "registry:block" as const,
				files: [{ path: relativePath, type: "registry:component" as const }],
				registryDependencies: Array.from(registryDependencies),
			};
		})
	).then((results) => results.filter((r) => r !== null));
}

async function crawlLib(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const [name] = dirent.name.split(".ts");
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: "utf8" });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name,
				type: "registry:lib" as const,
				files: [{ path: relativePath, type: "registry:lib" as const }],
				registryDependencies: Array.from(registryDependencies),
			};
		})
	);
}

async function assembleFonts(): Promise<RegistryItems> {
	const items: RegistryItems = [];

	for (const font of fonts) {
		items.push({
			name: `font-${font.name.replace("font-", "")}`,
			type: "registry:font",
			font: font.font,
			files: [],
			registryDependencies: [],
		});
	}

	return items;
}

async function crawlHooks(rootPath: string): Promise<RegistryItems> {
	const dir = fs.readdirSync(rootPath, { withFileTypes: true });
	const files = dir.filter((d) => d.isFile());
	return Promise.all(
		files.map(async (dirent) => {
			const [name] = dirent.name.split(".svelte.ts");
			const filepath = path.join(rootPath, dirent.name);
			const source = fs.readFileSync(filepath, { encoding: "utf8" });
			const relativePath = path.relative(process.cwd(), filepath);
			const { registryDependencies } = await getFileDependencies(filepath, source);
			return {
				name,
				type: "registry:hook" as const,
				files: [{ path: relativePath, type: "registry:hook" as const }],
				registryDependencies: Array.from(registryDependencies),
			};
		})
	);
}

async function getFileDependencies(
	filename: string,
	content: string
): Promise<{ registryDependencies: Set<string> }> {
	let ast: unknown;
	let moduleAst: unknown;

	if (filename.endsWith(".svelte")) {
		const { code } = await svelte.preprocess(content, [], { filename });
		const result = svelte.parse(code, { filename });
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
