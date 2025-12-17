<script lang="ts">
	import Example from "../../components/example.svelte";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
</script>

<Example title="Destructive">
	<div class="mx-auto flex w-full max-w-lg flex-col gap-4">
		<Alert.Root variant="destructive">
			<CircleAlertIcon />
			<Alert.Title>Something went wrong!</Alert.Title>
			<Alert.Description>
				Your session has expired. Please log in again.
			</Alert.Description>
		</Alert.Root>
		<Alert.Root variant="destructive">
			<CircleAlertIcon />
			<Alert.Title>Unable to process your payment.</Alert.Title>
			<Alert.Description>
				<p>
					Please verify your <a href="#/">billing information</a> and try
					again.
				</p>
				<ul class="list-inside list-disc">
					<li>Check your card details</li>
					<li>Ensure sufficient funds</li>
					<li>Verify billing address</li>
				</ul>
			</Alert.Description>
		</Alert.Root>
	</div>
</Example>
