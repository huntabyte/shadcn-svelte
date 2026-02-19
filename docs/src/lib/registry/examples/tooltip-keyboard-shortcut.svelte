<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class={buttonVariants({ variant: "outline" })}>Bold</Tooltip.Trigger>
		<Tooltip.Content>
			<p class="flex items-center gap-1">
				Toggle bold
				<Kbd>⌘</Kbd>
				<Kbd>B</Kbd>
			</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
