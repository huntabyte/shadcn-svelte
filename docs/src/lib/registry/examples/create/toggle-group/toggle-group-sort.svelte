<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let value = $state("newest");
</script>

<Example title="Sort">
	<ToggleGroup.Root type="single" bind:value variant="outline" size="sm">
		<ToggleGroup.Item value="newest" aria-label="Newest">
			<IconPlaceholder
				lucide="ArrowDownIcon"
				tabler="IconArrowDown"
				hugeicons="ArrowDownIcon"
				phosphor="ArrowDownIcon"
			/>
			Newest
		</ToggleGroup.Item>
		<ToggleGroup.Item value="oldest" aria-label="Oldest">
			<IconPlaceholder
				lucide="ArrowUpIcon"
				tabler="IconArrowUp"
				hugeicons="ArrowUpIcon"
				phosphor="ArrowUpIcon"
			/>
			Oldest
		</ToggleGroup.Item>
		<ToggleGroup.Item value="popular" aria-label="Popular">
			<IconPlaceholder
				lucide="TrendingUpIcon"
				tabler="IconTrendingUp"
				hugeicons="TradeUpIcon"
				phosphor="TrendUpIcon"
			/>
			Popular
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
