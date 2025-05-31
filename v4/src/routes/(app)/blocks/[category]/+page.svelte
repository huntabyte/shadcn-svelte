<script lang="ts">
	import type { PageData } from "./$types.js";
	import BlockViewer from "$lib/components/block-viewer.svelte";
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";

	let { data }: { data: PageData } = $props();
</script>

{#each data.blocks as block (block.name)}
	<div class="flex flex-col gap-12 md:gap-24">
		<BlockViewer
			item={block}
			tree={createFileTreeForRegistryItemFiles(block.files)}
			highlightedFiles={block.files}
		/>
	</div>
{/each}
