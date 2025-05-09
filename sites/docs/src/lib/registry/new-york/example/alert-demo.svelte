<script lang="ts">
	import Terminal from "@lucide/svelte/icons/terminal";
	import * as Alert from "$lib/registry/new-york/ui/alert/index.js";
</script>

<Alert.Root>
	<Terminal class="size-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
