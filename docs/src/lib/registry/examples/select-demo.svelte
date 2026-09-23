<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes", disabled: true },
		{ value: "pineapple", label: "Pineapple" },
	];

	let value = $state("");
</script>

<Select.Root type="single" name="favoriteFruit" items={fruits} bind:value>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{#each fruits as fruit (fruit.value)}
				<Select.Item value={fruit.value} label={fruit.label} disabled={fruit.disabled}>
					{fruit.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
