<script lang="ts">
	import FileTreeNode, { type FileNode } from "$lib/components/file-tree/file-tree-node.svelte";

	const files: FileNode[] = [
		{
			type: "folder",
			name: "app",
			path: "app",
			children: [
				{ type: "file", name: "layout.tsx", path: "app/layout.tsx" },
				{ type: "file", name: "page.tsx", path: "app/page.tsx" },
			],
		},
		{
			type: "folder",
			name: "components",
			path: "components",
			children: [
				{
					type: "folder",
					name: "ui",
					path: "components/ui",
					children: [
						{
							type: "file",
							name: "button.tsx",
							path: "components/ui/button.tsx",
						},
					],
				},
				{
					type: "file",
					name: "login-form.tsx",
					path: "components/login-form.tsx",
				},
			],
		},
	];

	let selected = $state("components/ui/button.tsx");
</script>

<div class="flex w-full max-w-xs flex-col py-6 text-sm">
	{#each files as node (node.path)}
		<FileTreeNode {node} {selected} onSelect={(path) => (selected = path)} />
	{/each}
</div>
