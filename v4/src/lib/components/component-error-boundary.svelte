<script lang="ts">
	import type { Snippet } from "svelte";

	let { name, children }: { name: string; children: Snippet } = $props();
</script>

<svelte:boundary
	onerror={(error) => {
		console.error(`Error in component ${name}:`, error);
	}}
>
	{@render children()}
	{#snippet failed()}
		<div class="p-4 text-red-500">
			Something went wrong in component: {name}
		</div>
	{/snippet}
</svelte:boundary>
