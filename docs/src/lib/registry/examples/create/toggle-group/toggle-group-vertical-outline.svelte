<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("all");
</script>

<Example title="Vertical Outline">
	<ToggleGroup.Root variant="outline" type="single" bind:value orientation="vertical" size="sm">
		<ToggleGroup.Item value="all" aria-label="Toggle all">All</ToggleGroup.Item>
		<ToggleGroup.Item value="active" aria-label="Toggle active">Active</ToggleGroup.Item>
		<ToggleGroup.Item value="completed" aria-label="Toggle completed">
			Completed
		</ToggleGroup.Item>
		<ToggleGroup.Item value="archived" aria-label="Toggle archived">Archived</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
