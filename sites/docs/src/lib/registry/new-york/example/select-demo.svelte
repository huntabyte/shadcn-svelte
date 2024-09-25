<script lang="ts">
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];
</script>

<Select.Root name="favoriteFruit">
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>Fruits</Select.GroupHeading>
			{#each fruits as fruit}
				<Select.Item value={fruit.value} textValue={fruit.label}>{fruit.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
