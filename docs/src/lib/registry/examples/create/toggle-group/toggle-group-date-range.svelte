<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("today");
</script>

<Example title="Date Range">
	<ToggleGroup.Root type="single" bind:value variant="outline" size="sm" spacing={2}>
		<ToggleGroup.Item value="today" aria-label="Today">Today</ToggleGroup.Item>
		<ToggleGroup.Item value="week" aria-label="This Week">This Week</ToggleGroup.Item>
		<ToggleGroup.Item value="month" aria-label="This Month">This Month</ToggleGroup.Item>
		<ToggleGroup.Item value="year" aria-label="This Year">This Year</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
