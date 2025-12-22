<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";

	const items = [
		{ label: "Select a fruit", value: null },
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Blueberry", value: "blueberry" },
	];

	let selectedValueSm = $state<string | undefined>(undefined);
	let selectedValueDefault = $state<string | undefined>(undefined);
	const selectedLabelSm = $derived(
		items.find((item) => item.value === selectedValueSm)?.label ?? "Select a fruit"
	);
	const selectedLabelDefault = $derived(
		items.find((item) => item.value === selectedValueDefault)?.label ?? "Select a fruit"
	);
</script>

<Example title="Sizes">
	<div class="flex flex-col gap-4">
		<Select.Root type="single" bind:value={selectedValueSm}>
			<Select.Trigger size="sm">
				{selectedLabelSm}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each items as item (item.value)}
						<Select.Item value={item.value}>{item.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<Select.Root type="single" bind:value={selectedValueDefault}>
			<Select.Trigger size="default">
				{selectedLabelDefault}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each items as item (item.value)}
						<Select.Item value={item.value}>{item.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</Example>
