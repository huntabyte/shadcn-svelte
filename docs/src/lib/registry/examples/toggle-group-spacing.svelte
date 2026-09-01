<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root type="single" size="sm" value="top" variant="outline" spacing={2}>
	<ToggleGroup.Item value="top" aria-label="Toggle top">Top</ToggleGroup.Item>
	<ToggleGroup.Item value="bottom" aria-label="Toggle bottom">Bottom</ToggleGroup.Item>
	<ToggleGroup.Item value="left" aria-label="Toggle left">Left</ToggleGroup.Item>
	<ToggleGroup.Item value="right" aria-label="Toggle right">Right</ToggleGroup.Item>
</ToggleGroup.Root>
