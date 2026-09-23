<script lang="ts">
	import SaveIcon from "@lucide/svelte/icons/save";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
</script>

<Tooltip.Root>
	<Tooltip.Trigger class={buttonVariants({ variant: "outline", size: "icon-sm" })}>
		<SaveIcon />
	</Tooltip.Trigger>
	<Tooltip.Content>
		Save Changes <Kbd>S</Kbd>
	</Tooltip.Content>
</Tooltip.Root>
