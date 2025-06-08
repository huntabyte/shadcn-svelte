<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
	type="single"
	bind:value
	class="rounded-lg border shadow-sm"
	minValue={new CalendarDate(2025, 6, 12)}
/>
