<script lang="ts">
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import { cn } from "$lib/utils.js";

	let { data }: { data: PageData } = $props();

	const block = $derived(Blocks[data.block.name]);

	async function getComponents() {
		const BlockComponent = await block.component();

		return {
			BlockComponent,
		};
	}
</script>

<div class={cn(data.block.container?.className || "", "theme-zinc")}>
	{#await getComponents() then { BlockComponent }}
		<BlockComponent />
	{/await}
</div>
