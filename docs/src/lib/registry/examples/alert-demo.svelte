<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
	import InfoIcon from "@lucide/svelte/icons/info";
</script>

<div class="grid w-full max-w-xl items-start gap-4">
	<Alert.Root>
		<CheckCircle2Icon />
		<Alert.Title>Payment successful</Alert.Title>
		<Alert.Description>
			Your payment of $29.99 has been processed. A receipt has been sent to your email
			address.
		</Alert.Description>
	</Alert.Root>
	<Alert.Root>
		<InfoIcon />
		<Alert.Title>New feature available</Alert.Title>
		<Alert.Description>
			We&apos;ve added dark mode support. You can enable it in your account settings.
		</Alert.Description>
	</Alert.Root>
</div>
