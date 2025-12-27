<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
	bind:ref
	class={cn(
		"cn-calendar-day group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none",
		"focus-within:z-20",
		"[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)]",
		"[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)]",
		"[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)]",
		className
	)}
	{...restProps}
/>
