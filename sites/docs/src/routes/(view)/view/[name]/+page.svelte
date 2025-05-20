<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";
	import type { PageProps } from "./$types.js";

	let { data }: PageProps = $props();

	const block = $derived(Blocks[data.block.name]);
</script>

<div class={cn("themes-wrapper bg-background", data.block?.container?.className)}>
	{#await block.component() then BlockComponent}
		<BlockComponent />
	{/await}
</div>
