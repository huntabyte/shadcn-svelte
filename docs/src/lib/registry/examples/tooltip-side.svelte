<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	const sides = ["top", "right", "bottom", "left"] as const;
</script>

<Tooltip.Provider>
	<div class="flex flex-wrap gap-4">
		{#each sides as side (side)}
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: "outline" })}>
					{side.charAt(0).toUpperCase() + side.slice(1)}
				</Tooltip.Trigger>
				<Tooltip.Content {side}>
					<p>Tooltip on {side}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
</Tooltip.Provider>
