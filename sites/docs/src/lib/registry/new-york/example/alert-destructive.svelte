<script lang="ts">
	import CircleAlert from "@lucide/svelte/icons/circle-alert";
	import * as Alert from "$lib/registry/new-york/ui/alert/index.js";
</script>

<Alert.Root variant="destructive">
	<CircleAlert class="size-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>Your session has expired. Please login again.</Alert.Description>
</Alert.Root>
