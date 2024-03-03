<script lang="ts">
	import { statuses } from "../(data)/data.js";

	export let value: string;
	const status = statuses.find((status) => status.value === value);
	const Icon = status?.icon;
</script>

{#if status}
	<div class="flex w-[100px] items-center">
		{#if Icon}
			<Icon class="text-muted-foreground mr-2 h-4 w-4" />
		{/if}
		<span>{status.label}</span>
	</div>
{/if}
