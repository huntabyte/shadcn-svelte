<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const items = [
		{ label: "Engineering", value: "engineering" },
		{ label: "Design", value: "design" },
		{ label: "Marketing", value: "marketing" },
		{ label: "Sales", value: "sales" },
		{ label: "Customer Support", value: "support" },
		{ label: "Human Resources", value: "hr" },
		{ label: "Finance", value: "finance" },
		{ label: "Operations", value: "operations" },
	];

	let value = $state("");
</script>

<Field.Field class="w-full max-w-xs">
	<Field.Label for="department">Department</Field.Label>
	<Select.Root type="single" {items} bind:value>
		<Select.Trigger id="department">
			<Select.Value placeholder="Choose department" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each items as item (item.value)}
					<Select.Item value={item.value} label={item.label}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<Field.Description>Select your department or area of work.</Field.Description>
</Field.Field>
