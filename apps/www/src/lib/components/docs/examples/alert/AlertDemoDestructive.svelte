<script lang="ts">
	import { AlertCircle } from "lucide-svelte";
	import {
		Alert,
		AlertDescription,
		AlertTitle
	} from "@/registry/default/ui/alert";
</script>

<Alert variant="destructive">
	<AlertCircle class="h-4 w-4" />
	<AlertTitle>Error</AlertTitle>
	<AlertDescription>
		Your session has expired. Please login again.
	</AlertDescription>
</Alert>
