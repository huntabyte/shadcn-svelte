<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";
	import ChartStyle from "./chart-style.svelte";
	import { setChartContext, type ChartConfig } from "./chart-utils.js";

	const uid = $props.id();

	let {
		ref = $bindable(null),
		id = uid,
		class: className,
		children,
		config,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		config: ChartConfig;
	} = $props();

	const chartId = `chart-${id || uid.replace(/:/g, "")}`;

	setChartContext({
		get config() {
			return config;
		},
	});
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
		"[&_.stroke-white]:stroke-transparent",
		"[&_[data-lc-line]]:stroke-border/50",
		"[&_[data-lc-highlight-line]]:stroke-0",
		// Tick labels on th x/y axes
		"[&_[data-lc-axis-tick-label]]:fill-muted-foreground",
		// Labels
		"[&_text]:fill-foreground [&_text]:stroke-transparent",
		className
	)}
	{...restProps}
>
	<ChartStyle id={chartId} {config} />
	{@render children?.()}
</div>
