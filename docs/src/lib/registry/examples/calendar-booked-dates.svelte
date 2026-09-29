<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today, type DateValue } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	const year = today(getLocalTimeZone()).year;

	let value = $state<CalendarDate | undefined>(new CalendarDate(year, 2, 3));

	const bookedDates = Array.from({ length: 15 }, (_, i) => new CalendarDate(year, 2, 12 + i));

	function isBooked(date: DateValue) {
		return bookedDates.some((d) => d.compare(date) === 0);
	}
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<Calendar type="single" bind:value isDateUnavailable={isBooked} />
	</Card.Content>
</Card.Root>
