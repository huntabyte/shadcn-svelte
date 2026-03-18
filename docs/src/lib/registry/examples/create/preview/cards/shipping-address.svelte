<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const states = [
		{ value: "CA", label: "California" },
		{ value: "NY", label: "New York" },
		{ value: "TX", label: "Texas" },
	];

	const countries = [
		{ value: "US", label: "United States" },
		{ value: "CA", label: "Canada" },
		{ value: "UK", label: "United Kingdom" },
	];

	let selectedState = $state(states[0].value);
	let selectedCountry = $state(countries[0].value);
	let saveDefault = $state(true);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Shipping Address</Card.Title>
		<Card.Description>Where should we deliver?</Card.Description>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field>
				<Field.Label for="shipping-street">Street address</Field.Label>
				<Input id="shipping-street" placeholder="123 Main Street" />
			</Field.Field>
			<Field.Field>
				<Field.Label for="shipping-apt">Apt / Suite</Field.Label>
				<Input id="shipping-apt" placeholder="Apt 4B" />
			</Field.Field>
			<Field.Group class="grid grid-cols-2">
				<Field.Field>
					<Field.Label for="shipping-city">City</Field.Label>
					<Input id="shipping-city" placeholder="San Francisco" />
				</Field.Field>
				<Field.Field>
					<Field.Label for="shipping-state">State</Field.Label>
					<Select.Root type="single" bind:value={selectedState}>
						<Select.Trigger id="shipping-state" class="w-full">
							{states.find((s) => s.value === selectedState)?.label ?? "Select State"}
						</Select.Trigger>
						<Select.Content>
							{#each states as state (state.value)}
								<Select.Item value={state.value}>{state.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>
			</Field.Group>
			<Field.Group class="grid grid-cols-2">
				<Field.Field>
					<Field.Label for="shipping-zip">ZIP Code</Field.Label>
					<Input id="shipping-zip" placeholder="94102" />
				</Field.Field>
				<Field.Field>
					<Field.Label for="shipping-country">Country</Field.Label>
					<Select.Root type="single" bind:value={selectedCountry}>
						<Select.Trigger id="shipping-country" class="w-full">
							{countries.find((c) => c.value === selectedCountry)?.label ??
								"Select Country"}
						</Select.Trigger>
						<Select.Content>
							{#each countries as country (country.value)}
								<Select.Item value={country.value}>{country.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>
			</Field.Group>
			<Field.Field orientation="horizontal">
				<Checkbox id="shipping-save" bind:checked={saveDefault} />
				<Field.Label for="shipping-save" class="font-normal">
					Save as default address
				</Field.Label>
			</Field.Field>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline" size="sm">Cancel</Button>
		<Button size="sm" class="ml-auto">Save Address</Button>
	</Card.Footer>
</Card.Root>
