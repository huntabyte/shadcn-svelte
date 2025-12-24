<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const items = [
		{ label: "All", value: "all" },
		{ label: "Active", value: "active" },
		{ label: "Archived", value: "archived" },
	];

	let selectedValue = $state(items[0].value);
	const selectedLabel = $derived(
		items.find((item) => item.value === selectedValue)?.label ?? "All"
	);
	let toggleValue = $state("grid");
</script>

<Example title="With Input and Select">
	<div class="flex items-center gap-2">
		<Input type="search" placeholder="Search..." class="flex-1" />
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger class="w-32">
				{selectedLabel}
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
		<ToggleGroup.Root type="single" bind:value={toggleValue} variant="outline">
			<ToggleGroup.Item value="grid" aria-label="Grid view">Grid</ToggleGroup.Item>
			<ToggleGroup.Item value="list" aria-label="List view">List</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</Example>
