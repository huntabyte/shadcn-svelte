<script lang="ts">
	import Save from "@lucide/svelte/icons/save";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" size="icon-sm" {...props}>
				<Save />
			</Button>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content>
		Save Changes <Kbd>S</Kbd>
	</Tooltip.Content>
</Tooltip.Root>
