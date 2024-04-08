<script lang="ts">
	import type { ComponentType } from "svelte";
	import type { PageData } from "./$types.js";
	import { Blocks } from "$lib/../__registry__/blocks.js";

	export let data: PageData;

	$: block = Blocks[data.block.style][data.block.name];
	$: component = block?.component() as Promise<ComponentType>;
</script>

<div class={data.block.container?.className}>
	{#await component then Component}
		<Component />
	{/await}
</div>
