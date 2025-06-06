<script lang="ts">
	import { BlockViewerContext } from "./block-viewer.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import BlockViewerTree from "./block-viewer-tree.svelte";

	const ctx = BlockViewerContext.get();
</script>

<Sidebar.Provider class="flex !min-h-full flex-col">
	<Sidebar.Root
		collapsible="none"
		class="w-full flex-1 border-r border-zinc-700 bg-zinc-900 text-white"
	>
		<Sidebar.GroupLabel
			class="h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white"
		>
			Files
		</Sidebar.GroupLabel>
		<Sidebar.Group class="p-0">
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-1.5">
					{#if ctx.tree}
						{#each ctx.tree as file, index (index)}
							<BlockViewerTree item={file} index={1} />
						{/each}
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Root>
</Sidebar.Provider>
