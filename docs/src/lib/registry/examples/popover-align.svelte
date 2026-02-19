<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	const alignments = ["start", "center", "end"] as const;
</script>

<div class="flex gap-4 flex-wrap">
	{#each alignments as align (align)}
		<Popover.Root>
			<Popover.Trigger class={buttonVariants({ variant: "outline" })} >
				Align {align}
			</Popover.Trigger>
			<Popover.Content {align} class="w-60">
				<p class="text-sm">
					This popover is aligned to the <strong>{align}</strong> of the trigger.
				</p>
			</Popover.Content>
		</Popover.Root>
	{/each}
</div>
