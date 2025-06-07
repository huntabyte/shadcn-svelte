<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: RangeCalendarPrimitive.DayProps = $props();
</script>

<RangeCalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none",
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground min-w-(--cell-size) data-[selection-middle]:rounded-none",
		// Selection Start
		"data-[selection-start]:bg-primary dark:data-[selection-start]:hover:bg-accent data-[selection-start]:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground dark:data-[selection-start]:focus:bg-primary dark:data-[selection-start]:hover:text-foreground",
		// Selection End
		"data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground dark:data-[selection-end]:focus:bg-primary dark:data-[selection-end]:hover:bg-accent",
		// Outside months
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground",
		// Disabled
		"data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
		"dark:data-[selection-middle]:hover:bg-accent/0",
		// hover
		"dark:hover:text-accent-foreground",
		className
	)}
	{...restProps}
/>
