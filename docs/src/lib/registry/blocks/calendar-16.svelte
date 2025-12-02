<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import Clock2Icon from "@lucide/svelte/icons/clock-2";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card.Root class="w-fit py-4">
	<Card.Content class="px-4">
		<Calendar type="single" bind:value class="bg-transparent p-0" />
	</Card.Content>
	<Card.Footer class="flex flex-col gap-6 border-t px-4 !pt-4">
		<div class="flex w-full flex-col gap-3">
			<Label for="time-from">Start Time</Label>
			<div class="relative flex w-full items-center gap-2">
				<Clock2Icon
					class="text-muted-foreground pointer-events-none absolute start-2.5 size-4 select-none"
				/>
				<Input
					id="time-from"
					type="time"
					step="1"
					value="10:30:00"
					class="appearance-none ps-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
		<div class="flex w-full flex-col gap-3">
			<Label for="time-to">End Time</Label>
			<div class="relative flex w-full items-center gap-2">
				<Clock2Icon
					class="text-muted-foreground pointer-events-none absolute start-2.5 size-4 select-none"
				/>
				<Input
					id="time-to"
					type="time"
					step="1"
					value="12:30:00"
					class="appearance-none ps-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
