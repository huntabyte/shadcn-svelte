<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
</script>

<Alert.Root class="max-w-md">
	<CheckCircle2Icon />
	<Alert.Title>Account updated successfully</Alert.Title>
	<Alert.Description>
		Your profile information has been saved. Changes will be reflected immediately.
	</Alert.Description>
</Alert.Root>
