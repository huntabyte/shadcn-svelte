<script lang="ts">
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import ComponentCodeViewerTree from "./component-code-viewer-tree.svelte";

	const ctx = ComponentCodeViewerContext.get();
</script>

<Sidebar.Provider class="flex h-full min-h-0! flex-col select-none">
	<Sidebar.Root collapsible="none" class="h-full w-full flex-1">
		<Sidebar.GroupLabel class="h-12 rounded-none border-b px-4 text-sm">
			Files
		</Sidebar.GroupLabel>
		<Sidebar.Group class="overflow-y-auto p-0">
			<Sidebar.GroupContent>
				<Sidebar.Menu class="translate-x-0 gap-1.5">
					{#if ctx.tree}
						{#each ctx.tree as file, index (index)}
							<ComponentCodeViewerTree item={file} index={1} />
						{/each}
					{/if}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Root>
</Sidebar.Provider>
