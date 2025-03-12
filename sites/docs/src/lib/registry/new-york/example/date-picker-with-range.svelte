<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import type { DateRange } from "bits-ui";
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
	} from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { RangeCalendar } from "$lib/registry/new-york/ui/range-calendar/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2022, 1, 20),
		end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
	});

	let startValue = $state<DateValue | undefined>(undefined);
</script>

<div class="grid gap-2">
	<Popover.Root>
		<Popover.Trigger
			class={cn(
				buttonVariants({
					variant: "outline",
					class: "w-[300px] justify-start text-left font-normal",
				}),
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
</div>
