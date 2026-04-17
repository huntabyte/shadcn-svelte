<script lang="ts">
	import { Calendar as CalendarPrimitive, RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import * as Calendar from "./index.js";
	import { RangeCalendar } from "../range-calendar/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ButtonVariant } from "../button/button.svelte";
	import { isEqualMonth, type DateValue } from "@internationalized/date";
	import type { Snippet } from "svelte";

	type WrapperExtras = {
		buttonVariant?: ButtonVariant;
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		months?: CalendarPrimitive.MonthSelectProps["months"];
		years?: CalendarPrimitive.YearSelectProps["years"];
		monthFormat?: CalendarPrimitive.MonthSelectProps["monthFormat"];
		yearFormat?: CalendarPrimitive.YearSelectProps["yearFormat"];
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
	};

	type Props =
		| (WithoutChildrenOrChild<CalendarPrimitive.RootProps> & WrapperExtras & { mode?: "single" | "multiple" })
		| (WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps> & WrapperExtras & { mode: "range" });

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
		monthFormat: monthFormatProp,
		yearFormat = "numeric",
		day,
		disableDaysOutsideMonth = false,
		mode,
		...restProps
	}: Props = $props();

	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith("dropdown")) return "short";
		return "long";
	});
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
{#if mode === "range"}
	<RangeCalendar
		bind:ref
		bind:value={value as never}
		bind:placeholder
		class={className}
		{weekdayFormat}
		{buttonVariant}
		{captionLayout}
		{locale}
		months={monthsProp}
		{years}
		monthFormat={monthFormatProp}
		{yearFormat}
		{day}
		{disableDaysOutsideMonth}
		{...(restProps as RangeCalendarPrimitive.RootProps)}
	/>
{:else}
<CalendarPrimitive.Root
	bind:value={value as never}
	bind:ref
	bind:placeholder
	{weekdayFormat}
	{disableDaysOutsideMonth}
	class={cn(
		"cn-calendar bg-background group/calendar in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
		className
	)}
	{locale}
	{monthFormat}
	{yearFormat}
	{...(restProps as CalendarPrimitive.RootProps)}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Months>
			<Calendar.Nav>
				<Calendar.PrevButton variant={buttonVariant} />
				<Calendar.NextButton variant={buttonVariant} />
			</Calendar.Nav>
			{#each months as month, monthIndex (month)}
				<Calendar.Month>
					<Calendar.Header>
						<Calendar.Caption
							{captionLayout}
							months={monthsProp}
							{monthFormat}
							{years}
							{yearFormat}
							month={month.value}
							bind:placeholder
							{locale}
							{monthIndex}
						/>
					</Calendar.Header>
					<Calendar.Grid>
						<Calendar.GridHead>
							<Calendar.GridRow class="select-none">
								{#each weekdays as weekday, i (i)}
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
				</Calendar.Month>
			{/each}
		</Calendar.Months>
	{/snippet}
</CalendarPrimitive.Root>
{/if}
