<script lang="ts">
	import type { PageData } from "./$types.js";
	import { Blocks } from "../../../../../__registry__/blocks.js";
	import { cn } from "$lib/utils.js";
	import BlockWrapper from "$lib/components/docs/block-wrapper.svelte";

	let { data }: { data: PageData } = $props();

	const block = $derived(Blocks[data.block.style][data.block.name]);

	async function getComponents() {
		const BlockComponent = await block.component();
		return {
			BlockComponent,
		};
	}
</script>

<div class={cn(data.block.container?.className || "", "theme-zinc")}>
	{#await getComponents() then { BlockComponent }}
		<BlockWrapper {block}>
			<BlockComponent />
		</BlockWrapper>
	{/await}
</div>
