<script lang="ts">
	import { Alert, AlertTitle, AlertDescription } from "$ui/alert";
</script>

<Alert {...$$restProps}>
	<span class="mr-4 text-2xl">
		<slot name="icon" />
	</span>
	<AlertTitle>
		<slot name="title" />
	</AlertTitle>
	<AlertDescription>
		<slot />
	</AlertDescription>
</Alert>
