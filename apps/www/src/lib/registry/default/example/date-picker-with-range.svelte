<script lang="ts">
	import { Calendar as CalendarIcon } from "lucide-svelte";
	import type { DateRange } from "bits-ui";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone
	} from "@internationalized/date";
	import { cn } from "$lib/utils";
	import { Button } from "@/registry/default/ui/button";
	import { RangeCalendar } from "@/registry/default/ui/range-calendar";
	import * as Popover from "@/registry/default/ui/popover";

	const df = new DateFormatter("en-US", {
		dateStyle: "medium"
	});

	let value: DateRange | undefined = {
		start: new CalendarDate(2022, 1, 20),
		end: new CalendarDate(2022, 1, 20).add({ days: 20 })
	};
</script>

<div class="grid gap-2">
	<Popover.Root openFocus>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={cn(
					"w-[300px] justify-start text-left font-normal",
					!value && "text-muted-foreground"
				)}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{#if value && value.start}
					{#if value.end}
						{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
							value.end.toDate(getLocalTimeZone())
						)}
					{:else}
						{df.format(value.start.toDate(getLocalTimeZone()))}
					{/if}
				{:else}
					Pick a date
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" align="start">
			<RangeCalendar
				bind:value
				initialFocus
				numberOfMonths={2}
				placeholder={value?.start}
			/>
		</Popover.Content>
	</Popover.Root>
</div>
