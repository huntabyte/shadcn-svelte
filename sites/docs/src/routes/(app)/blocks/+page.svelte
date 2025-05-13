<script lang="ts">
	import type { PageData } from "./$types.js";
	import BlockPreview from "$lib/components/docs/block-preview.svelte";

	let { data }: { data: PageData } = $props();
</script>

{#each data.blocks as block (block)}
	<BlockPreview {block} />
{/each}
