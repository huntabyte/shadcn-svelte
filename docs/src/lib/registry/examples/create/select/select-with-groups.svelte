<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";

	const fruits = [
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Blueberry", value: "blueberry" },
	];
	const vegetables = [
		{ label: "Carrot", value: "carrot" },
		{ label: "Broccoli", value: "broccoli" },
		{ label: "Spinach", value: "spinach" },
	];
	const allItems = [{ label: "Select a fruit", value: null }, ...fruits, ...vegetables];

	let selectedValue = $state<string | undefined>(undefined);
	const selectedLabel = $derived(
		allItems.find((item) => item.value === selectedValue)?.label ?? "Select a fruit"
	);
</script>

<Example title="With Groups & Labels">
	<Select.Root type="single" bind:value={selectedValue}>
		<Select.Trigger>
			{selectedLabel}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Fruits</Select.Label>
				{#each fruits as item (item.value)}
					<Select.Item value={item.value}>{item.label}</Select.Item>
				{/each}
			</Select.Group>
			<Select.Separator />
			<Select.Group>
				<Select.Label>Vegetables</Select.Label>
				{#each vegetables as item (item.value)}
					<Select.Item value={item.value}>{item.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</Example>
