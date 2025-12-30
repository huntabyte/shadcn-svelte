<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import type { DateRange } from "bits-ui";

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	const currentDate = new CalendarDate(2022, 1, 20);
	let date = $state<DateRange | undefined>({
		start: currentDate,
		end: currentDate.add({ days: 20 }),
	});
</script>

<Example title="Date Picker Range">
	<Field.Field class="mx-auto w-72">
		<Field.Label for="date-picker-range">Date Picker Range</Field.Label>
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						id="date-picker-range"
						class="justify-start px-2.5 font-normal"
					>
						<IconPlaceholder
							lucide="CalendarIcon"
							tabler="IconCalendar"
							hugeicons="CalendarIcon"
							phosphor="CalendarBlankIcon"
							data-icon="inline-start"
						/>
						{#if date?.start && date?.end}
							{df.format(date.start.toDate(getLocalTimeZone()))} - {df.format(
								date.end.toDate(getLocalTimeZone())
							)}
						{:else}
							Pick a date
						{/if}
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<RangeCalendar bind:value={date} numberOfMonths={2} />
			</Popover.Content>
		</Popover.Root>
	</Field.Field>
</Example>
