<script lang="ts">
	import { Calendar } from "radix-icons-svelte";
	import * as Avatar from "@/registry/new-york/ui/avatar";
	import * as HoverCard from "@/registry/new-york/ui/hover-card";
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		href="https://github.com/sveltejs"
		target="_blank"
		rel="noreferrer noopener"
		class="hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
	>
		@sveltejs
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80">
		<div class="flex justify-between space-x-4">
			<Avatar.Root>
				<Avatar.Image src="https://github.com/sveltejs.png" />
				<Avatar.Fallback>SK</Avatar.Fallback>
			</Avatar.Root>
			<div class="space-y-1">
				<h4 class="text-sm font-semibold">@sveltejs</h4>
				<p class="text-sm">Cybernetically enhanced web apps.</p>
				<div class="flex items-center pt-2">
					<Calendar class="mr-2 h-4 w-4 opacity-70" />{" "}
					<span class="text-xs text-muted-foreground">
						Joined September 2022
					</span>
				</div>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
