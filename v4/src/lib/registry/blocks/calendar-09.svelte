<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { CalendarDate, isWeekend } from "@internationalized/date";
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
		isDateDisabled={(date) => isWeekend(date, "en-US")}
		class="rounded-lg border shadow-sm"
		excludeDisabled
	/>
	<div class="text-muted-foreground text-center text-xs">
		Your stay cannot extend through the weekend
	</div>
</div>
