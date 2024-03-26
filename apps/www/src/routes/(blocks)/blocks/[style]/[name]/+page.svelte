<script lang="ts">
	import type { PageData } from "./$types.js";

	export let data: PageData;

	console.log(data.block);
</script>

<div class={data.block.container?.className}>
	<svelte:component this={data.block.component} />
</div>
