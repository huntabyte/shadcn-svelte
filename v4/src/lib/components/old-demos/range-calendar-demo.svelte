<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";

	let rangeOneStart = $state(new CalendarDate(new Date().getFullYear(), 1, 12));
	let rangeOneEnd = $state(rangeOneStart.add({ days: 30 }));

	let rangeOne = $state<DateRange | undefined>({
		start: rangeOneStart,
		end: rangeOneEnd,
	});

	let rangeTwoStart = $state(new CalendarDate(new Date().getFullYear(), 1, 12));
	let rangeTwoEnd = $state(rangeTwoStart.add({ days: 50 }));

	let rangeTwo = $state<DateRange | undefined>({
		start: rangeTwoStart,
		end: rangeTwoEnd,
	});
</script>

<div class="flex flex-col flex-wrap items-start gap-2">
	<RangeCalendar
		bind:value={rangeOne}
		class="rounded-md border shadow-sm"
		placeholder={rangeOne?.start}
		numberOfMonths={2}
		isDateDisabled={(v) => {
			// if date is after today or before 1900-01-01 return true
			if (
				v.compare(today(getLocalTimeZone())) > 0 ||
				v.compare(new CalendarDate(1900, 1, 1)) < 0
			) {
				return true;
			}
			return false;
		}}
	/>
	<RangeCalendar
		bind:value={rangeTwo}
		class="@4xl:flex hidden rounded-md border shadow-sm [&>div]:gap-5"
		placeholder={rangeTwo?.start}
		numberOfMonths={3}
	/>
</div>
