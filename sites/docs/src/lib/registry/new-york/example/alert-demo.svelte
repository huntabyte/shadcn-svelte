<script lang="ts">
	import Rocket from "svelte-radix/Rocket.svelte";
	import * as Alert from "$lib/registry/new-york/ui/alert/index.js";
</script>

<Alert.Root>
	<Rocket class="h-4 w-4" />
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
