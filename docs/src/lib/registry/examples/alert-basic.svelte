<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Alert.Root class="max-w-md">
	<CircleCheckIcon />
	<Alert.Title>Account updated successfully</Alert.Title>
	<Alert.Description>
		Your profile information has been saved. Changes will be reflected immediately.
	</Alert.Description>
</Alert.Root>
