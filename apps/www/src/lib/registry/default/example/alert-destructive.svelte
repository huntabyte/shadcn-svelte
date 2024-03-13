<script lang="ts">
	import * as Alert from "$lib/registry/default/ui/alert/index.js";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
</script>

<Alert.Root variant="destructive">
	<CircleAlert class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
