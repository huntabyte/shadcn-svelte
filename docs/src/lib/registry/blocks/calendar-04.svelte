<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 9),
		end: new CalendarDate(2025, 6, 26),
	});
</script>

<Calendar mode="range" bind:value class="rounded-lg border shadow-sm" />
