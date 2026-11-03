<script lang="ts" module>
	export type FileNode =
		| { type: "file"; name: string; path: string }
		| { type: "folder"; name: string; path: string; children: FileNode[] };
</script>

<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileIcon from "@lucide/svelte/icons/file";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import FileTreeNode from "./file-tree-node.svelte";

	let {
		node,
		selected,
		onSelect,
	}: {
		node: FileNode;
		selected: string;
		onSelect: (path: string) => void;
	} = $props();
</script>

{#if node.type === "folder"}
	<Collapsible.Root open class="group/folder">
		<Collapsible.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					size="sm"
					class="w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"
				>
					<ChevronRightIcon class="transition-transform group-data-[state=open]/folder:rotate-90" />
					<FolderIcon />
					{node.name}
				</Button>
			{/snippet}
		</Collapsible.Trigger>
		<Collapsible.Content>
			<div class="ml-4 flex flex-col">
				{#each node.children as child (child.path)}
					<FileTreeNode node={child} {selected} {onSelect} />
				{/each}
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
{:else}
	<Button
		variant="ghost"
		size="sm"
		class={cn(
			"w-full justify-start font-normal",
			selected === node.path && "bg-accent text-accent-foreground"
		)}
		aria-current={selected === node.path ? "true" : undefined}
		onclick={() => onSelect(node.path)}
	>
		<FileIcon />
		{node.name}
	</Button>
{/if}
