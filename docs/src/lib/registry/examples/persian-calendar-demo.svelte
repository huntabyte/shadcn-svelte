<script lang="ts">
	import "@fontsource-variable/vazirmatn/index.css";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		PersianCalendar,
		type DateValue,
	} from "@internationalized/date";
	import * as Calendar from "$lib/registry/ui/calendar/index.js";

	const locale = "fa-IR-u-nu-arabext";
	const dayFormatter = new DateFormatter(locale, { day: "numeric" });
	const weekdayLabels = ["ش", "۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج"];

	let value = $state(new CalendarDate(new PersianCalendar(), 1404, 3, 22));

	function formatDay(day: DateValue) {
		return dayFormatter.format(day.toDate(getLocalTimeZone()));
	}
</script>

<div lang="fa" style="font-family: 'Vazirmatn Variable', sans-serif;">
	<Calendar.Calendar
		type="single"
		bind:value
		{locale}
		dir="rtl"
		weekdayFormat="narrow"
		class="rounded-md border shadow-sm"
	>
		{#snippet weekday({ index })}
			{weekdayLabels[index]}
		{/snippet}
		{#snippet day({ day })}
			<Calendar.Day>
				{formatDay(day)}
			</Calendar.Day>
		{/snippet}
	</Calendar.Calendar>
</div>
