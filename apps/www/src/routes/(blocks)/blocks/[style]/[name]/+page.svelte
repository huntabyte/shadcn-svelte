<script lang="ts">
	import { Index } from "$lib/../__registry__/index.js";
	import type { ComponentType } from "svelte";
	import type { PageData } from "./$types.js";

	export let data: PageData;

	$: component = Index[data.block.style][data.block.name]?.component() as Promise<ComponentType>;
</script>

<div class={data.block.container?.className}>
	{#await component then Component}
		<Component />
	{/await}
</div>
