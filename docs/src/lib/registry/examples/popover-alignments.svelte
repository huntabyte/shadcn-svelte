<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	const alignments = ["start", "center", "end"] as const;
</script>

<div class="flex gap-6">
	{#each alignments as align (align)}
		<Popover.Root>
			<Popover.Trigger
				class={buttonVariants({ variant: "outline", size: "sm", class: "capitalize" })}
			>
				{align}
			</Popover.Trigger>
			<Popover.Content {align} class="w-40">Aligned to {align}</Popover.Content>
		</Popover.Root>
	{/each}
</div>
