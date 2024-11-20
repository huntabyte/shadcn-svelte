<script lang="ts">
	import { priorities } from "../(data)/data.js";

	let { value }: { value?: string } = $props();

	const priority = $derived(priorities.find((priority) => priority.value === value));
	const Icon = $derived(priority?.icon);
</script>

{#if priority}
	<div class="flex items-center">
		{#if Icon}
			<Icon class="text-muted-foreground mr-2 size-4" />
		{/if}
		<span>{priority.label}</span>
	</div>
{/if}
