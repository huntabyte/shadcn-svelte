<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Example title="Formatted Content">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Status</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<div class="flex flex-col gap-1">
				<p class="font-semibold">Active</p>
				<p class="text-xs opacity-80">Last updated 2 hours ago</p>
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Example>
