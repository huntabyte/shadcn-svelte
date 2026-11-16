<script lang="ts">
	import { CalendarDate, IslamicUmalquraCalendar, toCalendar } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	let value = $state(toCalendar(new CalendarDate(2025, 6, 12), new IslamicUmalquraCalendar()));
</script>

<div lang="ar">
	<Calendar
		type="single"
		bind:value
		locale="ar-SA-u-ca-islamic-umalqura"
		numerals="arab"
		dir="rtl"
		weekdayFormat="narrow"
		class="rounded-lg border"
	/>
</div>
