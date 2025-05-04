<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];

	let fruitValue = $state("");
	let largeListValue = $state("");
	let fruitValue2 = $state("");

	const fruitLabel = $derived(
		fruits.find((f) => f.value === fruitValue)?.label ?? "Select a fruit"
	);

	const fruitLabel2 = $derived(
		fruits.find((f) => f.value === largeListValue)?.label ?? "Disabled"
	);

	const largeListLabel = $derived(largeListValue ? `Item ${largeListValue}` : "Large List");
</script>

<Select.Root type="single" name="favoriteFruit" bind:value={fruitValue}>
	<Select.Trigger class="w-[180px]">
		{fruitLabel}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{#each fruits as fruit (fruit.value)}
				<Select.Item
					value={fruit.value}
					label={fruit.label}
					disabled={fruit.value === "grapes"}
				>
					{fruit.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>

<Select.Root type="single" name="largeList" bind:value={largeListValue}>
	<Select.Trigger class="w-[180px]">
		{largeListLabel}
	</Select.Trigger>
	<Select.Content>
		{#each { length: 100 } as _, index (index)}
			<Select.Item value={`${index}`}>
				Item {index}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>

<Select.Root type="single" name="favoriteFruit" bind:value={fruitValue2} disabled>
	<Select.Trigger class="w-[180px]">
		{fruitLabel2}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Fruits</Select.Label>
			{#each fruits as fruit (fruit.value)}
				<Select.Item
					value={fruit.value}
					label={fruit.label}
					disabled={fruit.value === "grapes"}
				>
					{fruit.label}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
