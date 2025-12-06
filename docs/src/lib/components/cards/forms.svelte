<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const plans = [
		{
			id: "starter",
			name: "Starter Plan",
			description: "For small businesses.",
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
		<form>
			<Field.Group>
				<Field.Group class="grid grid-cols-2">
					<Field.Field>
						<Field.Label for="name-{id}">Name</Field.Label>
						<Input id="name-{id}" placeholder="Max Leiter" />
					</Field.Field>
					<Field.Field>
						<Field.Label for="email-{id}">Email</Field.Label>
						<Input id="email-{id}" placeholder="mail@acme.com" />
					</Field.Field>
				</Field.Group>
				<Field.Group class="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
					<Field.Field>
						<Field.Label for="card-number-{id}">Card Number</Field.Label>
						<Input
							id="card-number-{id}"
							placeholder="1234 1234 1234 1234"
							class="col-span-2 md:col-span-1"
						/>
					</Field.Field>
					<Field.Field>
						<Field.Label for="card-number-expiry-{id}">Expiry Date</Field.Label>
						<Input id="card-number-expiry-{id}" placeholder="MM/YY" />
					</Field.Field>
					<Field.Field>
						<Field.Label for="card-number-cvc-{id}">CVC</Field.Label>
						<Input id="card-number-cvc-{id}" placeholder="CVC" />
					</Field.Field>
				</Field.Group>
				<Field.Set>
					<Field.Legend>Plan</Field.Legend>
					<Field.Description>Select the plan that best fits your needs.</Field.Description
					>
					<RadioGroup.Root value="starter" class="grid grid-cols-2 gap-2">
						{#each plans as plan (plan.id)}
							<Field.Label>
								<Field.Field orientation="horizontal">
									<Field.Content>
										<Field.Title>{plan.name}</Field.Title>
										<Field.Description class="text-xs">
											{plan.description}
										</Field.Description>
									</Field.Content>
									<RadioGroup.Item value={plan.id} id={plan.name} />
								</Field.Field>
							</Field.Label>
						{/each}
					</RadioGroup.Root>
				</Field.Set>
				<Field.Field>
					<Field.Label for="notes">Notes</Field.Label>
					<Textarea id="notes" placeholder="Enter notes" />
				</Field.Field>
				<Field.Field>
					<Field.Field orientation="horizontal">
						<Checkbox id="terms" />
						<Field.Label for="terms" class="font-normal">
							I agree to the terms and conditions
						</Field.Label>
					</Field.Field>
					<Field.Field orientation="horizontal">
						<Checkbox id="newsletter" checked />
						<Field.Label for="newsletter" class="font-normal">
							Allow us to send you emails
						</Field.Label>
					</Field.Field>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<Button variant="outline" size="sm">Cancel</Button>
					<Button size="sm">Upgrade Plan</Button>
				</Field.Field>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
