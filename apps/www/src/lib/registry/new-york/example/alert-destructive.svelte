<script lang="ts">
	import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
	import * as Alert from "$lib/registry/new-york/ui/alert/index.js";
</script>

<Alert.Root variant="destructive">
	<ExclamationTriangle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
