<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import type { DateRange } from "bits-ui";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
	} from "@internationalized/date";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});

	const currentYear = new Date().getFullYear();

	let value: DateRange = $state({
		start: new CalendarDate(currentYear, 1, 20),
		end: new CalendarDate(currentYear, 1, 20).add({ days: 20 }),
	});
</script>

<div class="mx-auto w-60">
	<Field.Field>
		<Field.Label for="date-picker-range">Date Picker Range</Field.Label>
		<Popover.Root>
			<Popover.Trigger id="date-picker-range">
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						class="justify-start px-2.5 font-normal"
					>
						<CalendarIcon />
						{#if value && value.start}
							{#if value.end}
								{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(value.end.toDate(getLocalTimeZone()))}
							{:else}
								{df.format(value.start.toDate(getLocalTimeZone()))}
							{/if}
						{:else}
							<span>Pick a date</span>
						{/if}
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<RangeCalendar
					bind:value
					numberOfMonths={2}
				/>
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</div>
