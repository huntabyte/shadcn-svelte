<script lang="ts">
	import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		class={buttonVariants({ variant: "link" })}
		href="https://github.com/sveltejs"
		target="_blank"
		rel="noreferrer noopener"
	>
		@sveltejs
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80">
		<div class="flex justify-between gap-4">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/sveltejs.png" />
				<Avatar.Fallback>SK</Avatar.Fallback>
			</Avatar.Root>
			<div class="space-y-1">
				<h4 class="text-sm font-semibold">@sveltejs</h4>
				<p class="text-sm">Cybernetically enhanced web apps.</p>
				<div class="flex items-center pt-2">
					<CalendarDaysIcon class="me-2 size-4 opacity-70" />
					<span class="text-muted-foreground text-xs">Joined September 2022</span>
				</div>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
