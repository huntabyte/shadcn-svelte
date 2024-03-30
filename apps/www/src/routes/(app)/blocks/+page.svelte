<script lang="ts">
	import BlockPreview from "$lib/components/docs/block-preview.svelte";
	import type { PageData } from "./$types.js";
	import { blockNames } from "$lib/registry/schema.js";
	import { config } from "$lib/stores/config.js";

	export let data: PageData;
</script>

{#each blockNames as blockName}
	{@const block = data.blocks.find(
		(block) => block.name === blockName && block.style === $config.style
	)}
	{#if !block}
		<p>Block not found: {blockName}</p>
	{:else}
		<BlockPreview {block} />
	{/if}
{/each}
