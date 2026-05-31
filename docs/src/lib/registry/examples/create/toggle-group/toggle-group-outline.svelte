<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("all");
</script>

<Example title="Outline">
	<ToggleGroup.Root variant="outline" type="single" bind:value>
		<ToggleGroup.Item value="all" aria-label="Toggle all">All</ToggleGroup.Item>
		<ToggleGroup.Item value="missed" aria-label="Toggle missed">Missed</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
