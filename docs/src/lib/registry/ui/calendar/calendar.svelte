<script lang="ts">
	import { isEqualMonth, type DateValue } from "@internationalized/date";
	import { Calendar as CalendarPrimitive } from "bits-ui";
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
		monthFormat: monthFormatProp,
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
	{...restProps}
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
