<script lang="ts">
	import { CalendarDays } from "lucide-svelte";
	import { Avatar, AvatarFallback, AvatarImage } from "$components/ui/avatar";
	import { Button } from "$components/ui/button";
	import {
		HoverCard,
		HoverCardContent,
		HoverCardTrigger
	} from "$components/ui/hover-card";
</script>

<HoverCard>
	<HoverCardTrigger>
		<Button variant="link">@sveltejs</Button>
	</HoverCardTrigger>
	<HoverCardContent class="w-80">
		<div class="flex justify-between space-x-4">
			<Avatar>
				<AvatarImage src="https://github.com/sveltejs.png" />
				<AvatarFallback>SK</AvatarFallback>
			</Avatar>
			<div class="space-y-1">
				<h4 class="text-sm font-semibold">@sveltejs</h4>
				<p class="text-sm">Web development, streamlined.</p>
				<div class="flex items-center pt-2">
					<CalendarDays class="mr-2 h-4 w-4 opacity-70" />{" "}
					<span class="text-xs text-muted-foreground">
						Joined September 2022
					</span>
				</div>
			</div>
		</div>
	</HoverCardContent>
</HoverCard>
