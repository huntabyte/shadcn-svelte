<script lang="ts">
	import type { PageData } from "./$types.js";
	import BlockPreview from "$lib/components/docs/block-preview.svelte";

	export let data: PageData;
</script>

{#each data.blocks as block}
	<BlockPreview {block} />
{/each}
