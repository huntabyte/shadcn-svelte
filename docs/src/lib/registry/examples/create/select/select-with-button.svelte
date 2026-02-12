<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";

	const items = [
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

<Example title="With Button">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-2">
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
			<Button.Root variant="outline" size="sm">Submit</Button.Root>
		</div>
		<div class="flex items-center gap-2">
			<Select.Root type="single" bind:value={selectedValueDefault}>
				<Select.Trigger>
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
			<Button.Root variant="outline">Submit</Button.Root>
		</div>
	</div>
</Example>
