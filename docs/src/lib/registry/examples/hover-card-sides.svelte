<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";

	const sides = ["left", "top", "bottom", "right"] as const;
</script>

<div class="flex flex-wrap justify-center gap-2">
	{#each sides as side (side)}
		<HoverCard.Root openDelay={100} closeDelay={100}>
			<HoverCard.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" class="capitalize" {...props}>{side}</Button>
				{/snippet}
			</HoverCard.Trigger>
			<HoverCard.Content {side}>
				<div class="flex flex-col gap-1">
					<h4 class="font-medium">Hover Card</h4>
					<p>This hover card appears on the {side} side of the trigger.</p>
				</div>
			</HoverCard.Content>
		</HoverCard.Root>
	{/each}
</div>
