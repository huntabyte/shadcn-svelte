<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";

	let value = $state("xs");
</script>

<ToggleGroup.Root type="single" bind:value class="gap-1">
	{#each ["XS", "S", "M", "L", "XL"] as size (size)}
		<ToggleGroup.Item
			value={size.toLowerCase()}
			class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-9 w-9 rounded-md border text-sm font-medium"
		>
			{size}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
