<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	const sides = ["top", "bottom", "left", "right"] as const;
</script>

<div class="flex flex-col gap-4">
	<ToggleGroup.Root type="single" size="sm" value="top" variant="outline">
		{#each sides as side (side)}
			<ToggleGroup.Item value={side} aria-label="Toggle {side}" class="capitalize">
				{side}
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<ToggleGroup.Root type="single" value="top" variant="outline">
		{#each sides as side (side)}
			<ToggleGroup.Item value={side} aria-label="Toggle {side}" class="capitalize">
				{side}
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
</div>
