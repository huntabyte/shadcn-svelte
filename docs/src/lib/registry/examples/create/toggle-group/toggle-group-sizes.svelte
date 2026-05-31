<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value1 = $state("top");
	let value2 = $state("top");
</script>

<Example title="Sizes">
	<div class="flex flex-col gap-4">
		<ToggleGroup.Root size="sm" type="single" bind:value={value1} variant="outline">
			<ToggleGroup.Item value="top" aria-label="Toggle top">Top</ToggleGroup.Item>
			<ToggleGroup.Item value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroup.Item>
			<ToggleGroup.Item value="left" aria-label="Toggle left">Left</ToggleGroup.Item>
			<ToggleGroup.Item value="right" aria-label="Toggle right">Right</ToggleGroup.Item>
		</ToggleGroup.Root>
		<ToggleGroup.Root type="single" bind:value={value2} variant="outline">
			<ToggleGroup.Item value="top" aria-label="Toggle top">Top</ToggleGroup.Item>
			<ToggleGroup.Item value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroup.Item>
			<ToggleGroup.Item value="left" aria-label="Toggle left">Left</ToggleGroup.Item>
			<ToggleGroup.Item value="right" aria-label="Toggle right">Right</ToggleGroup.Item>
		</ToggleGroup.Root>
	</div>
</Example>
