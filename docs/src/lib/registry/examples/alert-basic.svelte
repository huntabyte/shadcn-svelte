<script lang="ts">
	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Alert.Root class="max-w-md">
	<CheckCircle2Icon />
	<Alert.Title>Account updated successfully</Alert.Title>
	<Alert.Description>
		Your profile information has been saved. Changes will be reflected immediately.
	</Alert.Description>
</Alert.Root>
