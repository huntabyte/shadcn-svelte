<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	const aligns = ["start", "center", "end"] as const;
</script>

<div class="flex gap-4">
	{#each aligns as align (align)}
		<Popover.Root>
			<Popover.Trigger class={buttonVariants({ variant: "outline", size: "sm" })}>
				{align.charAt(0).toUpperCase() + align.slice(1)}
			</Popover.Trigger>
			<Popover.Content {align} class="w-40">
				<p class="text-sm">Aligned to {align}</p>
			</Popover.Content>
		</Popover.Root>
	{/each}
</div>
