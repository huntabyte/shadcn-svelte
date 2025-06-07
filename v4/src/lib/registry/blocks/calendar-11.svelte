<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 17),
		end: new CalendarDate(2025, 6, 20),
	});
</script>

<div class="flex min-w-0 flex-col gap-2">
	<RangeCalendar
		bind:value
		numberOfMonths={2}
		minValue={new CalendarDate(2025, 6, 1)}
		maxValue={new CalendarDate(2025, 7, 31)}
		class="rounded-lg border shadow-sm"
	/>
	<div class="text-muted-foreground text-center text-xs">We are open in June and July only.</div>
</div>
