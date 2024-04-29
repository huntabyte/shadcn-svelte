<script lang="ts">
	import type { ComponentType } from "svelte";
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import { cn } from "$lib/utils.js";
	import BlockWrapper from "$lib/components/docs/block-wrapper.svelte";
	import BlockChunk from "$lib/components/docs/block-chunk.svelte";

	export let data: PageData;

	$: block = Blocks[data.block.style][data.block.name];
	$: chunks = block.chunks;

	async function getComponents() {
		const components: Promise<ComponentType>[] = chunks.map((chunk) => chunk.component());
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
			{#each chunks as chunk, i}
				{@const ChunkComponent = chunkComponents[i]}
				<BlockChunk block={data.block} {chunk}>
					<ChunkComponent />
				</BlockChunk>
			{/each}
		</BlockWrapper>
	{/await}
</div>
