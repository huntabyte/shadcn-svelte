<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import AppleIcon from "../icons/apple.svelte";
	import PaypalIcon from "../icons/paypal.svelte";
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
			<div>
				<RadioGroup.Item value="card" id="card" class="peer sr-only" aria-label="Card" />
				<Label
					for="card"
					class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="mb-3 h-6 w-6"
					>
						<rect width="20" height="14" x="2" y="5" rx="2" />
						<path d="M2 10h20" />
					</svg>
					Card
				</Label>
			</div>
			<div>
				<RadioGroup.Item
					value="paypal"
					id="paypal"
					class="peer sr-only"
					aria-label="Paypal"
				/>
				<Label
					for="paypal"
					class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4"
				>
					<PaypalIcon class="mb-3 h-6 w-6" />
					Paypal
				</Label>
			</div>
			<div>
				<RadioGroup.Item value="apple" id="apple" class="peer sr-only" aria-label="Apple" />
				<Label
					for="apple"
					class="border-muted hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 bg-transparent p-4 "
				>
					<AppleIcon class="mb-3 h-6 w-6" />
					Apple
				</Label>
			</div>
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
				<Select.Root type="single" bind:value={month}>
					<Select.Trigger id="month" aria-label="Month" class="w-full">
						{monthLabel}
					</Select.Trigger>
					<Select.Content>
						{#each months as month (month.value)}
							<Select.Item value={month.value}>{month.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="year">Year</Label>
				<Select.Root type="single" bind:value={year}>
					<Select.Trigger id="year" aria-label="Year" class="w-full">
						{year === "" ? "Year" : year}
					</Select.Trigger>
					<Select.Content>
						{#each { length: 10 } as _, i (i)}
							{@const value = new Date().getFullYear() + i}
							<Select.Item value={`${value}`}>
								{value}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="cvc">CVC</Label>
				<Input id="cvc" placeholder="CVC" class="w-full" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Continue</Button>
	</Card.Footer>
</Card.Root>
