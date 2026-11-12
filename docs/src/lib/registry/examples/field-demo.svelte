<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const months = [
		{ label: "01", value: "01" },
		{ label: "02", value: "02" },
		{ label: "03", value: "03" },
		{ label: "04", value: "04" },
		{ label: "05", value: "05" },
		{ label: "06", value: "06" },
		{ label: "07", value: "07" },
		{ label: "08", value: "08" },
		{ label: "09", value: "09" },
		{ label: "10", value: "10" },
		{ label: "11", value: "11" },
		{ label: "12", value: "12" },
	];

	const years = [
		{ label: "2024", value: "2024" },
		{ label: "2025", value: "2025" },
		{ label: "2026", value: "2026" },
		{ label: "2027", value: "2027" },
		{ label: "2028", value: "2028" },
		{ label: "2029", value: "2029" },
	];

	let month = $state("");
	let year = $state("");
</script>

<div class="w-full max-w-md">
	<form>
		<Field.Group>
			<Field.Set>
				<Field.Legend>Payment Method</Field.Legend>
				<Field.Description>All transactions are secure and encrypted</Field.Description>
				<Field.Group>
					<Field.Field>
						<Field.Label for="checkout-7j9-card-name-43j">Name on Card</Field.Label>
						<Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="checkout-7j9-card-number-uw1">Card Number</Field.Label>
						<Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" required />
						<Field.Description>Enter your 16-digit card number</Field.Description>
					</Field.Field>
					<div class="grid grid-cols-3 gap-4">
						<Field.Field>
							<Field.Label for="checkout-exp-month-ts6">Month</Field.Label>
							<Select.Root type="single" items={months} bind:value={month}>
								<Select.Trigger id="checkout-exp-month-ts6">
									<Select.Value placeholder="MM" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each months as item (item.value)}
											<Select.Item value={item.value} label={item.label}>
												{item.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</Field.Field>
						<Field.Field>
							<Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
							<Select.Root type="single" items={years} bind:value={year}>
								<Select.Trigger id="checkout-7j9-exp-year-f59">
									<Select.Value placeholder="YYYY" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each years as item (item.value)}
											<Select.Item value={item.value} label={item.label}>
												{item.label}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</Field.Field>
						<Field.Field>
							<Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
							<Input id="checkout-7j9-cvv" placeholder="123" required />
						</Field.Field>
					</div>
				</Field.Group>
			</Field.Set>
			<Field.Separator />
			<Field.Set>
				<Field.Legend>Billing Address</Field.Legend>
				<Field.Description>
					The billing address associated with your payment method
				</Field.Description>
				<Field.Group>
					<Field.Field orientation="horizontal">
						<Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
						<Field.Label for="checkout-7j9-same-as-shipping-wgm" class="font-normal">
							Same as shipping address
						</Field.Label>
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<Field.Set>
				<Field.Group>
					<Field.Field>
						<Field.Label for="checkout-7j9-optional-comments">Comments</Field.Label>
						<Textarea
							id="checkout-7j9-optional-comments"
							placeholder="Add any additional comments"
							class="resize-none"
						/>
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<Field.Field orientation="horizontal">
				<Button type="submit">Submit</Button>
				<Button variant="outline" type="button">Cancel</Button>
			</Field.Field>
		</Field.Group>
	</form>
</div>
