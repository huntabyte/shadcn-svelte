<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import RangeCalendarDay from "$lib/registry/ui/range-calendar/range-calendar-day.svelte";
	import { CalendarDate, isWeekend } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2025, 6, 12),
		end: new CalendarDate(2025, 6, 17),
	});
</script>

<RangeCalendar
	bind:value
	class="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
	monthFormat="long"
	captionLayout="dropdown"
>
	{#snippet day({ day, outsideMonth })}
		{@const dayIsWeekend = isWeekend(day, "en-US")}
		<RangeCalendarDay class="flex flex-col items-center">
			{day.day}
			{#if !outsideMonth}
				<span>
					{dayIsWeekend ? "$220" : "$100"}
				</span>
			{/if}
		</RangeCalendarDay>
	{/snippet}
</RangeCalendar>
