<script lang="ts">
	import { Terminal } from "lucide-svelte";
	import * as Alert from "@/registry/default/ui/alert";
</script>

<Alert.Root>
	<Terminal class="h-4 w-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>
		You can add components to your app using the cli.
	</Alert.Description>
</Alert.Root>
