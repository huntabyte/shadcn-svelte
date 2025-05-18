<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";

	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import type { DateRange } from "bits-ui";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue,
	} from "@internationalized/date";

	let startDate = $state<DateValue | undefined>(
		new CalendarDate(new Date().getFullYear(), 1, 20)
	);
	// svelte-ignore state_referenced_locally
	let endDate = $state<DateValue | undefined>(startDate?.add({ days: 20 }));

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	// svelte-ignore state_referenced_locally
	let date = $state<DateRange>({
		start: startDate,
		end: endDate,
	});

	const label = $derived.by(() => {
		if (!date.start) return "Pick a date";
		if (!date.end) return df.format(date.start.toDate(getLocalTimeZone()));
		return `${df.format(date.start.toDate(getLocalTimeZone()))} - ${df.format(date.end.toDate(getLocalTimeZone()))}`;
	});
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				id="date"
				variant="outline"
				class={cn("w-fit justify-start px-2 font-normal", !date && "text-muted-foreground")}
				{...props}
			>
				<CalendarIcon class="text-muted-foreground" />
				{label}
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="end">
		<RangeCalendar
			autofocus
			bind:value={date}
			onStartValueChange={(v) => (startDate = v)}
			placeholder={date?.end}
			numberOfMonths={2}
		/>
	</Popover.Content>
</Popover.Root>
