<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Icon from "$lib/components/docs/icons/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import * as RadioGroup from "$lib/registry/default/ui/radio-group/index.js";
	import * as Select from "$lib/registry/default/ui/select/index.js";

	const months = [
		{
			label: "January",
			value: "1",
		},
		{
			label: "February",
			value: "2",
		},
		{
			label: "March",
			value: "3",
		},
		{
			label: "April",
			value: "4",
		},
		{
			label: "May",
			value: "5",
		},
		{
			label: "June",
			value: "6",
		},
		{
			label: "July",
			value: "7",
		},
		{
			label: "August",
			value: "8",
		},
		{
			label: "September",
			value: "9",
		},
		{
			label: "October",
			value: "10",
		},
		{
			label: "November",
			value: "11",
		},
		{
			label: "December",
			value: "12",
		},
	];

	let month = $state("");
	let monthLabel = $derived(months.find((m) => m.value === month)?.label ?? "Month");
	let year = $state("");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Payment Method</Card.Title>
		<Card.Description>Add a new payment method to your account.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<RadioGroup.Root value="card" class="grid grid-cols-3 gap-4">
			<Label
				for="card"
				class="border-muted hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
			>
				<RadioGroup.Item value="card" id="card" class="sr-only" aria-label="Card" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					class="mb-3 size-6"
				>
					<rect width="20" height="14" x="2" y="5" rx="2" />
					<path d="M2 10h20" />
				</svg>
				Card
			</Label>
			<Label
				for="paypal"
				class="border-muted hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
			>
				<RadioGroup.Item value="paypal" id="paypal" class="sr-only" aria-label="Paypal" />
				<Icon.PayPal class="mb-3 size-6" />
				Paypal
			</Label>
			<Label
				for="apple"
				class="border-muted hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
			>
				<RadioGroup.Item value="apple" id="apple" class="sr-only" aria-label="Apple" />
				<Icon.Apple class="mb-3 size-6" />
				Apple
			</Label>
		</RadioGroup.Root>
		<div class="grid gap-2">
			<Label for="name">Name</Label>
			<Input id="name" placeholder="First Last" />
		</div>
		<div class="grid gap-2">
			<Label for="city">City</Label>
			<Input id="city" placeholder="" />
		</div>
		<div class="grid gap-2">
			<Label for="number">Card number</Label>
			<Input id="number" placeholder="" />
		</div>
		<div class="grid grid-cols-3 gap-4">
			<div class="grid gap-2">
				<Label for="month">Expires</Label>
				<Select.Root bind:value={month} type="single">
					<Select.Trigger id="month" aria-label="Month">
						{monthLabel}
					</Select.Trigger>
					<Select.Content>
						{#each months as { value, label } (value)}
							<Select.Item {value} {label} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="year">Year</Label>
				<Select.Root type="single" bind:value={year}>
					<Select.Trigger id="year" aria-label="Year">
						{year ?? "Year"}
					</Select.Trigger>
					<Select.Content>
						{#each { length: 10 } as _, i (i)}
							<Select.Item
								value={`${new Date().getFullYear() + i}`}
								label={`${new Date().getFullYear() + i}`}
							/>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="cvc">CVC</Label>
				<Input id="cvc" placeholder="CVC" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Continue</Button>
	</Card.Footer>
</Card.Root>
