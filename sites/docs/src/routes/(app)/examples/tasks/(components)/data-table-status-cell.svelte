<script lang="ts">
	import { statuses } from "../(data)/data.js";

	let { value }: { value?: string } = $props();

	const status = $derived(statuses.find((status) => status.value === value));
	const Icon = $derived(status?.icon);
</script>

{#if status}
	<div class="flex w-[100px] items-center">
		{#if Icon}
			<Icon class="text-muted-foreground mr-2 size-4" />
		{/if}
		<span>{status.label}</span>
	</div>
{/if}
