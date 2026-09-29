<script lang="ts">
	import { CalendarDate, getLocalTimeZone, isWeekend, today } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import RangeCalendarDay from "$lib/registry/ui/range-calendar/range-calendar-day.svelte";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import type { DateRange } from "bits-ui";

	const start = new CalendarDate(today(getLocalTimeZone()).year, 12, 8);

	let value = $state<DateRange | undefined>({
		start,
		end: start.add({ days: 10 }),
	});
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<RangeCalendar
			bind:value
			captionLayout="dropdown"
			monthFormat="long"
			class="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
		>
			{#snippet day({ day, outsideMonth })}
				<RangeCalendarDay>
					{day.day}
					{#if !outsideMonth}
						<span>{isWeekend(day, "en-US") ? "$120" : "$100"}</span>
					{/if}
				</RangeCalendarDay>
			{/snippet}
		</RangeCalendar>
	</Card.Content>
</Card.Root>
