<script lang="ts">
	import { CalendarDate } from "@internationalized/date";
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";

	let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
	type="single"
	bind:value
	class="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
