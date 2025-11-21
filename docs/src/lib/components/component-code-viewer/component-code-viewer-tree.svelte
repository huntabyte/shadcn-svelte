<script lang="ts">
	import type { FileTree } from "$lib/registry/registry-utils.js";
	import ComponentCodeViewerTree from "./component-code-viewer-tree.svelte";
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileIcon from "@lucide/svelte/icons/file";
	import FolderIcon from "@lucide/svelte/icons/folder";

	let { item, index }: { item: FileTree; index: number } = $props();

	const ctx = ComponentCodeViewerContext.get();
</script>

{#if !item.children}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			style="--index: {index * (index === 2 ? 1.1 : 1.2)}rem"
			isActive={item.path === ctx.activeFile}
			onclick={() => {
				if (!item.path) return;
				ctx.activeFile = item.path;
			}}
			class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 ps-(--index) flex min-w-0 items-center rounded-none"
			data-index={index}
		>
			<ChevronRightIcon class="invisible shrink-0" />
			<FileIcon class="size-4 shrink-0" />
			<span class="truncate pe-2">{item.name}</span>
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
				class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 ps-(--index) whitespace-nowrap rounded-none"
			>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props}>
						<ChevronRightIcon class="transition-transform" />
						<FolderIcon />
						{`ui/${item.name}`}
					</Sidebar.MenuButton>
				{/snippet}
			</Collapsible.Trigger>
			<Collapsible.Content>
				<Sidebar.MenuSub class="m-0 w-full translate-x-0 border-none p-0">
					{#each item.children as subItem, key (key)}
						<ComponentCodeViewerTree item={subItem} index={index + 1} />
					{/each}
				</Sidebar.MenuSub>
			</Collapsible.Content>
		</Collapsible.Root>
	</Sidebar.MenuItem>
{/if}
