<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";

	const items = [
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
		{ label: "Blueberry", value: "blueberry" },
		{ label: "Grapes", value: "grapes" },
		{ label: "Pineapple", value: "pineapple" },
	];

	let selectedValue = $state<string | undefined>(undefined);
	let selectedValueInvalid = $state<string | undefined>(undefined);
	const selectedLabel = $derived(
		items.find((item) => item.value === selectedValue)?.label ?? "Select a fruit"
	);
	const selectedLabelInvalid = $derived(
		items.find((item) => item.value === selectedValueInvalid)?.label ?? "Select a fruit"
	);
</script>

<Example title="Invalid">
	<div class="flex flex-col gap-4">
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger aria-invalid="true">
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
		<Field.Field data-invalid>
			<Field.Label for="select-fruit-invalid">Favorite Fruit</Field.Label>
			<Select.Root type="single" bind:value={selectedValueInvalid}>
				<Select.Trigger id="select-fruit-invalid" aria-invalid>
					{selectedLabelInvalid}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each items as item (item.value)}
							<Select.Item value={item.value}>{item.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Field.Error errors={[{ message: "Please select a valid fruit." }]} />
		</Field.Field>
	</div>
</Example>
