<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));

	const disabledDays = Array.from({ length: 12 }, (_, i) => new CalendarDate(2025, 6, 15 + i));
</script>

<Calendar
	type="single"
	bind:value
	class="rounded-lg border shadow-sm"
	isDateUnavailable={(date) => disabledDays.some((d) => d.compare(date) === 0)}
/>
