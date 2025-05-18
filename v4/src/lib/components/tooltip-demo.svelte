<script lang="ts">
	import InfoIcon from "@lucide/svelte/icons/info";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<div class="flex flex-wrap items-start gap-4">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Hover</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add to library</p>
		</Tooltip.Content>
	</Tooltip.Root>
	<div class="flex gap-2">
		{#each ["top", "right", "bottom", "left"] as side (side)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="capitalize" {...props}>
							{side}
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content side={side as "top" | "right" | "bottom" | "left"}>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" size="icon" {...props}>
					<InfoIcon />
					<span class="sr-only">Info</span>
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			To learn more about how this works, check out the docs. If you have any questions,
			please reach out to us.
		</Tooltip.Content>
	</Tooltip.Root>
</div>
