<script lang="ts">
	import type { PageData } from "./$types.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import BlockViewer from "$lib/components/block-viewer.svelte";
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-12 md:gap-24">
	{#each data.blocks as block (block.name)}
		<BlockViewer
			item={block}
			tree={createFileTreeForRegistryItemFiles(block.files)}
			highlightedFiles={block.files}
		/>
	{/each}
	<div class="container-wrapper">
		<div class="container flex justify-center py-6">
			<Button href="/blocks/sidebar" variant="outline">Browse more blocks</Button>
		</div>
	</div>
</div>
