<script lang="ts">
	import type { PageData } from "./$types.js";
	import BlockViewer from "$lib/components/block-viewer.svelte";
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";

	let { data }: { data: PageData } = $props();

	const mobile = new IsMobile(1024);
</script>

<div class="flex flex-col gap-12 md:gap-24">
	{#each data.blocks as block (block.name)}
		<BlockViewer
			item={block}
			tree={createFileTreeForRegistryItemFiles(block.files)}
			highlightedFiles={block.files}
		>
			{#if mobile.current}
				{#await block.component}
					loading
				{:then component}
					<ComponentPreview
						name={block.name}
						{component}
						hideCode
						class="**:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0 my-0"
					/>
				{/await}
			{/if}
		</BlockViewer>
	{/each}
</div>
