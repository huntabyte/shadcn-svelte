<script lang="ts">
	import { today, getLocalTimeZone } from "@internationalized/date";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import type { DateRange } from "bits-ui";

	const now = today(getLocalTimeZone());

	let value = $state<DateRange>({
		start: now.set({ day: 12, month: 1 }),
		end: now.set({ day: 12, month: 1 }).add({ days: 30 }),
	});
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<RangeCalendar
			bind:value
			numberOfMonths={2}
			isDateDisabled={(date) => date.compare(today(getLocalTimeZone())) > 0}
			class="rounded-lg"
		/>
	</Card.Content>
</Card.Root>
