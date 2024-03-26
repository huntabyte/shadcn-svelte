<script lang="ts">
	import type { PageData } from "./$types.js";

	export let data: PageData;
</script>

<div class={data.block.container?.class}>
	<svelte:component this={data.block.component} />
</div>
