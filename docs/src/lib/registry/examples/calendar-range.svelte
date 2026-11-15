<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import type { DateRange } from "bits-ui";

	const start = new CalendarDate(today(getLocalTimeZone()).year, 1, 12);

	let value = $state<DateRange | undefined>({
		start,
		end: start.add({ days: 30 }),
	});
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<RangeCalendar
			bind:value
			numberOfMonths={2}
			minValue={new CalendarDate(1900, 1, 1)}
			maxValue={today(getLocalTimeZone())}
		/>
	</Card.Content>
</Card.Root>
