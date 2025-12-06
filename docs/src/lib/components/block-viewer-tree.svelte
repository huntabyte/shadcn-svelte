<script lang="ts">
	import type { FileTree } from "$lib/registry/registry-utils.js";
	import BlockViewerTree from "./block-viewer-tree.svelte";
	import { BlockViewerContext } from "./block-viewer.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileIcon from "@lucide/svelte/icons/file";
	import FolderIcon from "@lucide/svelte/icons/folder";

	const ctx = BlockViewerContext.get();

	let { item, index }: { item: FileTree; index: number } = $props();
</script>

{#if !item.children}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			style="--index: {index * (index === 2 ? 1.2 : 1.3)}rem"
			isActive={item.path === ctx.activeFile}
			onclick={() => {
				if (!item.path) return;
				ctx.activeFile = item.path;
			}}
			class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none ps-(--index) whitespace-nowrap"
			data-index={index}
		>
			<ChevronRightIcon class="invisible" />
			<FileIcon class="size-4" />
			{item.name}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Sidebar.MenuItem>
		<Collapsible.Root
			class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
			open={true}
		>
			<Collapsible.Trigger
				style="--index: {index * (index === 1 ? 1 : 1.2)}rem"
				class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none ps-(--index) whitespace-nowrap"
			>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props}>
						<ChevronRightIcon class="transition-transform" />
						<FolderIcon />
						{item.name === "components" ? "lib/components" : item.name}
					</Sidebar.MenuButton>
				{/snippet}
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Sidebar.MenuSub class="m-0 w-full translate-x-0 border-none p-0">
					{#each item.children as subItem, key (key)}
						<BlockViewerTree item={subItem} index={index + 1} />
					{/each}
				</Sidebar.MenuSub>
			</Collapsible.Content>
		</Collapsible.Root>
	</Sidebar.MenuItem>
{/if}
