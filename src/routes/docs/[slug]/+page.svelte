<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	$: ({ component, meta } = data);
</script>

<svelte:component this={component} />
