<script lang="ts">
	import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const base = today(getLocalTimeZone()).set({ month: 2, day: 3 });

	// Booked dates: 12th through 26th of February
	const bookedDates = Array.from({ length: 15 }, (_, i) =>
		today(getLocalTimeZone()).set({ month: 2, day: 12 + i })
	);

	let value = $state<DateValue | undefined>(base);

	function isBooked(date: DateValue) {
		return bookedDates.some((d) => d.compare(date) === 0);
	}
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<Calendar
			type="single"
			bind:value
			placeholder={base}
			isDateUnavailable={isBooked}
			class="rounded-lg"
		/>
	</Card.Content>
</Card.Root>
