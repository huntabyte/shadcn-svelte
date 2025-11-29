<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const plans = [
		{
			id: "starter",
			name: "Starter Plan",
			description: "Perfect for small businesses.",
			price: "$10",
		},
		{
			id: "pro",
			name: "Pro Plan",
			description: "More features and storage.",
			price: "$20",
		},
	] as const;

	const id = $props.id();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-lg">Upgrade your subscription</Card.Title>
		<Card.Description class="text-balance">
			You are currently on the free plan. Upgrade to the pro plan to get access to all
			features.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-3 md:flex-row">
				<div class="flex flex-1 flex-col gap-2">
					<Label for="name-{id}">Name</Label>
					<Input id="name-{id}" placeholder="Evil Rabbit" />
				</div>
				<div class="flex flex-1 flex-col gap-2">
					<Label for="email-{id}">Email</Label>
					<Input id="email-{id}" placeholder="example@acme.com" />
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<Label for="card-number-{id}">Card Number</Label>
				<div class="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
					<Input
						id="card-number-{id}"
						placeholder="1234 1234 1234 1234"
						class="col-span-2 md:col-span-1"
					/>
					<Input id="card-number-expiry-{id}" placeholder="MM/YY" />
					<Input id="card-number-cvc-{id}" placeholder="CVC" />
				</div>
			</div>
			<fieldset class="flex flex-col gap-3">
				<legend class="text-sm font-medium">Plan</legend>
				<p class="text-muted-foreground text-sm">
					Select the plan that best fits your needs.
				</p>
				<RadioGroup.Root value="starter" class="grid gap-3 md:grid-cols-2">
					{#each plans as plan (plan.id)}
						<Label
							class="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/20 flex items-start gap-3 rounded-lg border p-3"
						>
							<RadioGroup.Item
								value={plan.id}
								id={plan.name}
								class="data-[state=checked]:border-primary"
							/>
							<div class="grid gap-1 font-normal">
								<div class="font-medium">{plan.name}</div>
								<div
									class="text-muted-foreground text-xs leading-snug text-balance"
								>
									{plan.description}
								</div>
							</div>
						</Label>
					{/each}
				</RadioGroup.Root>
			</fieldset>
			<div class="flex flex-col gap-2">
				<Label for="notes">Notes</Label>
				<Textarea id="notes" placeholder="Enter notes" />
			</div>
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2">
					<Checkbox id="terms" />
					<Label for="terms" class="font-normal">
						I agree to the terms and conditions
					</Label>
				</div>
				<div class="flex items-center gap-2">
					<Checkbox id="newsletter" checked />
					<Label for="newsletter" class="font-normal">Allow us to send you emails</Label>
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button variant="outline" size="sm">Cancel</Button>
		<Button size="sm">Upgrade Plan</Button>
	</Card.Footer>
</Card.Root>
