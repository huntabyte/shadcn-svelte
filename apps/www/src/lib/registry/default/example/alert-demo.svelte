<script lang="ts">
	import { Terminal } from "lucide-svelte";
	import {
		Alert,
		AlertDescription,
		AlertTitle
	} from "@/registry/default/ui/alert";
</script>

<Alert>
	<Terminal class="h-4 w-4" />
	<AlertTitle>Heads up!</AlertTitle>
	<AlertDescription>
		You can add components to your app using the cli.
	</AlertDescription>
</Alert>
