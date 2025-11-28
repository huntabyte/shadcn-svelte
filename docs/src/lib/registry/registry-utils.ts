import type { RegistryItemFile } from "@shadcn-svelte/registry";

export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

export function transformBlockPath(target: string, type: RegistryItemFile["type"]): string {
	const parts = target.split("/");

	if (type === "registry:page" || type === "registry:file") {
		return `routes/${target}`;
	}

	if (type === "registry:component" || type === "registry:hook") {
		const dir = type === "registry:component" ? "components" : "hooks";
		const idx = parts.indexOf(dir);

		const remainingPath = parts.slice(idx + 1).join("/");
		return `${dir}/${remainingPath}`;
	}

	return target;
}

export function createFileTreeForRegistryItemFiles(
	files: Array<{ target: string; type: RegistryItemFile["type"] }> | undefined
): FileTree[] {
	if (!files || !Array.isArray(files)) {
		return [];
	}
	
	const root: FileTree[] = [];

	for (const file of files) {
		const path = file.target;
		const parts = path.split("/");
		let currentLevel = root;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);

			if (existingNode) {
				if (isFile) {
					existingNode.path = path;
				} else {
					currentLevel = existingNode.children!;
				}
			} else {
				const newNode: FileTree = isFile
					? { name: part, path }
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

export function transformImportPaths(content: string): string {
	const aliases = {
		ui: "$lib/components/ui",
		utils: "$lib/utils",
		components: "$lib/components",
		hooks: "$lib/hooks",
		lib: "$lib",
	};
	for (const [alias, path] of Object.entries(aliases)) {
		content = content.replaceAll(`$${alias.toUpperCase()}$`, path);
	}
	return content;
}
