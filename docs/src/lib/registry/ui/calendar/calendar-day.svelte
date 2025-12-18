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
		"cn-calendar-day-button flex size-(--cell-size) flex-col items-center justify-center gap-1 p-0 leading-none font-normal whitespace-nowrap select-none",
		"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
		"data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground",
		"data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
		"data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
		"[&[data-today]:not([data-selected])]:bg-muted [&[data-today]:not([data-selected])]:text-foreground [&[data-today][data-disabled]]:text-muted-foreground",
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
		"data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
		"dark:hover:text-foreground",
		"group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
		"data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius)",
		"data-[range-middle=true]:rounded-none",
		"data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius)",
		"[&>span]:text-xs [&>span]:opacity-70",
		className
	)}
	{...restProps}
/>
