<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { WithElementRef } from "bits-ui";
	import { useId } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		id = useId(),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();

	const uniqueId = useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
</script>

<div
	bind:this={ref}
	data-chart={chartId}
	class={cn(
		// "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
		"flex aspect-video justify-center text-xs",
		// Overrides
		//
		// TODO: Ask for default/unique classnames to target when trying to override LayerChart styles
		//
		// Stroke around dots/marks when hovering
		"[&_.grid]:stroke-border/50 [&_.stroke-white]:stroke-transparent",
		// Tick labels on th x/y axes
		"[&_.tickLabel]:fill-muted-foreground",
		// Labels
		"[&_text]:fill-foreground [&_text]:stroke-transparent",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
