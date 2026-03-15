<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	let value = $state("");

	const items = [
		{
			group: "Fruits",
			items: [
				{ value: "apple", label: "Apple" },
				{ value: "banana", label: "Banana" },
				{ value: "mango", label: "Mango" },
			],
		},
		{
			group: "Vegetables",
			items: [
				{ value: "carrot", label: "Carrot" },
				{ value: "broccoli", label: "Broccoli" },
				{ value: "spinach", label: "Spinach" },
			],
		},
	];

	const triggerContent = $derived(
		items.flatMap((g) => g.items).find((i) => i.value === value)?.label ?? "Select a food"
	);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-[200px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		{#each items as group, gi (group.group)}
			{#if gi > 0}
				<Select.Separator />
			{/if}
			<Select.Group>
				<Select.Label>{group.group}</Select.Label>
				{#each group.items as item (item.value)}
					<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
				{/each}
			</Select.Group>
		{/each}
	</Select.Content>
</Select.Root>
