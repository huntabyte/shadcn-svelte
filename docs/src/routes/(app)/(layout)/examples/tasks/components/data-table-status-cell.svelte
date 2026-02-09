<script lang="ts">
	import { statuses } from "../data/data.js";

	let { value }: { value: string } = $props();

	const status = $derived(statuses.find((s) => s.value === value));
</script>

{#if status}
	<div class="flex w-[100px] items-center">
		<status.icon class="text-muted-foreground me-2 size-4" />
		<span>{status.label}</span>
	</div>
{/if}
