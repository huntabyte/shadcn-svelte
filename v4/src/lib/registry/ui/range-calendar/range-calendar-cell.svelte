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
		"min-w-(--cell-size) dark:[&:has([data-selection-start])]:hover:bg-accent dark:[&:has([data-selection-end])]:hover:bg-accent [&:has([data-selection-middle])]:bg-accent [&:has([data-selection-middle])]:hover:bg-accent/50 [&:has([data-selected])]:bg-accent relative h-auto w-full p-0 text-center text-sm focus-within:z-20 data-[selection-middle]:rounded-r-md [&:has([data-selection-end])]:rounded-r-md [&:has([data-selection-middle])]:rounded-none first:[&:has([data-selection-middle])]:rounded-l-md last:[&:has([data-selection-middle])]:rounded-r-md [&:has([data-selection-start])]:rounded-l-md ",
		className
	)}
	{...restProps}
/>
