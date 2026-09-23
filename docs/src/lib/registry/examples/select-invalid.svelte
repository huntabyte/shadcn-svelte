<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
	];

	let value = $state("");
</script>

<Field.Field data-invalid class="w-full max-w-48">
	<Field.Label>Fruit</Field.Label>
	<Select.Root type="single" items={fruits} bind:value>
		<Select.Trigger aria-invalid>
			<Select.Value placeholder="Select a fruit" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each fruits as fruit (fruit.value)}
					<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	<Field.Error>Please select a fruit.</Field.Error>
</Field.Field>
