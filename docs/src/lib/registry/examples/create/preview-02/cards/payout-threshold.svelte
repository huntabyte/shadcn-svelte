<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const CURRENCIES = [
		{ label: "USD — United States Dollar", value: "usd" },
		{ label: "EUR — Euro", value: "eur" },
		{ label: "GBP — British Pound", value: "gbp" },
		{ label: "JPY — Japanese Yen", value: "jpy" },
	] as const;

	let amount = $state([3000]);
	let currency = $state<string>("usd");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Payout Threshold</Card.Title>
		<Card.Description
			>Set the minimum balance required before a payout is triggered.</Card.Description
		>
		<Card.Action>
			<Button variant="ghost" size="icon-sm" class="bg-muted">
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field>
				<Field.Label for="preferred-currency">Preferred Currency</Field.Label>
				<Select.Root type="single" bind:value={currency}>
					<Select.Trigger id="preferred-currency" class="w-full">
						{CURRENCIES.find((c) => c.value === currency)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each CURRENCIES as item (item.value)}
								<Select.Item value={item.value}>{item.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</Field.Field>
			<Field.Field>
				<div class="flex items-baseline justify-between">
					<Field.Label for="min-payout">Minimum Payout Amount</Field.Label>
					<span class="text-2xl font-semibold tabular-nums">
						${amount[0].toFixed(2)}
					</span>
				</div>
				<Slider
					type="multiple"
					id="min-payout"
					bind:value={amount}
					min={50}
					max={10000}
					step={50}
				/>
				<div class="flex items-center justify-between">
					<Field.Description>$50 (MIN)</Field.Description>
					<Field.Description>$10,000 (MAX)</Field.Description>
				</div>
			</Field.Field>
			<Field.Field>
				<Field.Label for="payout-notes">Notes</Field.Label>
				<Textarea
					id="payout-notes"
					placeholder="Add any notes for this payout configuration..."
					class="min-h-[100px]"
				/>
			</Field.Field>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Save Threshold</Button>
	</Card.Footer>
</Card.Root>
