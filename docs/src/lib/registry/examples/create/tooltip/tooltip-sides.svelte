<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Example title="Sides">
	<div class="flex flex-wrap gap-2">
		{#each (["top", "right", "bottom", "left"] as const) as side (side)}
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="w-fit capitalize" {...props}>{side}</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content {side}>
					<p>Add to library</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
</Example>
