<script lang="ts">
	import { type ComponentType } from "svelte";
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import BlockChunk from "$lib/components/docs/block-chunk.svelte";
	import { cn } from "$lib/utils.js";
	import BlockWrapper from "$lib/components/docs/block-wrapper.svelte";

	export let data: PageData;

	$: block = Blocks[data.block.style][data.block.name];
	$: chunks = block.chunks;

	async function getComponents() {
		const components: Promise<ComponentType>[] = [];
		for (const chunk of chunks) {
			components.push(chunk.component());
		}
		const chunkComponentsPromise = Promise.all(components);
		const componentPromise = block.component();
		const [chunkComponents, Component] = await Promise.all([
			chunkComponentsPromise,
			componentPromise,
		]);

		return {
			chunkComponents,
			Component,
		};
	}
</script>

<div class={cn(data.block.container?.className || "", "theme-zinc")}>
	{#await getComponents() then { chunkComponents, Component }}
		<BlockWrapper {block}>
			<Component />
			{#each chunks as chunk, i (`${chunk.name + data.block.style}`)}
				{@const ChunkComponent = chunkComponents[i]}
				<BlockChunk block={data.block} {chunk}>
					<ChunkComponent />
				</BlockChunk>
			{/each}
		</BlockWrapper>
	{/await}
</div>
