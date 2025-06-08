<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import * as RangeCalendar from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "$lib/registry/ui/button/index.js";
	import type { Snippet } from "svelte";
	import {
		DateFormatter,
		getLocalTimeZone,
		isEqualMonth,
		type DateValue,
	} from "@internationalized/date";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		weekdayFormat = "short",
		class: className,
		buttonVariant = "ghost",
		captionLayout = "label",
		locale = "en-US",
		months: monthsProp,
		years,
		monthFormat = "short",
		yearFormat = "numeric",
		day,
		disableDaysOutsideMonth = false,
		...restProps
	}: WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		months?: RangeCalendarPrimitive.MonthSelectProps["months"];
		years?: RangeCalendarPrimitive.YearSelectProps["years"];
		monthFormat?: RangeCalendarPrimitive.MonthSelectProps["monthFormat"];
		yearFormat?: RangeCalendarPrimitive.YearSelectProps["yearFormat"];
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
	} = $props();

	function formatYear(date: DateValue) {
		const dateObj = date.toDate(getLocalTimeZone());
		if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
		return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
	}

	function formatMonth(date: DateValue) {
		const dateObj = date.toDate(getLocalTimeZone());
		if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
		return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
	}
</script>

<RangeCalendarPrimitive.Root
	bind:ref
	bind:value
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	class={cn(
		"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
		className
	)}
	{locale}
	{monthFormat}
	{yearFormat}
	{...restProps}
>
	{#snippet children({ months, weekdays })}
		<RangeCalendar.Header>
			<RangeCalendar.PrevButton variant={buttonVariant} />
			{#if captionLayout.includes("dropdown")}
				<div
					class="h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium"
				>
					{#if captionLayout === "dropdown"}
						<RangeCalendar.MonthSelect months={monthsProp} {monthFormat} />
						<RangeCalendar.YearSelect {years} {yearFormat} />
					{:else if captionLayout === "dropdown-months"}
						<RangeCalendar.MonthSelect months={monthsProp} {monthFormat} />
						{#if placeholder}
							{formatYear(placeholder)}
						{/if}
					{:else if captionLayout === "dropdown-years"}
						{#if placeholder}
							{formatMonth(placeholder)}
						{/if}
						<RangeCalendar.YearSelect {years} {yearFormat} />
					{/if}
				</div>
			{:else}
				<RangeCalendar.Heading />
			{/if}
			<RangeCalendar.NextButton variant={buttonVariant} />
		</RangeCalendar.Header>
		<RangeCalendar.Months>
			{#each months as month (month)}
				<RangeCalendar.Grid class="group">
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
										{#if day}
											{@render day({
												day: date,
												outsideMonth: !isEqualMonth(date, month.value),
											})}
										{:else}
											<RangeCalendar.Day />
										{/if}
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
