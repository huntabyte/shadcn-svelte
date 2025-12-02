<script lang="ts">
	import { formatDateRange } from "little-date";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { CalendarDate, getLocalTimeZone, type DateValue } from "@internationalized/date";

	const events = [
		{
			title: "Team Sync Meeting",
			start: "2025-06-12T09:00:00",
			end: "2025-06-12T10:00:00",
		},
		{
			title: "Design Review",
			start: "2025-06-12T11:30:00",
			end: "2025-06-12T12:30:00",
		},
		{
			title: "Client Presentation",
			start: "2025-06-12T14:00:00",
			end: "2025-06-12T15:00:00",
		},
	];

	let value = $state<DateValue | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card.Root class="w-fit py-4">
	<Card.Content class="px-4">
		<Calendar type="single" bind:value class="bg-transparent p-0" preventDeselect />
	</Card.Content>
	<Card.Footer class="flex flex-col items-start gap-3 border-t px-4 !pt-4">
		<div class="flex w-full items-center justify-between px-1">
			<div class="text-sm font-medium">
				{value?.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
					day: "numeric",
					month: "long",
					year: "numeric",
				})}
			</div>
			<Button variant="ghost" size="icon" class="size-6" title="Add Event">
				<PlusIcon />
				<span class="sr-only">Add Event</span>
			</Button>
		</div>
		<div class="flex w-full flex-col gap-2">
			{#each events as event (event.title)}
				<div
					class="bg-muted after:bg-primary/70 relative rounded-md p-2 ps-6 text-sm after:absolute after:inset-y-2 after:start-2 after:w-1 after:rounded-full"
				>
					<div class="font-medium">{event.title}</div>
					<div class="text-muted-foreground text-xs">
						{formatDateRange(new Date(event.start), new Date(event.end))}
					</div>
				</div>
			{/each}
		</div>
	</Card.Footer>
</Card.Root>
