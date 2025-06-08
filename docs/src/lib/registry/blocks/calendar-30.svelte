<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import RangeCalendar from "$lib/registry/ui/range-calendar/range-calendar.svelte";
	import { Label } from "$lib/registry/ui/label/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import type { DateRange } from "bits-ui";
	import { CalendarDate, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { formatDateRange } from "little-date";

	const id = $props.id();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2025, 6, 4),
		end: new CalendarDate(2025, 6, 10),
	});

	function formatRange(start: DateValue, end: DateValue) {
		return formatDateRange(start.toDate(getLocalTimeZone()), end.toDate(getLocalTimeZone()), {
			includeTime: false,
		});
	}
</script>

<div class="flex flex-col gap-3">
	<Label for="{id}-dates" class="px-1">Select your stay</Label>
	<Popover.Root>
		<Popover.Trigger id="{id}-dates">
			{#snippet child({ props })}
				<Button {...props} variant="outline" class="w-56 justify-between font-normal">
					{#if value?.start && value?.end}
						{formatRange(value.start, value.end)}
					{:else}
						Select date
					{/if}
					<ChevronDownIcon />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0" align="start">
			<RangeCalendar bind:value captionLayout="dropdown" />
		</Popover.Content>
	</Popover.Root>
</div>
