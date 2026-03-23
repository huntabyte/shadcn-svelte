<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];

	let alignItemWithTrigger = $state(true);
	let value = $state("banana");

	const triggerContent = $derived(
		fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
	);
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
	<div class="flex items-center justify-between gap-4">
		<div class="flex flex-col gap-1">
			<Label for="align-item">Align Item</Label>
			<p class="text-muted-foreground text-sm">
				Toggle to align the item with the trigger.
			</p>
		</div>
		<Switch id="align-item" bind:checked={alignItemWithTrigger} />
	</div>
	<Select.Root type="single" bind:value>
		<Select.Trigger class="w-full">
			{triggerContent}
		</Select.Trigger>
		<Select.Content position={alignItemWithTrigger ? "item-aligned" : "popper"}>
			<Select.Group>
				{#each fruits as fruit (fruit.value)}
					<Select.Item value={fruit.value} label={fruit.label}>
						{fruit.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
