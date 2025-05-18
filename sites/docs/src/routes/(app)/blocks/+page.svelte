<script lang="ts">
	import type { PageData } from "./$types.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import BlockViewer from "$lib/components/docs/block-viewer.svelte";
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#each data.blocks as block (block.name)}
		<div class="border-grid container border-b py-8 first:pt-6 last:border-b-0 md:py-12">
			<BlockViewer
				item={block}
				tree={createFileTreeForRegistryItemFiles(block.files)}
				highlightedFiles={block.files}
			/>
		</div>
	{/each}
	<div class="container-wrapper">
		<div class="container flex justify-center py-6">
			<Button href="/blocks/sidebar" variant="outline">Browse all blocks</Button>
		</div>
	</div>
</div>
