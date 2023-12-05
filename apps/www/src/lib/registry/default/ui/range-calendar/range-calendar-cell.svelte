<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = RangeCalendarPrimitive.CellProps;

	export let date: $$Props["date"];
	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.Cell
	{date}
	class={cn(
		"h-9 w-9 text-center text-sm p-0 relative [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-accent/50 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
		className
	)}
	{...$$restProps}
>
	<slot />
</RangeCalendarPrimitive.Cell>
