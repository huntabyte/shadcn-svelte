<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: RangeCalendarPrimitive.CellProps = $props();
</script>

<RangeCalendarPrimitive.Cell
	bind:ref
	class={cn(
		"relative size-(--cell-size) p-0 text-center text-sm focus-within:z-20 data-range-middle:rounded-r-md [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:has([data-range-end])]:rounded-r-md dark:[&:has([data-range-end])]:hover:bg-accent [&:has([data-range-middle])]:rounded-none [&:has([data-range-middle])]:bg-accent first:[&:has([data-range-middle])]:rounded-l-md last:[&:has([data-range-middle])]:rounded-r-md dark:[&:has([data-range-middle])]:hover:bg-accent/50 [&:has([data-range-start])]:rounded-l-md dark:[&:has([data-range-start])]:hover:bg-accent [&:has([data-selected])]:bg-accent [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md",
		className
	)}
	{...restProps}
/>
