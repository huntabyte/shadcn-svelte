<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";

	const HOVER_CARD_SIDES = ["top", "right", "bottom", "left"] as const;
</script>

<Example title="Sides">
	<div class="flex flex-wrap items-center justify-center gap-4">
		{#each HOVER_CARD_SIDES as side (side)}
			<HoverCard.Root openDelay={100} closeDelay={100}>
				<HoverCard.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="capitalize" {...props}>
							{side}
						</Button>
					{/snippet}
				</HoverCard.Trigger>
				<HoverCard.Content {side}>
					<div
						class="flex flex-col style-vega:gap-2 style-nova:gap-1.5 style-lyra:gap-1 style-maia:gap-2 style-mira:gap-1"
					>
						<h4 class="font-medium">Hover Card</h4>
						<p>This hover card appears on the {side} side of the trigger.</p>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}
	</div>
</Example>
