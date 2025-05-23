<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Alert.Root>
	<TerminalIcon class="size-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
