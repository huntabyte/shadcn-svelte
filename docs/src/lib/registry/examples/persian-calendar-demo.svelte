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

	let value = $state(new CalendarDate(new PersianCalendar(), 1404, 3, 22));

	function formatDay(day: DateValue) {
		return dayFormatter.format(day.toDate(getLocalTimeZone()));
	}
</script>

<div class="persian-calendar" lang="fa" style="font-family: 'Vazirmatn Variable', sans-serif;">
	<Calendar.Calendar
		type="single"
		bind:value
		{locale}
		dir="rtl"
		weekdayFormat="narrow"
		class="rounded-md border shadow-sm"
	>
		{#snippet day({ day })}
			<Calendar.Day>
				{formatDay(day)}
			</Calendar.Day>
		{/snippet}
	</Calendar.Calendar>
</div>

<style>
	.persian-calendar :global([data-calendar-head-cell]) {
		font-size: 0;
	}

	.persian-calendar :global([data-calendar-head-cell]::before) {
		font-size: 0.8rem;
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(1)::before) {
		content: "ش";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(2)::before) {
		content: "ش۱";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(3)::before) {
		content: "ش۲";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(4)::before) {
		content: "ش۳";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(5)::before) {
		content: "ش۴";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(6)::before) {
		content: "ش۵";
	}

	.persian-calendar :global([data-calendar-head-cell]:nth-child(7)::before) {
		content: "ج";
	}
</style>
