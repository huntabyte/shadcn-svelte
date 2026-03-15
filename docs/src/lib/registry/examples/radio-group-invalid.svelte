<script lang="ts">
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="flex flex-col gap-3">
	<RadioGroup.Root>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="card" id="ri-card" aria-invalid="true" />
			<Label for="ri-card">Card</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="paypal" id="ri-paypal" aria-invalid="true" />
			<Label for="ri-paypal">PayPal</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="apple" id="ri-apple" aria-invalid="true" />
			<Label for="ri-apple">Apple Pay</Label>
		</div>
	</RadioGroup.Root>
	<p class="text-destructive text-sm">Please select a payment method.</p>
</div>
