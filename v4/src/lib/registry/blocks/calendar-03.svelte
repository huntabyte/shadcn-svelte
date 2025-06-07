<script lang="ts">
	import Calendar from "$lib/registry/ui/calendar/calendar.svelte";
	import { CalendarDate } from "@internationalized/date";

	let value = $state<CalendarDate[]>([
		new CalendarDate(2025, 6, 12),
		new CalendarDate(2025, 6, 13),
	]);
</script>

<Calendar
	type="multiple"
	bind:value={
		() => value,
		(v) => {
			// Limit the number of selected dates to 5
			if (v && v.length > 5) {
				value = [v[v.length - 1]];
			} else {
				value = v;
			}
		}
	}
	class="rounded-lg border shadow-sm"
	numberOfMonths={2}
/>
