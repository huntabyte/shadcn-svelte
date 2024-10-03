<script lang="ts">
	import { priorities } from "../../(data)/data.js";

	export let value: string;

	$: priority = priorities.find((priority) => priority.value === value);
	$: Icon = priority?.icon;
</script>

{#if priority}
	<div class="flex items-center">
		{#if Icon}
			<Icon class="text-muted-foreground mr-2 size-4" />
		{/if}
		<span>{priority.label}</span>
	</div>
{/if}
