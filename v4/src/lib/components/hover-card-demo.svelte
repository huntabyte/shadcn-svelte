<script lang="ts">
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		{#snippet child({ props })}
			<Button variant="link" {...props}>@sveltejs</Button>
		{/snippet}
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80" side="right">
		<div class="flex justify-between gap-4">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/sveltejs.png" />
				<Avatar.Fallback>VC</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col gap-1">
				<h4 class="text-sm font-semibold">@sveltejs</h4>
				<p class="text-sm">Web development for the rest of us</p>
				<div class="mt-1 flex items-center gap-2">
					<CalendarIcon class="text-muted-foreground size-4" />
					<span class="text-muted-foreground text-xs"> Joined November 2016 </span>
				</div>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
