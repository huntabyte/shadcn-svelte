<script lang="ts">
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={buttonVariants({ variant: "outline" })}>Hover</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Add to library</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
