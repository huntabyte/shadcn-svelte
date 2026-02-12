<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("top");
</script>

<Example title="Vertical With Spacing">
	<ToggleGroup.Root
		size="sm"
		type="single"
		bind:value
		variant="outline"
		orientation="vertical"
		spacing={1}
	>
		<ToggleGroup.Item value="top" aria-label="Toggle top">Top</ToggleGroup.Item>
		<ToggleGroup.Item value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroup.Item>
		<ToggleGroup.Item value="left" aria-label="Toggle left">Left</ToggleGroup.Item>
		<ToggleGroup.Item value="right" aria-label="Toggle right">Right</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
