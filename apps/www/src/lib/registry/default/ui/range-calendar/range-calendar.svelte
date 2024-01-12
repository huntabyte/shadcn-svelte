<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import * as RangeCalendar from ".";
	import { cn } from "$lib/utils";

	type $$Props = RangeCalendarPrimitive.Props;
	type $$Events = RangeCalendarPrimitive.Events;

	export let value: $$Props["value"] = undefined;
	export let placeholder: $$Props["placeholder"] = undefined;
	export let weekdayFormat: $$Props["weekdayFormat"] = "short";
	export let startValue: $$Props["startValue"] = undefined;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.Root
	on:keydown
	bind:value
	bind:placeholder
	bind:startValue
	{weekdayFormat}
	class={cn("p-3", className)}
	{...$$restProps}
	let:months
	let:weekdays
>
	<RangeCalendar.Header>
		<RangeCalendar.PrevButton />
		<RangeCalendar.Heading />
		<RangeCalendar.NextButton />
	</RangeCalendar.Header>
	<RangeCalendar.Months>
		{#each months as month}
			<RangeCalendar.Grid>
				<RangeCalendar.GridHead>
					<RangeCalendar.GridRow class="flex">
						{#each weekdays as weekday}
							<RangeCalendar.HeadCell>
								{weekday.slice(0, 2)}
							</RangeCalendar.HeadCell>
						{/each}
					</RangeCalendar.GridRow>
				</RangeCalendar.GridHead>
				<RangeCalendar.GridBody>
					{#each month.weeks as weekDates}
						<RangeCalendar.GridRow class="w-full mt-2">
							{#each weekDates as date}
								<RangeCalendar.Cell {date}>
									<RangeCalendar.Day {date} month={month.value} />
								</RangeCalendar.Cell>
							{/each}
						</RangeCalendar.GridRow>
					{/each}
				</RangeCalendar.GridBody>
			</RangeCalendar.Grid>
		{/each}
	</RangeCalendar.Months>
</RangeCalendarPrimitive.Root>
