<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import CalendarDay from "$lib/registry/ui/calendar/calendar-day.svelte";
	import { CalendarDate, isWeekend } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
	type="single"
	bind:value
	class="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
	monthFormat="long"
>
	{#snippet day({ day, outsideMonth })}
		{@const dayIsWeekend = isWeekend(day, "en-US")}
		<CalendarDay class="flex flex-col items-center">
			{day.day}
			{#if !outsideMonth}
				<span>
					{dayIsWeekend ? "$220" : "$100"}
				</span>
			{/if}
		</CalendarDay>
	{/snippet}
</Calendar>
