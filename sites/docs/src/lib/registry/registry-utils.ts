export type FileTree = {
	name: string;
	path?: string;
	children?: FileTree[];
};

export function createFileTreeForRegistryItemFiles(
	files: Array<{ path: string; target?: string }>
) {
	const root: FileTree[] = [];

	for (const file of files) {
		const path = file.target ?? file.path;
		const parts = path.split("/");
		let currentLevel = root;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isFile = i === parts.length - 1;
			const existingNode = currentLevel.find((node) => node.name === part);

			if (existingNode) {
				if (isFile) {
					// Update existing file node with full path
					existingNode.path = path;
				} else {
					// Move to next level in the tree
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
