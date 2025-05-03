<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		{#snippet child({ props })}
			<Button variant="link" {...props}>@nextjs</Button>
		{/snippet}
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80" side="right">
		<div class="flex justify-between gap-4">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/vercel.png" />
				<Avatar.Fallback>VC</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col gap-1">
				<h4 class="text-sm font-semibold">@nextjs</h4>
				<p class="text-sm">The React Framework – created and maintained by @vercel.</p>
				<div class="mt-1 flex items-center gap-2">
					<CalendarIcon class="text-muted-foreground size-4" />
					<span class="text-muted-foreground text-xs"> Joined December 2021 </span>
				</div>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
