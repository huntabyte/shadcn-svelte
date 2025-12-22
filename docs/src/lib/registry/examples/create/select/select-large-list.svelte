<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";

	const items = [
		{ label: "Select an item", value: null },
		...Array.from({ length: 100 }).map((_, i) => ({
			label: `Item ${i}`,
			value: `item-${i}`,
		})),
	];

	let selectedValue = $state<string | undefined>(undefined);
	const selectedLabel = $derived(
		items.find((item) => item.value === selectedValue)?.label ?? "Select an item"
	);
</script>

<Example title="Large List">
	<Select.Root type="single" bind:value={selectedValue}>
		<Select.Trigger>
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
