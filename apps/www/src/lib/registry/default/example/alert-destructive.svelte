<script lang="ts">
	import { AlertCircle } from "lucide-svelte";
	import * as Alert from "@/registry/default/ui/alert";
</script>

<Alert.Root variant="destructive">
	<AlertCircle class="h-4 w-4" />
	<Alert.Title>Error</Alert.Title>
	<Alert.Description>
		Your session has expired. Please login again.
	</Alert.Description>
</Alert.Root>
