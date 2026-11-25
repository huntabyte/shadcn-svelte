<script lang="ts">
	import { CalendarDate, PersianCalendar } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	let numerals = $state<string | undefined>("arabext");
	const value = new CalendarDate(new PersianCalendar(), 1404, 3, 22);
</script>

<button onclick={() => (numerals = "latn")}>Latin numerals</button>
<button onclick={() => (numerals = "arab")}>Arabic numerals</button>
<button onclick={() => (numerals = undefined)}>Default numerals</button>
<div data-testid="number-calendar">
	<Calendar type="single" {value} locale="fa-IR" {numerals} dir="rtl" captionLayout="dropdown" />
</div>
<div data-testid="custom-day-calendar">
	<Calendar type="single" {value} locale="fa-IR" {numerals} dir="rtl">
		{#snippet day({ day })}
			<span>custom-{day.day}</span>
		{/snippet}
	</Calendar>
</div>
