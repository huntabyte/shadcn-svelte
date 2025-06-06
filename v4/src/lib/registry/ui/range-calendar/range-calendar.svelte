<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import * as RangeCalendar from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "$lib/registry/ui/button/index.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		weekdayFormat = "short",
		class: className,
		buttonVariant = "ghost",
		...restProps
	}: WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		disableNavigation?: boolean;
	} = $props();
</script>

<RangeCalendarPrimitive.Root
	bind:ref
	bind:value
	bind:placeholder
	{weekdayFormat}
	class={cn(
		"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
		className
	)}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendar.Header>
			<RangeCalendar.PrevButton variant={buttonVariant} />
			<RangeCalendar.Heading />
			<RangeCalendar.NextButton variant={buttonVariant} />
		</RangeCalendar.Header>
		<RangeCalendar.Months>
			{#each months as month (month)}
				<RangeCalendar.Grid>
					<RangeCalendar.GridHead>
						<RangeCalendar.GridRow class="flex select-none">
							{#each weekdays as weekday (weekday)}
								<RangeCalendar.HeadCell>
									{weekday.slice(0, 2)}
								</RangeCalendar.HeadCell>
							{/each}
						</RangeCalendar.GridRow>
					</RangeCalendar.GridHead>
					<RangeCalendar.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<RangeCalendar.GridRow class="mt-2 w-full">
								{#each weekDates as date (date)}
									<RangeCalendar.Cell {date} month={month.value}>
										<RangeCalendar.Day />
									</RangeCalendar.Cell>
								{/each}
							</RangeCalendar.GridRow>
						{/each}
					</RangeCalendar.GridBody>
				</RangeCalendar.Grid>
			{/each}
		</RangeCalendar.Months>
	{/snippet}
</RangeCalendarPrimitive.Root>
