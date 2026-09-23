<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 9),
		end: new CalendarDate(2025, 6, 26),
	});
</script>

<RangeCalendar bind:value class="rounded-lg border shadow-sm" />
