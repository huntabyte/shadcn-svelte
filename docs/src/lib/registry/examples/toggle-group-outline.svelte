<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root variant="outline" type="single" value="all">
	<ToggleGroup.Item value="all" aria-label="Toggle all">All</ToggleGroup.Item>
	<ToggleGroup.Item value="missed" aria-label="Toggle missed">Missed</ToggleGroup.Item>
</ToggleGroup.Root>
