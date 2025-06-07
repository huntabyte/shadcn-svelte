<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { Calendar as CalendarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"size-(--cell-size) flex select-none flex-col gap-1 p-0 font-normal",
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
		// Selected
		"data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary data-selected:hover:text-primary-foreground data-selected:focus:bg-primary data-selected:focus:text-primary-foreground data-selected:opacity-100 dark:data-selected:hover:bg-primary dark:data-selected:focus:bg-primary",
		// Disabled
		"data-disabled:text-muted-foreground data-disabled:opacity-50",
		// Unavailable
		"data-unavailable:text-muted-foreground data-unavailable:line-through data-unavailable:opacity-50",
		// Outside months
		"data-[outside-month]:text-muted-foreground [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-50",
		className
	)}
	{...restProps}
/>
