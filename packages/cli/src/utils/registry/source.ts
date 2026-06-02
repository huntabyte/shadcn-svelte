import path from "node:path";
import { z } from "zod";
import { SITE_BASE_URL } from "../../constants.js";
import { error } from "../errors.js";
import * as schemas from "../../schema/index.js";
import { isUrl } from "../utils.js";

const MAX_INCLUDE_DEPTH = 32;

const sourceFileSchema = schemas.registryItemFileSchema
	.omit({ content: true, target: true })
	.extend({
		path: z.string(),
		target: z.string().optional(),
		content: z.string().optional(),
	});

const sourceItemSchema = schemas.registryItemCommonSchema
	.omit({ files: true })
	.extend({
		files: sourceFileSchema.array().optional(),
		font: schemas.registryItemFontSchema.optional(),
		config: z.any().optional(),
	})
	.passthrough();

const sourceRegistrySchema = schemas.registrySchema
	.omit({ name: true, homepage: true, items: true })
	.extend({
		name: z.string().optional(),
		homepage: z.string().optional(),
		include: z.string().array().optional(),
		items: sourceItemSchema.array().optional().default([]),
	});

type SourceItem = z.infer<typeof sourceItemSchema>;
type SourceRegistry = z.infer<typeof sourceRegistrySchema>;

type RegistryItemSource = {
	registryFile: string;
	registryDir: string;
	itemIndex: number;
};

export type RegistrySourceReader = {
	readText(filePath: string): Promise<string>;
};

export async function loadRegistryItemFromSource(
	itemName: string,
	reader: RegistrySourceReader,
	options: { registryFile?: string; schemaUrl?: string } = {}
) {
	const result = await readSourceRegistryWithIncludes(
		options.registryFile ?? "registry.json",
		reader
	);
	const item = result.items.find((entry) => entry.name === itemName);
	if (!item) throw error(`Registry item '${itemName}' does not exist in the GitHub registry.`);

	const registryItem = {
		...rewriteRegistryItemFilePaths(item, result.itemSourcesByItem),
		$schema: options.schemaUrl ?? `${SITE_BASE_URL}/schema/registry-item.json`,
	};

	await Promise.all(
		(item.files ?? []).map(async (sourceFile, index) => {
			const file = registryItem.files?.[index];
			if (!file) return;

			const sourcePath = getRegistryItemFileSourceForItem(
				item,
				sourceFile.path,
				result.itemSourcesByItem
			);
			try {
				file.content = await reader.readText(sourcePath);
			} catch (e) {
				throw error(
					`Failed to read file "${sourceFile.path}" for registry item "${item.name}". Make sure the file path is relative to the registry.json file that declares the item.`,
					e
				);
			}
		})
	);

	return schemas.registryItemSchema.parse(registryItem);
}

export async function loadRegistryCatalogFromSource(reader: RegistrySourceReader) {
	const result = await readSourceRegistryWithIncludes("registry.json", reader);
	return {
		name: result.name,
		homepage: result.homepage,
		items: result.items.map((item) =>
			stripRegistryItemFileContent(
				rewriteRegistryItemFilePaths(item, result.itemSourcesByItem)
			)
		),
	};
}

async function readSourceRegistryWithIncludes(registryFile: string, reader: RegistrySourceReader) {
	const rootRegistry = await readRegistry(registryFile, reader);

	if (!rootRegistry.name || !rootRegistry.homepage) {
		throw error(
			`Invalid root registry file at ${registryFile}: root registry.json must define "name" and "homepage". Included registry.json files may omit these fields.`
		);
	}

	const itemSourcesByItem = new Map<SourceItem, RegistryItemSource>();
	const firstIncludedFrom = new Map<string, string>();
	const items = await readRegistryFile(
		registryFile,
		rootRegistry,
		reader,
		itemSourcesByItem,
		firstIncludedFrom,
		[]
	);

	validateDuplicateItems(items);

	return {
		name: rootRegistry.name,
		homepage: rootRegistry.homepage,
		items,
		itemSourcesByItem,
	};
}

async function readRegistryFile(
	registryFile: string,
	registry: SourceRegistry,
	reader: RegistrySourceReader,
	itemSourcesByItem: Map<SourceItem, RegistryItemSource>,
	firstIncludedFrom: Map<string, string>,
	chain: string[]
): Promise<SourceItem[]> {
	validateRegistryFileWithinRoot(registryFile);

	if (chain.length >= MAX_INCLUDE_DEPTH) {
		throw error(
			`Registry include tree is too deep at ${registryFile}. The maximum include depth is ${MAX_INCLUDE_DEPTH}.`
		);
	}
	if (chain.includes(registryFile)) {
		throw error(`Registry include cycle detected:\n${[...chain, registryFile].join("\n")}`);
	}

	const includedFrom = chain.at(-1) ?? registryFile;
	const existingSource = firstIncludedFrom.get(registryFile);
	if (existingSource) {
		throw error(
			`Registry file included more than once: ${registryFile}.\n  - first included from ${existingSource}\n  - included again from ${includedFrom}`
		);
	}
	firstIncludedFrom.set(registryFile, includedFrom);

	const nextChain = [...chain, registryFile];
	const registryDir = getSourceDir(registryFile);
	const includedItems: SourceItem[] = [];

	for (const includePath of registry.include ?? []) {
		const includedRegistryFile = resolveIncludePath(includePath, registryDir, registryFile);
		const includedRegistry = await readRegistry(includedRegistryFile, reader);
		includedItems.push(
			...(await readRegistryFile(
				includedRegistryFile,
				includedRegistry,
				reader,
				itemSourcesByItem,
				firstIncludedFrom,
				nextChain
			))
		);
	}

	registry.items.forEach((item, itemIndex) => {
		validateRegistryItemFiles(item, registryFile, registryDir);
		itemSourcesByItem.set(item, { registryFile, registryDir, itemIndex });
	});

	return [...includedItems, ...registry.items];
}

async function readRegistry(registryFile: string, reader: RegistrySourceReader) {
	let json: unknown;
	try {
		json = JSON.parse(await reader.readText(registryFile));
	} catch (e) {
		throw error(`Failed to read or parse registry file at ${registryFile}.`, e);
	}

	const result = sourceRegistrySchema.safeParse(json);
	if (!result.success) {
		throw error(`Invalid registry file at ${registryFile}:\n${result.error.message}`);
	}

	return result.data;
}

function rewriteRegistryItemFilePaths(
	item: SourceItem,
	itemSourcesByItem: Map<SourceItem, RegistryItemSource>
) {
	return {
		...item,
		files: item.files?.map((file) => ({
			...file,
			target:
				file.target ??
				getRegistryItemFileRootPathForItem(item, file.path, itemSourcesByItem),
		})),
	};
}

function stripRegistryItemFileContent(item: ReturnType<typeof rewriteRegistryItemFilePaths>) {
	return {
		...item,
		files: item.files?.map(({ content: _content, ...file }) => file),
	};
}

function getRegistryItemFileSourceForItem(
	item: SourceItem,
	filePath: string,
	itemSourcesByItem: Map<SourceItem, RegistryItemSource>
) {
	const source = itemSourcesByItem.get(item);
	return joinSourcePath(source?.registryDir ?? ".", filePath);
}

function getRegistryItemFileRootPathForItem(
	item: SourceItem,
	filePath: string,
	itemSourcesByItem: Map<SourceItem, RegistryItemSource>
) {
	return relativeSourcePath(
		".",
		getRegistryItemFileSourceForItem(item, filePath, itemSourcesByItem)
	);
}

function resolveIncludePath(includePath: string, registryDir: string, registryFile: string) {
	if (
		isUrl(includePath) ||
		path.posix.isAbsolute(includePath) ||
		hasParentTraversal(includePath)
	) {
		throw error(
			`Invalid include "${includePath}" in ${registryFile}: include paths must be relative registry.json files inside the same repository.`
		);
	}
	if (path.posix.basename(includePath) !== "registry.json") {
		throw error(
			`Invalid include "${includePath}" in ${registryFile}: include paths must explicitly reference a registry.json file.`
		);
	}

	const resolvedPath = joinSourcePath(registryDir, includePath);
	validateRegistryFileWithinRoot(resolvedPath);
	return resolvedPath;
}

function validateRegistryFileWithinRoot(registryFile: string) {
	if (registryFile.startsWith("../") || registryFile === "..") {
		throw error(
			`Invalid registry file at ${registryFile}: registry includes must stay inside the repository root.`
		);
	}
}

function validateRegistryItemFiles(item: SourceItem, registryFile: string, registryDir: string) {
	for (const file of item.files ?? []) {
		if (isUrl(file.path) || path.posix.isAbsolute(file.path) || hasParentTraversal(file.path)) {
			throw error(
				`Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: file paths must be relative and stay inside the registry chunk directory.`
			);
		}
		const resolvedPath = joinSourcePath(registryDir, file.path);
		if (!isPathInside(resolvedPath, registryDir)) {
			throw error(
				`Invalid file path "${file.path}" for item "${item.name}" in ${registryFile}: file paths must stay inside the registry chunk directory.`
			);
		}
	}
}

function validateDuplicateItems(items: SourceItem[]) {
	const seen = new Set<string>();
	for (const item of items) {
		if (seen.has(item.name)) {
			throw error(
				`Duplicate registry item name "${item.name}". Registry item names must be unique.`
			);
		}
		seen.add(item.name);
	}
}

function getSourceDir(filePath: string) {
	return path.posix.dirname(filePath);
}

function joinSourcePath(...parts: string[]) {
	return path.posix.normalize(path.posix.join(...parts));
}

function relativeSourcePath(from: string, to: string) {
	return path.posix.relative(from, to);
}

function hasParentTraversal(filePath: string) {
	return filePath.split(/[\\/]+/).includes("..");
}

function isPathInside(filePath: string, root: string) {
	const relative = path.posix.relative(root, filePath);
	return !!relative && !relative.startsWith("..") && !path.posix.isAbsolute(relative);
}
