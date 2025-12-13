<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card.Root class="w-fit py-4">
	<Card.Content class="px-4">
		<Calendar
			type="single"
			bind:value
			class="bg-transparent p-0 [--cell-size:--spacing(10.5)]"
		/>
	</Card.Content>
	<Card.Footer class="flex gap-2 border-t px-4 !pt-4 *:[div]:w-full">
		<div>
			<Label for="time-from" class="sr-only">Start Time</Label>
			<Input
				id="time-from"
				type="time"
				step="1"
				value="10:30:00"
				class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
		<span>-</span>
		<div>
			<Label for="time-to" class="sr-only">End Time</Label>
			<Input
				id="time-to"
				type="time"
				step="1"
				value="12:30:00"
				class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
			/>
		</div>
	</Card.Footer>
</Card.Root>
