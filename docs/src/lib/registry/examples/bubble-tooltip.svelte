<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Bubble.Root variant="secondary">
		<Bubble.Content>Did you remove the stale route?</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root align="end">
		<Bubble.Content>Yes, removed it from the registry.</Bubble.Content>
		<Bubble.Reactions class="p-0">
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon-xs">
							<CheckIcon />
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>Read on Jan 5, 2026 at 4:32 PM</Tooltip.Content>
			</Tooltip.Root>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
