<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<HoverCard.Root openDelay={10} closeDelay={100}>
	<HoverCard.Trigger
		class={buttonVariants({ variant: "link" })}
		href="https://github.com/sveltejs"
		target="_blank"
		rel="noreferrer noopener"
	>
		Hover Here
	</HoverCard.Trigger>
	<HoverCard.Content class="flex w-64 flex-col gap-0.5">
		<div class="font-semibold">@sveltejs</div>
		<div>Cybernetically enhanced web apps.</div>
		<div class="text-muted-foreground mt-1 text-xs">Joined September 2022</div>
	</HoverCard.Content>
</HoverCard.Root>
