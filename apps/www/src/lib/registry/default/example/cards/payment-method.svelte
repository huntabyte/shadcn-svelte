<script lang="ts">
	import * as Card from "@/registry/default/ui/card";
	import { Button } from "@/registry/default/ui/button";
	import { Icons } from "$lib/components/docs/icons";
	import { Label } from "@/registry/default/ui/label";
	import { Input } from "@/registry/default/ui/input";
	import * as RadioGroup from "@/registry/default/ui/radio-group";
	import * as Select from "@/registry/default/ui/select";

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Payment Method</Card.Title>
		<Card.Description>
			Add a new payment method to your account.
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<RadioGroup.Root value="card" class="grid grid-cols-3 gap-4">
			<Label
				for="card"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroup.Item
					value="card"
					id="card"
					class="sr-only"
					aria-label="Card"
				/>
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
			<Label
				for="paypal"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroup.Item
					value="paypal"
					id="paypal"
					class="sr-only"
					aria-label="Paypal"
				/>
				<Icons.paypal class="mb-3 h-6 w-6" />
				Paypal
			</Label>
			<Label
				for="apple"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroup.Item
					value="apple"
					id="apple"
					class="sr-only"
					aria-label="Apple"
				/>
				<Icons.apple class="mb-3 h-6 w-6" />
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
				<Select.Root>
					<Select.Trigger id="month" aria-label="Month">
						<Select.Value placeholder="Month" />
					</Select.Trigger>
					<Select.Content>
						{#each months as month, i}
							<Select.Item value={i + 1} label={month}
								>{month}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="year">Year</Label>
				<Select.Root>
					<Select.Trigger id="year" aria-label="Year">
						<Select.Value placeholder="Year" />
					</Select.Trigger>
					<Select.Content>
						{#each { length: 10 } as _, i}
							<Select.Item
								value={`${new Date().getFullYear() + i}`}
								label={`${new Date().getFullYear() + i}`}
							>
								{new Date().getFullYear() + i}
							</Select.Item>
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
