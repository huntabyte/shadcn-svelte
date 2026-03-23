<script lang="ts">
	import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import type { DateRange } from "bits-ui";

	const now = today(getLocalTimeZone());

	let value = $state<DateRange>({
		start: now.set({ month: 12, day: 8 }),
		end: now.set({ month: 12, day: 8 }).add({ days: 10 }),
	});

	function isWeekend(date: DateValue) {
		const jsDate = date.toDate(getLocalTimeZone());
		const d = jsDate.getDay();
		return d === 0 || d === 6;
	}
</script>

<Card.Root class="mx-auto w-fit p-0">
	<Card.Content class="p-0">
		<RangeCalendar
			bind:value
			captionLayout="dropdown"
			class="rounded-lg [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
		>
			{#snippet day({ day, outsideMonth })}
				<div
					class="flex size-(--cell-size) flex-col items-center justify-center gap-0.5 rounded-(--cell-radius) text-xs leading-none"
				>
					<span>{day.day}</span>
					{#if !outsideMonth}
						<span class="text-[0.6rem] opacity-70">
							{isWeekend(day) ? "$120" : "$100"}
						</span>
					{/if}
				</div>
			{/snippet}
		</RangeCalendar>
	</Card.Content>
</Card.Root>
