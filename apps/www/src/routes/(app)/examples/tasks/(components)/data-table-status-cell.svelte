<script lang="ts">
	import { statuses } from "../(data)/data.js";

	let { value }: { value: string } = $props();

	const status = statuses.find((status) => status.value === value);
	const Icon = status?.icon;
</script>

{#if status}
	<div class="flex w-[100px] items-center">
		{#if Icon}
			<Icon class="mr-2 size-4 text-muted-foreground" />
		{/if}
		<span>{status.label}</span>
	</div>
{/if}
