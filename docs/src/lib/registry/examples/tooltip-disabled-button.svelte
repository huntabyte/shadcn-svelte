<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<span class="inline-block w-fit" {...props}>
				<Button variant="outline" disabled>Disabled</Button>
			</span>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>This feature is currently unavailable</p>
	</Tooltip.Content>
</Tooltip.Root>
