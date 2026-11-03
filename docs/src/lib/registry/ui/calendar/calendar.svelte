<script lang="ts">
	import { isEqualMonth, type DateValue } from "@internationalized/date";
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import CalendarCaption from "./calendar-caption.svelte";
	import CalendarCell from "./calendar-cell.svelte";
	import CalendarDay from "./calendar-day.svelte";
	import CalendarGridBody from "./calendar-grid-body.svelte";
	import CalendarGridHead from "./calendar-grid-head.svelte";
	import CalendarGridRow from "./calendar-grid-row.svelte";
	import CalendarGrid from "./calendar-grid.svelte";
	import CalendarHeadCell from "./calendar-head-cell.svelte";
	import CalendarHeader from "./calendar-header.svelte";
	import CalendarMonth from "./calendar-month.svelte";
	import CalendarMonths from "./calendar-months.svelte";
	import CalendarNav from "./calendar-nav.svelte";
	import CalendarNextButton from "./calendar-next-button.svelte";
	import CalendarPrevButton from "./calendar-prev-button.svelte";
	import type { ButtonVariant } from "../button/button.svelte";
	import type { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	type CalendarRootProps = WithoutChildrenOrChild<CalendarPrimitive.RootProps>;
	type RangeCalendarRootProps = WithoutChildrenOrChild<RangeCalendarPrimitive.RootProps>;
	type DistributivePartial<T> = T extends unknown ? Partial<T> : never;

	type SharedCalendarProps = {
		buttonVariant?: ButtonVariant;
		captionLayout?: "dropdown" | "dropdown-months" | "dropdown-years" | "label";
		months?:
			| CalendarPrimitive.MonthSelectProps["months"]
			| RangeCalendarPrimitive.MonthSelectProps["months"];
		years?:
			| CalendarPrimitive.YearSelectProps["years"]
			| RangeCalendarPrimitive.YearSelectProps["years"];
		monthFormat?:
			| CalendarPrimitive.MonthSelectProps["monthFormat"]
			| RangeCalendarPrimitive.MonthSelectProps["monthFormat"];
		yearFormat?:
			| CalendarPrimitive.YearSelectProps["yearFormat"]
			| RangeCalendarPrimitive.YearSelectProps["yearFormat"];
		day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
	};

	type SingleOrMultipleCalendarProps = DistributivePartial<CalendarRootProps> &
		SharedCalendarProps & {
			mode?: "single" | "multiple";
		};

	type RangeCalendarProps = DistributivePartial<RangeCalendarRootProps> &
		SharedCalendarProps & {
			mode: "range";
			type?: never;
		};

	type CalendarProps = SingleOrMultipleCalendarProps | RangeCalendarProps;

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
		type,
		...restProps
	}: CalendarProps = $props();

	const monthFormat = $derived.by(() => {
		if (monthFormatProp) return monthFormatProp;
		if (captionLayout.startsWith("dropdown")) return "short";
		return "long";
	});

	const calendarType = $derived(mode === "single" || mode === "multiple" ? mode : type);
	const calendarProps = $derived(
		(calendarType === undefined
			? restProps
			: { ...restProps, type: calendarType }) as CalendarRootProps
	);
	const rangeCalendarProps = $derived(restProps as RangeCalendarRootProps);
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
		{...rangeCalendarProps}
	/>
{:else}
	<CalendarPrimitive.Root
		bind:value={value as never}
		bind:ref
		bind:placeholder
		{weekdayFormat}
		{disableDaysOutsideMonth}
		class={cn(
			"cn-calendar group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
			className
		)}
		{locale}
		{monthFormat}
		{yearFormat}
		{...calendarProps}
	>
		{#snippet children({ months, weekdays })}
			<CalendarMonths>
				<CalendarNav>
					<CalendarPrevButton variant={buttonVariant} />
					<CalendarNextButton variant={buttonVariant} />
				</CalendarNav>
				{#each months as month, monthIndex (month)}
					<CalendarMonth>
						<CalendarHeader>
							<CalendarCaption
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
						</CalendarHeader>
						<CalendarGrid>
							<CalendarGridHead>
								<CalendarGridRow class="select-none">
									{#each weekdays as weekday, i (i)}
										<CalendarHeadCell>
											{weekday.slice(0, 2)}
										</CalendarHeadCell>
									{/each}
								</CalendarGridRow>
							</CalendarGridHead>
							<CalendarGridBody>
								{#each month.weeks as weekDates (weekDates)}
									<CalendarGridRow class="mt-2 w-full">
										{#each weekDates as date (date)}
											<CalendarCell {date} month={month.value}>
												{#if day}
													{@render day({
														day: date,
														outsideMonth: !isEqualMonth(date, month.value),
													})}
												{:else}
													<CalendarDay />
												{/if}
											</CalendarCell>
										{/each}
									</CalendarGridRow>
								{/each}
							</CalendarGridBody>
						</CalendarGrid>
					</CalendarMonth>
				{/each}
			</CalendarMonths>
		{/snippet}
	</CalendarPrimitive.Root>
{/if}
