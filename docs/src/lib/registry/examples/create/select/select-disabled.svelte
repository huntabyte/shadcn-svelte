<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";

	const items = [
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Blueberry", value: "blueberry" },
		{ label: "Grapes", value: "grapes", disabled: true },
		{ label: "Pineapple", value: "pineapple" },
	];

	let selectedValue = $state<string | undefined>(undefined);
	const selectedLabel = $derived(
		items.find((item) => item.value === selectedValue)?.label ?? "Select a fruit"
	);
</script>

<Example title="Disabled">
	<Select.Root type="single" bind:value={selectedValue} disabled>
		<Select.Trigger>
			{selectedLabel}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each items as item (item.value)}
					<Select.Item value={item.value} disabled={item.disabled}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</Example>
