<script lang="ts">
	import TailwindIndicator from "$lib/components/tailwind-indicator.svelte";
	import "../app.css";

	let { children } = $props();
</script>

<TailwindIndicator />
{@render children()}
