<script lang="ts">
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import RangeCalendarMonthSelect from "./range-calendar-month-select.svelte";
	import RangeCalendarYearSelect from "./range-calendar-year-select.svelte";
	import type RangeCalendar from "./range-calendar.svelte";
	import type { ComponentProps } from "svelte";

	let {
		captionLayout,
		months,
		monthFormat,
		years,
		yearFormat,
		month,
		locale,
		placeholder = $bindable(),
		monthIndex = 0,
	}: {
		captionLayout: ComponentProps<typeof RangeCalendar>["captionLayout"];
		months: ComponentProps<typeof RangeCalendarMonthSelect>["months"];
		monthFormat: ComponentProps<typeof RangeCalendarMonthSelect>["monthFormat"];
		years: ComponentProps<typeof RangeCalendarYearSelect>["years"];
		yearFormat: ComponentProps<typeof RangeCalendarYearSelect>["yearFormat"];
		month: DateValue;
		placeholder: DateValue | undefined;
		locale: string;
		monthIndex: number;
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

{#snippet MonthSelect()}
	<RangeCalendarMonthSelect
		{months}
		{monthFormat}
		value={month.month}
		onchange={(e) => {
			if (!placeholder) return;
			const v = Number.parseInt(e.currentTarget.value);
			const newPlaceholder = placeholder.set({ month: v });
			placeholder = newPlaceholder.subtract({ months: monthIndex });
		}}
	/>
{/snippet}

{#snippet YearSelect()}
	<RangeCalendarYearSelect {years} {yearFormat} value={month.year} />
{/snippet}

<div class="flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium">
	{#if captionLayout === "dropdown"}
		{@render MonthSelect()}
		{@render YearSelect()}
	{:else if captionLayout === "dropdown-months"}
		{@render MonthSelect()}
		{#if placeholder}
			{formatYear(placeholder)}
		{/if}
	{:else if captionLayout === "dropdown-years"}
		{#if placeholder}
			{formatMonth(placeholder)}
		{/if}
		{@render YearSelect()}
	{:else}
		<span class={cn("font-medium select-none", "cn-calendar-caption text-sm")}>
			{formatMonth(month)}
			{formatYear(month)}
		</span>
	{/if}
</div>
