<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	const sides = ["left", "top", "bottom", "right"] as const;
</script>

<div class="flex flex-wrap gap-2">
	{#each sides as side (side)}
		<Tooltip.Root>
			<Tooltip.Trigger class="{buttonVariants({ variant: 'outline' })} w-fit capitalize">
				{side}
			</Tooltip.Trigger>
			<Tooltip.Content {side}>
				<p>Add to library</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{/each}
</div>
