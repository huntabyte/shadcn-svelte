<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	const sides = ["top", "bottom", "left", "right"] as const;
</script>

<ToggleGroup.Root type="single" size="sm" value="top" variant="outline" spacing={2}>
	{#each sides as side (side)}
		<ToggleGroup.Item value={side} aria-label="Toggle {side}" class="capitalize">
			{side}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
