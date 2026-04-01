<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const FROM_ACCOUNTS = [
		{ label: "Main Checking (··8402) — $12,450.00", value: "checking" },
		{ label: "Business (··7731) — $8,920.00", value: "business" },
	] as const;

	const TO_ACCOUNTS = [
		{ label: "High Yield Savings (··1192) — $42,100.00", value: "savings" },
		{ label: "Investment (··3349) — $18,200.00", value: "investment" },
	] as const;

	let fromAccount = $state<string>("checking");
	let toAccount = $state<string>("savings");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Transfer Funds</Card.Title>
		<Card.Description>Move money between your connected accounts.</Card.Description>
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
				<Field.Label for="transfer-amount">Amount to Transfer</Field.Label>
				<InputGroup.Root>
					<InputGroup.Addon>
						<InputGroup.Text>$</InputGroup.Text>
					</InputGroup.Addon>
					<InputGroup.Input id="transfer-amount" value="1,200.00" />
				</InputGroup.Root>
			</Field.Field>
			<Field.Field>
				<Field.Label for="from-account">From Account</Field.Label>
				<Select.Root type="single" bind:value={fromAccount}>
					<Select.Trigger id="from-account" class="w-full">
						{FROM_ACCOUNTS.find((a) => a.value === fromAccount)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each FROM_ACCOUNTS as item (item.value)}
								<Select.Item value={item.value}>{item.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</Field.Field>
			<Field.Field>
				<Field.Label for="to-account">To Account</Field.Label>
				<Select.Root type="single" bind:value={toAccount}>
					<Select.Trigger id="to-account" class="w-full">
						{TO_ACCOUNTS.find((a) => a.value === toAccount)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each TO_ACCOUNTS as item (item.value)}
								<Select.Item value={item.value}>{item.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</Field.Field>
			<Item.Root variant="muted" class="flex-col items-stretch">
				<Item.Content class="gap-3">
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm">Estimated arrival</span>
						<span class="text-sm font-medium">Today, Apr 14</span>
					</div>
					<Separator />
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm">Transaction fee</span>
						<span class="text-sm font-medium tabular-nums">$0.00</span>
					</div>
					<Separator />
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Total amount</span>
						<span class="text-sm font-semibold tabular-nums">$1,200.00</span>
					</div>
				</Item.Content>
			</Item.Root>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Confirm Transfer</Button>
	</Card.Footer>
</Card.Root>
