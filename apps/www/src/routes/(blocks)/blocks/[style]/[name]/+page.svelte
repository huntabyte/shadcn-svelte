<script lang="ts">
	import type { ComponentType } from "svelte";
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import BlockChunk from "$lib/components/docs/block-chunk.svelte";
	import { cn } from "$lib/utils.js";

	export let data: PageData;

	$: block = Blocks[data.block.style][data.block.name];
	$: chunks = block.chunks;

	$: component = block?.component() as Promise<ComponentType>;
</script>

<div class={cn(data.block.container?.className || "", "theme-zinc")}>
	{#await component then Component}
		<Component />
	{/await}
	{#each chunks as chunk}
		<BlockChunk block={data.block} {chunk}>
			{#await chunk.component() then Component}
				<Component />
			{:catch}
				<div class="text-center text-gray-500">Error loading chunk</div>
			{/await}
		</BlockChunk>
	{/each}
</div>
