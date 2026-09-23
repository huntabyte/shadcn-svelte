<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "ca", label: "Canada" },
	];

	let country = $state("us");
</script>

<form class="w-full max-w-sm">
	<Field.Group>
		<Field.Field>
			<Field.Label for="form-name">Name</Field.Label>
			<Input id="form-name" type="text" placeholder="Evil Rabbit" required />
		</Field.Field>
		<Field.Field>
			<Field.Label for="form-email">Email</Field.Label>
			<Input id="form-email" type="email" placeholder="john@example.com" />
			<Field.Description>We'll never share your email with anyone.</Field.Description>
		</Field.Field>
		<div class="grid grid-cols-2 gap-4">
			<Field.Field>
				<Field.Label for="form-phone">Phone</Field.Label>
				<Input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
			</Field.Field>
			<Field.Field>
				<Field.Label for="form-country">Country</Field.Label>
				<Select.Root type="single" items={countries} bind:value={country}>
					<Select.Trigger id="form-country">
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						{#each countries as item (item.value)}
							<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</Field.Field>
		</div>
		<Field.Field>
			<Field.Label for="form-address">Address</Field.Label>
			<Input id="form-address" type="text" placeholder="123 Main St" />
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline">Cancel</Button>
			<Button type="submit">Submit</Button>
		</Field.Field>
	</Field.Group>
</form>
