<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const monthItems = [
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

	const yearItems = [
		{ label: "2024", value: "2024" },
		{ label: "2025", value: "2025" },
		{ label: "2026", value: "2026" },
		{ label: "2027", value: "2027" },
		{ label: "2028", value: "2028" },
		{ label: "2029", value: "2029" },
	];

	let month = $state<string | undefined>(undefined);
	let year = $state<string | undefined>(undefined);

	const monthLabel = $derived(monthItems.find((item) => item.value === month)?.label ?? "MM");
	const yearLabel = $derived(yearItems.find((item) => item.value === year)?.label ?? "YYYY");
</script>

<Example title="Complex Form">
	<Card.Root class="w-full max-w-md">
		<Card.Header>
			<Card.Title>Payment Method</Card.Title>
			<Card.Description>All transactions are secure and encrypted</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Field.Group>
					<Field.Set>
						<Field.Group>
							<Field.Field>
								<Field.Label for="checkout-7j9-card-name-43j"
									>Name on Card</Field.Label
								>
								<Input
									id="checkout-7j9-card-name-43j"
									placeholder="John Doe"
									required
								/>
							</Field.Field>
							<div class="grid grid-cols-3 gap-4">
								<Field.Field class="col-span-2">
									<Field.Label for="checkout-7j9-card-number-uw1">
										Card Number
									</Field.Label>
									<Input
										id="checkout-7j9-card-number-uw1"
										placeholder="1234 5678 9012 3456"
										required
									/>
									<Field.Description
										>Enter your 16-digit number.</Field.Description
									>
								</Field.Field>
								<Field.Field class="col-span-1">
									<Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
									<Input id="checkout-7j9-cvv" placeholder="123" required />
								</Field.Field>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<Field.Field>
									<Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label
									>
									<Select.Root type="single" bind:value={month}>
										<Select.Trigger id="checkout-7j9-exp-month-ts6">
											{monthLabel}
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												{#each monthItems as item (item.value)}
													<Select.Item value={item.value}
														>{item.label}</Select.Item
													>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</Field.Field>
								<Field.Field>
									<Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
									<Select.Root type="single" bind:value={year}>
										<Select.Trigger id="checkout-7j9-exp-year-f59">
											{yearLabel}
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												{#each yearItems as item (item.value)}
													<Select.Item value={item.value}
														>{item.label}</Select.Item
													>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</Field.Field>
							</div>
						</Field.Group>
					</Field.Set>
					<Field.Separator />
					<Field.Set>
						<Field.Legend>Billing Address</Field.Legend>
						<Field.Description>
							The billing address associated with your payment.
						</Field.Description>
						<Field.Group>
							<Field.Field orientation="horizontal">
								<Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
								<Field.Label
									for="checkout-7j9-same-as-shipping-wgm"
									class="font-normal"
								>
									Same as shipping address
								</Field.Label>
							</Field.Field>
						</Field.Group>
					</Field.Set>
					<Field.Separator />
					<Field.Set>
						<Field.Group>
							<Field.Field>
								<Field.Label for="checkout-7j9-optional-comments"
									>Comments</Field.Label
								>
								<Textarea
									id="checkout-7j9-optional-comments"
									placeholder="Add any additional comments"
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
		</Card.Content>
	</Card.Root>
</Example>
