<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, type ChartContextValue } from "layerchart";
	import { ease } from "$lib/registry/ui/chart/easing.js";
	import { onMount } from "svelte";

	const chartData = [
		{ date: "2024-07-15", running: 450, swimming: 300 },
		{ date: "2024-07-16", running: 380, swimming: 420 },
		{ date: "2024-07-17", running: 520, swimming: 120 },
		{ date: "2024-07-18", running: 140, swimming: 550 },
		{ date: "2024-07-19", running: 600, swimming: 350 },
		{ date: "2024-07-20", running: 480, swimming: 400 },
	];

	const chartConfig = {
		running: { label: "Running", color: "var(--chart-1)" },
		swimming: { label: "Swimming", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartContextValue>();
	let containerRef = $state<HTMLDivElement | null>(null);

	onMount(() => {
		setTimeout(() => {
			if (!containerRef) return;
			const rects = containerRef.querySelectorAll(".lc-tooltip-rect");
			const target = rects[1];
			if (target) {
				const bounds = target.getBoundingClientRect();
				target.dispatchEvent(
					new PointerEvent("pointerenter", {
						clientX: bounds.left + bounds.width / 2,
						clientY: bounds.top + bounds.height / 2,
						bubbles: true,
					})
				);
			}
		}, 1600);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tooltip - Line Indicator</Card.Title>
		<Card.Description>Tooltip with line indicator.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container bind:ref={containerRef} config={chartConfig}>
			<BarChart
				bind:context
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="date"
				axis="x"
				rule={false}
				series={[
					{
						key: "running",
						label: "Running",
						color: chartConfig.running.color,
						props: { rounded: "bottom" },
					},
					{
						key: "swimming",
						label: "Swimming",
						color: chartConfig.swimming.color,
					},
				]}
				seriesLayout="stack"
				grid={false}
				highlight={false}
				props={{
					bars: {
						stroke: "none",
						initialY: context?.height ?? 400,
						initialHeight: 0,
						motion: {
							x: { type: "tween", duration: 1500, easing: ease },
							width: { type: "tween", duration: 1500, easing: ease },
							y: { type: "tween", duration: 1500, easing: ease },
							height: { type: "tween", duration: 1500, easing: ease },
						},
					},
					xAxis: {
						format: (d) =>
							new Date(d).toLocaleDateString("en-US", {
								weekday: "short",
							}),
						tickLabelProps: {
							svgProps: {
								y: 13,
							},
						},
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="line" />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
