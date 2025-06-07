<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 18),
		end: new CalendarDate(2025, 7, 7),
	});
</script>

<div class="flex min-w-0 flex-col gap-2">
	<RangeCalendar
		bind:value
		minDays={2}
		maxDays={20}
		numberOfMonths={2}
		class="rounded-lg border shadow-sm"
	/>
	<div class="text-muted-foreground text-center text-xs">
		Your stay must be between 2 and 20 nights
	</div>
</div>
