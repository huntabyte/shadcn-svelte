<script lang="ts">
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 12),
		end: new CalendarDate(2025, 7, 15),
	});
</script>

<RangeCalendar bind:value class="rounded-lg border shadow-sm" numberOfMonths={2} />
