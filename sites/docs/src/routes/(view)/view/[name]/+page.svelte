<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Blocks } from "../../../../__registry__/blocks.js";
	import type { PageData } from "./$types.js";

	let { data }: { data: PageData } = $props();

	const block = $derived(Blocks[data.block.name]);

	async function getComponents() {
		const BlockComponent = await block.component();

		return {
			BlockComponent,
		};
	}
</script>

<div class={cn("themes-wrapper bg-background", data.block?.container?.className)}>
	{#await getComponents()}
		loading...
	{:then { BlockComponent }}
		<BlockComponent />
	{:catch}
		Error loading block
	{/await}
</div>
