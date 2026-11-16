<script lang="ts">
	import "@fontsource-variable/vazirmatn/index.css";
	import { CalendarDate, PersianCalendar } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	let value = $state(new CalendarDate(new PersianCalendar(), 1404, 3, 22));
</script>

<div lang="fa" style="font-family: 'Vazirmatn Variable', sans-serif;">
	<Calendar
		type="single"
		bind:value
		locale="fa-IR"
		numerals="arabext"
		dir="rtl"
		weekdayFormat="narrow"
		class="rounded-lg border"
	/>
</div>
