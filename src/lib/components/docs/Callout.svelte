<script lang="ts">
	import { Alert, AlertTitle, AlertDescription } from "$ui/alert";
</script>

<Alert {...$$restProps}>
	{#if $$slots.icon}
		<span class="mr-4 text-2xl">
			<slot name="icon" />
		</span>
	{/if}
	<AlertTitle>
		<slot name="title" />
	</AlertTitle>
	<AlertDescription>
		<slot />
	</AlertDescription>
</Alert>
