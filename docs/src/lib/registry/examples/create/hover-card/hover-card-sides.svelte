<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";

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
						class="style-lyra:gap-1 style-nova:gap-1.5 style-vega:gap-2 style-maia:gap-2 style-mira:gap-1 flex flex-col"
					>
						<h4 class="font-medium">Hover Card</h4>
						<p>This hover card appears on the {side} side of the trigger.</p>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		{/each}
	</div>
</Example>
