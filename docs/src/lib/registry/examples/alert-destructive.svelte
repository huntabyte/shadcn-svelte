<script lang="ts">
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Alert.Root variant="destructive">
	<AlertCircleIcon />
	<Alert.Title>Payment failed</Alert.Title>
	<Alert.Description>
		Your payment could not be processed. Please check your payment method and try again.
	</Alert.Description>
</Alert.Root>
