<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardAction,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import { Field, FieldGroup, FieldLabel } from "$lib/registry/ui/field/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupInput,
		InputGroupText,
	} from "$lib/registry/ui/input-group/index.js";
	import { Item, ItemContent } from "$lib/registry/ui/item/index.js";
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger,
	} from "$lib/registry/ui/select/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	const FROM_ACCOUNTS = [
		{ label: "Main Checking (··8402) — $12,450.00", value: "checking" },
		{ label: "Business (··7731) — $8,920.00", value: "business" },
	];

	const TO_ACCOUNTS = [
		{ label: "High Yield Savings (··1192) — $42,100.00", value: "savings" },
		{ label: "Investment (··3349) — $18,200.00", value: "investment" },
	];

	let fromAccount = $state("checking");
	let toAccount = $state("savings");

	const selectedFromAccount = $derived(
		FROM_ACCOUNTS.find((account) => account.value === fromAccount)
	);
	const selectedToAccount = $derived(TO_ACCOUNTS.find((account) => account.value === toAccount));
</script>

<Card>
	<CardHeader>
		<CardTitle>Transfer Funds</CardTitle>
		<CardDescription>Move money between your connected accounts.</CardDescription>
		<CardAction>
			<Button
				variant="ghost"
				size="icon-sm"
				class="bg-muted"
				aria-label="Dismiss transfer funds"
			>
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<FieldGroup>
			<Field>
				<FieldLabel for="transfer-amount">Amount to Transfer</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<InputGroupText>$</InputGroupText>
					</InputGroupAddon>
					<InputGroupInput id="transfer-amount" value="1,200.00"></InputGroupInput>
				</InputGroup>
			</Field>
			<Field>
				<FieldLabel for="from-account">From Account</FieldLabel>
				<Select type="single" items={FROM_ACCOUNTS} bind:value={fromAccount}>
					<SelectTrigger id="from-account" class="w-full">
						{selectedFromAccount?.label}
					</SelectTrigger>
					<SelectContent class="w-(--bits-select-anchor-width)">
						<SelectGroup>
							{#each FROM_ACCOUNTS as item (item.value)}
								<SelectItem value={item.value}>
									{item.label}
								</SelectItem>
							{/each}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<FieldLabel for="to-account">To Account</FieldLabel>
				<Select type="single" items={TO_ACCOUNTS} bind:value={toAccount}>
					<SelectTrigger id="to-account" class="w-full">
						{selectedToAccount?.label}
					</SelectTrigger>
					<SelectContent class="w-(--bits-select-anchor-width)">
						<SelectGroup>
							{#each TO_ACCOUNTS as item (item.value)}
								<SelectItem value={item.value}>
									{item.label}
								</SelectItem>
							{/each}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Item variant="muted" class="flex-col items-stretch">
				<ItemContent class="gap-3">
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm"> Estimated arrival </span>
						<span class="text-sm font-medium">Today, Apr 14</span>
					</div>
					<Separator></Separator>
					<div class="flex items-center justify-between">
						<span class="text-muted-foreground text-sm"> Transaction fee </span>
						<span class="text-sm font-medium tabular-nums">$0.00</span>
					</div>
					<Separator></Separator>
					<div class="flex items-center justify-between">
						<span class="text-sm font-medium">Total amount</span>
						<span class="text-sm font-semibold tabular-nums"> $1,200.00 </span>
					</div>
				</ItemContent>
			</Item>
		</FieldGroup>
	</CardContent>
	<CardFooter>
		<Button class="w-full">Confirm Transfer</Button>
	</CardFooter>
</Card>
