<script lang="ts">
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import * as Alert from "$lib/registry/ui/alert/index.js";
</script>

<Alert.Root variant="destructive" class="max-w-md">
	<CircleAlertIcon />
	<Alert.Title>Payment failed</Alert.Title>
	<Alert.Description>
		Your payment could not be processed. Please check your payment method and try again.
	</Alert.Description>
</Alert.Root>
