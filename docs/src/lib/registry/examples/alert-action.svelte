<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Alert.Root class="max-w-md">
	<Alert.Title>Dark mode is now available</Alert.Title>
	<Alert.Description>Enable it under your profile settings to get started.</Alert.Description>
	<Alert.Action>
		<Button size="xs">Enable</Button>
	</Alert.Action>
</Alert.Root>
