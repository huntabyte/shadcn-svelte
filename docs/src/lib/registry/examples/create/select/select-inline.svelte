<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";

	const items = [
		{ label: "All", value: "all" },
		{ label: "Active", value: "active" },
		{ label: "Inactive", value: "inactive" },
	];

	let selectedValue = $state<string | undefined>(undefined);
	const selectedLabel = $derived(
		items.find((item) => item.value === selectedValue)?.label ?? "Filter"
	);
</script>

<Example title="Inline with Input & NativeSelect">
	<div class="flex items-center gap-2">
		<Input.Root placeholder="Search..." class="flex-1" />
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger class="w-[140px]">
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
		<NativeSelect.Root class="w-[140px]">
			<NativeSelect.Option value="">Sort by</NativeSelect.Option>
			<NativeSelect.Option value="name">Name</NativeSelect.Option>
			<NativeSelect.Option value="date">Date</NativeSelect.Option>
			<NativeSelect.Option value="status">Status</NativeSelect.Option>
		</NativeSelect.Root>
	</div>
</Example>
