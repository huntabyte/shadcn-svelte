<script lang="ts">
	import "@fontsource-variable/vazirmatn/index.css";
	import { CalendarDate, PersianCalendar } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	const initialDate = new CalendarDate(new PersianCalendar(), 1404, 3, 22);
	const weekdayLabels = ["ش", "۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج"];
	let value = $state<CalendarDate | undefined>(initialDate);
</script>

<div lang="fa" style="font-family: 'Vazirmatn Variable', sans-serif;">
	<Calendar
		type="single"
		bind:value
		locale="fa-IR"
		numerals="arabext"
		dir="rtl"
		weekStartsOn={6}
		class="rounded-lg border"
	>
		{#snippet weekday({ index })}
			{weekdayLabels[index]}
		{/snippet}
	</Calendar>
</div>
