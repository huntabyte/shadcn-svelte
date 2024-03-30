<script lang="ts">
	import BlockPreview from "$lib/components/docs/block-preview.svelte";
	import type { PageData } from "./$types.js";

	export let data: PageData;
</script>

{#each data.blocks as block}
	<BlockPreview {block} />
{/each}
