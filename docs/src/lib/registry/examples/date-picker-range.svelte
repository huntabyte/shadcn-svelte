<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import type { DateRange } from "bits-ui";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue,
	} from "@internationalized/date";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { cn } from "$lib/utils.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	let value: DateRange = $state({
		start: new CalendarDate(2025, 1, 20),
		end: new CalendarDate(2025, 1, 20).add({ days: 20 }),
	});

	let startValue: DateValue | undefined = $state(undefined);
</script>

<div class="mx-auto w-60">
	<Field.Field>
		<Field.Label for="date-picker-range">Date range</Field.Label>
		<Popover.Root>
			<Popover.Trigger
				id="date-picker-range"
				class={cn(
					buttonVariants({ variant: "outline" }),
					"justify-start px-2.5 font-normal",
					!value && "text-muted-foreground"
				)}
			>
				<CalendarIcon />
				{#if value && value.start}
					{#if value.end}
						{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
							value.end.toDate(getLocalTimeZone())
						)}
					{:else}
						{df.format(value.start.toDate(getLocalTimeZone()))}
					{/if}
				{:else if startValue}
					{df.format(startValue.toDate(getLocalTimeZone()))}
				{:else}
					Pick a date
				{/if}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<RangeCalendar
					bind:value
					onStartValueChange={(v) => {
						startValue = v;
					}}
					numberOfMonths={2}
				/>
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</div>
