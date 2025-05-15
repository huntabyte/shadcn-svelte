import type { RegistryItemFile } from "@shadcn-svelte/registry";

export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

function transformPath(target: string, type: RegistryItemFile["type"]): string {
	const parts = target.split("/");

	if (type === "registry:page") {
		return `routes/${target}`;
	}

	if (type === "registry:component" || type === "registry:hook") {
		const dir = type === "registry:component" ? "components" : "hooks";
		const remainingPath = parts.slice(1).join("/");
		return `${dir}/${remainingPath}`;
	}

	return target;
}

export function createFileTreeForRegistryItemFiles(
	files: Array<{ target: string; type: RegistryItemFile["type"] }>
) {
	const root: FileTree[] = [];

	for (const file of files) {
		const transformedPath = transformPath(file.target, file.type);
		const parts = transformedPath.split("/");
		let currentLevel = root;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);

			if (existingNode) {
				if (isFile) {
					existingNode.path = transformedPath;
				} else {
					currentLevel = existingNode.children!;
				}
			} else {
				const newNode: FileTree = isFile
					? { name: part, path: transformedPath }
					: { name: part, children: [] };

				currentLevel.push(newNode);

				if (!isFile) {
					currentLevel = newNode.children!;
				}
			}
		}
	}

	return root;
}
const blocksRegex = /^\$lib\/registry\/blocks\/[^/]+\/(?:components\/)?(.+)$/;
const uiRegex = /^\$lib\/registry\/ui\/(.+)$/;
const importRegex = /(import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"])([^'"]+)(['"])/g;

export function transformImportPaths(content: string): string {
	return content.replace(importRegex, (_, importStart, path, importEnd) => {
		// Transform the path using our existing logic
		let newPath = path.replace(blocksRegex, "$lib/components/$1");
		if (newPath !== path) return importStart + newPath + importEnd;

		newPath = path.replace(uiRegex, "$lib/components/ui/$1");
		return importStart + newPath + importEnd;
	});
}
