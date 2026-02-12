<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";

	const items = [
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Blueberry", value: "blueberry" },
		{ label: "Grapes", value: "grapes" },
		{ label: "Pineapple", value: "pineapple" },
		{ label: "Strawberry", value: "strawberry" },
		{ label: "Watermelon", value: "watermelon" },
	];

	let selectedValues = $state<string[]>([]);
	const selectedLabel = $derived.by(() => {
		if (selectedValues.length === 0) {
			return "Select fruits";
		}
		if (selectedValues.length === 1) {
			return items.find((item) => item.value === selectedValues[0])?.label;
		}
		return `${selectedValues.length} fruits selected`;
	});
</script>

<Example title="Multiple Selection">
	<Select.Root type="multiple" bind:value={selectedValues}>
		<Select.Trigger class="w-72">
			{selectedLabel}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each items as item (item.value)}
					<Select.Item value={item.value}>{item.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</Example>
