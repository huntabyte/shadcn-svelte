<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		child: childSnippet,
		children,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost", size: "icon" }),
		"cn-calendar-day-button relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-focused/day:relative group-data-focused/day:z-10 group-data-focused/day:border-ring group-data-focused/day:ring-[3px] group-data-focused/day:ring-ring/50 data-range-end:rounded-(--cell-radius) data-range-end:rounded-r-(--cell-radius) data-range-end:bg-primary data-range-end:text-primary-foreground data-range-middle:rounded-none data-range-middle:bg-muted data-range-middle:text-foreground data-range-start:rounded-(--cell-radius) data-range-start:rounded-l-(--cell-radius) data-range-start:bg-primary data-range-start:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70",
		// parity-ignore: Bits supports unavailable dates independently of disabled dates
		"data-unavailable:line-through",
		className
	)}
	{...restProps}
>
	{#snippet child({ props, ...snippetProps })}
		{@const modifiers = props as Record<string, unknown>}
		{@const dayProps = {
			...props,
			"data-selected-single":
				snippetProps.selected &&
				modifiers["data-range-start"] === undefined &&
				modifiers["data-range-end"] === undefined &&
				modifiers["data-range-middle"] === undefined,
		}}
		{#if childSnippet}
			{@render childSnippet({ props: dayProps, ...snippetProps })}
		{:else}
			<div {...dayProps}>
				{#if children}
					{@render children(snippetProps)}
				{:else}
					{snippetProps.day}
				{/if}
			</div>
		{/if}
	{/snippet}
</CalendarPrimitive.Day>
