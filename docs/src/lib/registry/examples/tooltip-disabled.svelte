<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<span {...props} class="inline-block w-fit">
				<Button variant="outline" disabled>Disabled</Button>
			</span>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>This feature is currently unavailable</p>
	</Tooltip.Content>
</Tooltip.Root>
