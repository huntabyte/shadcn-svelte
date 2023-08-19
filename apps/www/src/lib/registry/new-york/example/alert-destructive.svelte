<script lang="ts">
	import { ExclamationTriangle } from "radix-icons-svelte";
	import * as Alert from "@/registry/new-york/ui/alert";
</script>

<Alert.Root variant="destructive">
	<ExclamationTriangle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>
		Your session has expired. Please login again.
	</Alert.Description>
</Alert.Root>
