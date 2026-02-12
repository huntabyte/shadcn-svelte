<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

	const currentDate = today(getLocalTimeZone());
	const bookedDates = Array.from(
		{ length: 15 },
		(_, i) => new CalendarDate(currentDate.year, 1, 12 + i)
	);
</script>

<Example title="Booked Dates">
	<Card.Root class="mx-auto w-fit p-0">
		<Card.Content class="p-0">
			<Calendar
				type="single"
				isDateUnavailable={(d) => bookedDates.some((bd) => bd.compare(d) === 0)}
			/>
		</Card.Content>
	</Card.Root>
</Example>
