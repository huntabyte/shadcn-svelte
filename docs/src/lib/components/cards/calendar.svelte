<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import { CalendarDate } from "@internationalized/date";

	const start = new CalendarDate(2025, 6, 5);
</script>

<Card.Root class="hidden max-w-[260px] p-0 sm:flex">
	<Card.Content class="p-0">
		<RangeCalendar placeholder={start} value={{ start, end: start.add({ days: 8 }) }} />
	</Card.Content>
</Card.Root>
