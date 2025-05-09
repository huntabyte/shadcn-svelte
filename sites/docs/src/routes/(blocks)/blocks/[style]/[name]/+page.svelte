<script lang="ts">
	import type { Component } from "svelte";
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import { cn } from "$lib/utils.js";
	import BlockWrapper from "$lib/components/docs/block-wrapper.svelte";
	import BlockChunk from "$lib/components/docs/block-chunk.svelte";
	import type { RawBlockChunk } from "$lib/blocks.js";

	let { data }: { data: PageData } = $props();

	const block = $derived(Blocks[data.block.style][data.block.name]);
	const chunks = $derived(block.chunks) as Array<RawBlockChunk>;

	async function getComponents() {
		const components: Promise<Component>[] = chunks.map((chunk) => chunk.component());
		const chunkComponents = await Promise.all(components);
		const BlockComponent = await block.component();

		return {
			chunkComponents,
			BlockComponent,
		};
	}
</script>

<div class={cn(data.block.container?.className || "", "theme-zinc")}>
	{#await getComponents() then { chunkComponents, BlockComponent }}
		<BlockWrapper {block}>
			<BlockComponent />
			{#each chunks as chunk, i (chunk)}
				{@const ChunkComponent = chunkComponents[i]}
				<BlockChunk block={data.block} {chunk}>
					<ChunkComponent />
				</BlockChunk>
			{/each}
		</BlockWrapper>
	{/await}
</div>
