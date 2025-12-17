<script lang="ts">
	import type { PageData } from "./$types.js";
	import BlockViewer from "$lib/components/block-viewer.svelte";
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";

	let { data }: { data: PageData } = $props();
</script>

{#snippet Placeholder()}
	<div class="mt-2 flex min-h-[331px] w-full items-center justify-center rounded-md border p-4">
		<Skeleton class="h-[297px] w-[250px]" />
	</div>
{/snippet}

<div class="flex flex-col gap-12 md:gap-24">
	{#each data.blocks as block (block.name)}
		<BlockViewer item={block} tree={createFileTreeForRegistryItemFiles(block.files)}>
			{#await block.component}
				{@render Placeholder()}
			{:then component}
				<ComponentPreview
					name={block.name}
					{component}
					hideCode
					class="my-0 **:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0"
				/>
			{/await}
		</BlockViewer>
	{/each}
</div>
