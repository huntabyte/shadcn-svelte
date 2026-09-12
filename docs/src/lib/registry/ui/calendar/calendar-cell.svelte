<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		child: childSnippet,
		children,
		...restProps
	}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell bind:ref {...restProps}>
	{#snippet child({ props, ...snippetProps })}
		{@const modifiers = props as Record<string, unknown>}
		{@const cellProps = {
			...props,
			class: cn(
				"group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected]_[data-bits-day]]:rounded-r-(--cell-radius)",
				"[&:first-child[data-selected]_[data-bits-day]]:rounded-l-(--cell-radius)",
				modifiers["data-range-start"] !== undefined &&
					"relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
				modifiers["data-range-middle"] !== undefined && "rounded-none",
				modifiers["data-range-end"] !== undefined &&
					"relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
				modifiers["data-today"] !== undefined &&
					"rounded-(--cell-radius) bg-muted text-foreground data-selected:rounded-none",
				modifiers["data-outside-month"] !== undefined &&
					"text-muted-foreground aria-selected:text-muted-foreground",
				modifiers["data-disabled"] !== undefined && "text-muted-foreground opacity-50",
				className
			),
		}}
		{#if childSnippet}
			{@render childSnippet({ props: cellProps, ...snippetProps })}
		{:else}
			<td {...cellProps}>{@render children?.(snippetProps)}</td>
		{/if}
	{/snippet}
</CalendarPrimitive.Cell>
