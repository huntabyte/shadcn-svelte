<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("all");
</script>

<Example title="Filter">
	<ToggleGroup.Root type="single" bind:value variant="outline" size="sm">
		<ToggleGroup.Item value="all" aria-label="All">All</ToggleGroup.Item>
		<ToggleGroup.Item value="active" aria-label="Active">Active</ToggleGroup.Item>
		<ToggleGroup.Item value="completed" aria-label="Completed">Completed</ToggleGroup.Item>
		<ToggleGroup.Item value="archived" aria-label="Archived">Archived</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
