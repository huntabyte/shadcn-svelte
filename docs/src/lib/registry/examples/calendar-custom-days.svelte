<script lang="ts">
	import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import CalendarDayButton from "$lib/registry/ui/range-calendar/range-calendar-day.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import type { DateRange } from "bits-ui";

	const currentYear = new Date().getFullYear();
	const maxValue = new CalendarDate(currentYear, 12, 31);

	let value = $state<DateRange>({
		start: new CalendarDate(currentYear, 12, 8),
		end: new CalendarDate(currentYear, 12, 8).add({ days: 10 }),
	});
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<RangeCalendar
			bind:value
			{maxValue}
			numberOfMonths={1}
			captionLayout="dropdown"
			monthFormat="long"
			class="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
		>
			{#snippet day({ day, outsideMonth })}
				{@const isWeekend =
					day.toDate(getLocalTimeZone()).getDay() === 0 ||
					day.toDate(getLocalTimeZone()).getDay() === 6}
				<CalendarDayButton>
					{day.day}
					{#if !outsideMonth}
						<span>{isWeekend ? "$120" : "$100"}</span>
					{/if}
				</CalendarDayButton>
			{/snippet}
		</RangeCalendar>
	</Card.Content>
</Card.Root>
