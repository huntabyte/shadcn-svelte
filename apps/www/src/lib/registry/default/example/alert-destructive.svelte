<script lang="ts">
	import AlertCircle from "lucide-svelte/icons/alert-circle";
	import * as Alert from "$lib/registry/default/ui/alert/index.js";
</script>

<Alert.Root variant="destructive">
	<AlertCircle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
