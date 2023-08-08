<script lang="ts">
	import { Rocket } from "radix-icons-svelte";
	import * as Alert from "@/registry/new-york/ui/alert";
</script>

<Alert.Root>
	<Rocket class="h-4 w-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>
		You can add components to your app using the cli.
	</Alert.Description>
</Alert.Root>
