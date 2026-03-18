<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Select from "$lib/registry/ui/select/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const items = $derived([
		{ label: "Line", value: "line", icon: chartLineIcon },
		{ label: "Bar", value: "bar", icon: chartBarIcon },
		{ label: "Pie", value: "pie", icon: chartPieIcon },
	]);

	let selectedValueSm = $state<string | undefined>(undefined);
	let selectedValueDefault = $state<string | undefined>(undefined);
	const selectedItemSm = $derived(items.find((item) => item.value === selectedValueSm));
	const selectedItemDefault = $derived(items.find((item) => item.value === selectedValueDefault));
</script>

<Example title="With Icons">
	<div class="flex flex-col gap-4">
		<Select.Root type="single" bind:value={selectedValueSm}>
			<Select.Trigger size="sm">
				{#if selectedItemSm}
					{@render selectedItemSm.icon()}
				{/if}
				{selectedItemSm?.label ?? "Chart Type"}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each items as item (item.value)}
						<Select.Item value={item.value}>
							{@render item.icon()}
							{item.label}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<Select.Root type="single" bind:value={selectedValueDefault}>
			<Select.Trigger size="default">
				{#if selectedItemDefault}
					{@render selectedItemDefault.icon()}
				{/if}
				{selectedItemDefault?.label ?? "Chart Type"}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each items as item (item.value)}
						<Select.Item value={item.value}>
							{@render item.icon()}
							{item.label}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</Example>

{#snippet chartLineIcon()}
	<IconPlaceholder
		lucide="ChartLineIcon"
		tabler="IconChartLine"
		hugeicons="Chart03Icon"
		phosphor="ChartLineIcon"
		remixicon="RiLineChartLine"
	/>
{/snippet}

{#snippet chartBarIcon()}
	<IconPlaceholder
		lucide="ChartBarIcon"
		tabler="IconChartBar"
		hugeicons="Chart03Icon"
		phosphor="ChartBarIcon"
		remixicon="RiBarChartLine"
	/>
{/snippet}

{#snippet chartPieIcon()}
	<IconPlaceholder
		lucide="ChartPieIcon"
		tabler="IconChartPie"
		hugeicons="Chart03Icon"
		phosphor="ChartPieIcon"
		remixicon="RiPieChartLine"
	/>
{/snippet}
