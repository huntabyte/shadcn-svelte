<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate, type DateValue } from "@internationalized/date";

	let value = $state<CalendarDate[]>([
		new CalendarDate(2025, 6, 12),
		new CalendarDate(2025, 7, 24),
	]);
	// svelte-ignore state_referenced_locally
	let placeholder = $state<DateValue>(value[0]);
</script>

<Calendar
	type="multiple"
	bind:value
	bind:placeholder
	maxDays={5}
	class="rounded-lg border shadow-sm"
	numberOfMonths={2}
/>
