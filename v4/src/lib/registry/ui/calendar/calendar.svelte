<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import * as Calendar from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "../button/button.svelte";
	import {
		DateFormatter,
		getLocalTimeZone,
		isEqualMonth,
		type DateValue,
	} from "@internationalized/date";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		placeholder = $bindable(),
		class: className,
		weekdayFormat = "short",
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
	}: WithoutChildrenOrChild<CalendarPrimitive.RootProps> & {
		buttonVariant?: ButtonVariant;
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		months?: CalendarPrimitive.MonthSelectProps["months"];
		years?: CalendarPrimitive.YearSelectProps["years"];
		monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
		yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
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

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
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
		<Calendar.Header>
			<Calendar.PrevButton variant={buttonVariant} />
			{#if captionLayout.includes("dropdown")}
				<div
					class="h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium"
				>
					{#if captionLayout === "dropdown"}
						<Calendar.MonthSelect months={monthsProp} {monthFormat} />
						<Calendar.YearSelect {years} {yearFormat} />
					{:else if captionLayout === "dropdown-months"}
						<Calendar.MonthSelect months={monthsProp} {monthFormat} />
						{#if placeholder}
							{formatYear(placeholder)}
						{/if}
					{:else if captionLayout === "dropdown-years"}
						{#if placeholder}
							{formatMonth(placeholder)}
						{/if}
						<Calendar.YearSelect {years} {yearFormat} />
					{/if}
				</div>
			{:else}
				<Calendar.Heading />
			{/if}
			<Calendar.NextButton variant={buttonVariant} />
		</Calendar.Header>
		<Calendar.Months>
			{#each months as month (month)}
				<Calendar.Grid>
					<Calendar.GridHead>
						<Calendar.GridRow class="flex select-none">
							{#each weekdays as weekday (weekday)}
								<Calendar.HeadCell>
									{weekday.slice(0, 2)}
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<Calendar.GridRow class="mt-2 w-full">
								{#each weekDates as date (date)}
									<Calendar.Cell {date} month={month.value}>
										{#if day}
											{@render day({
												day: date,
												outsideMonth: !isEqualMonth(date, month.value),
											})}
										{:else}
											<Calendar.Day />
										{/if}
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
