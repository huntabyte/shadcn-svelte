<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 12),
		end: new CalendarDate(2025, 6, 26),
	});
</script>

<div class="flex min-w-0 flex-col gap-2">
	<RangeCalendar bind:value minDays={5} class="rounded-lg border shadow-sm" />
	<div class="text-muted-foreground text-center text-xs">A minimum of 5 days is required</div>
</div>
