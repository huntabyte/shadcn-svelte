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
	import {
		Field,
		FieldDescription,
		FieldGroup,
		FieldLabel,
	} from "$lib/registry/ui/field/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger,
	} from "$lib/registry/ui/select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	const CURRENCIES = [
		{ label: "USD — United States Dollar", value: "usd" },
		{ label: "EUR — Euro", value: "eur" },
		{ label: "GBP — British Pound", value: "gbp" },
		{ label: "JPY — Japanese Yen", value: "jpy" },
	];
</script>

<Card>
	<CardHeader>
		<CardTitle>Payout Threshold</CardTitle>
		<CardDescription>
			Set the minimum balance required before a payout is triggered.
		</CardDescription>
		<CardAction>
			<Button
				variant="ghost"
				size="icon-sm"
				class="bg-muted"
				aria-label="Dismiss payout threshold"
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
				<FieldLabel for="preferred-currency">Preferred Currency</FieldLabel>
				<Select type="single" items={CURRENCIES} value="usd">
					<SelectTrigger id="preferred-currency" class="w-full">
						USD — United States Dollar
					</SelectTrigger>
					<SelectContent class="w-(--bits-select-anchor-width)">
						<SelectGroup>
							{#each CURRENCIES as item (item.value)}
								<SelectItem value={item.value}>
									{item.label}
								</SelectItem>
							{/each}
						</SelectGroup>
					</SelectContent>
				</Select>
			</Field>
			<Field>
				<div class="flex items-baseline justify-between">
					<FieldLabel id="min-payout-label">Minimum Payout Amount</FieldLabel>
					<span class="text-2xl font-semibold tabular-nums"> $2500.00 </span>
				</div>
				<Progress
					value={25}
					aria-labelledby="min-payout-label"
					aria-valuetext="$2,500 of $10,000"
				></Progress>
				<div class="flex items-center justify-between">
					<FieldDescription>$50 (MIN)</FieldDescription>
					<FieldDescription>$10,000 (MAX)</FieldDescription>
				</div>
			</Field>
			<Field>
				<FieldLabel for="payout-notes">Notes</FieldLabel>
				<Textarea
					id="payout-notes"
					placeholder="Add any notes for this payout configuration..."
					class="min-h-[100px]"
				></Textarea>
			</Field>
		</FieldGroup>
	</CardContent>
	<CardFooter>
		<Button class="w-full">Save Threshold</Button>
	</CardFooter>
</Card>
