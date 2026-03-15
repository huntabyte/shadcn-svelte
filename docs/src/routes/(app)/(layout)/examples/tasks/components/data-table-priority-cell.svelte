<script lang="ts">
	import { priorities } from "../data/data.js";

	let { value }: { value: string } = $props();

	const priority = $derived(priorities.find((p) => p.value === value));
</script>

{#if priority}
	<div class="flex items-center">
		<priority.icon class="text-muted-foreground me-2 size-4" />
		<span>{priority.label}</span>
	</div>
{/if}
