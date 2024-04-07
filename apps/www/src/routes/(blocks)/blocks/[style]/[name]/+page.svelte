<script lang="ts">
	import type { ComponentType } from "svelte";
	import type { PageData } from "./$types.js";
	import { Index } from "$lib/../__registry__/index.js";

	export let data: PageData;

	$: entry = Index[data.block.style][data.block.name];
	$: component = entry?.component() as Promise<ComponentType>;
</script>

<div class={data.block.container?.className}>
	{#await component then Component}
		<Component />
	{/await}
</div>
