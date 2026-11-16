<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart, dataCoords } from "layerchart";
	import { untrack } from "svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import type { ChartState } from "layerchart";

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

	let context = $state<ChartState>();

	$effect(() => {
		const chart = context;
		if (!chart || chart.width <= 0 || chart.height <= 0) return;

		// Match shadcn's defaultIndex={1} once the chart has measured its container.
		// Resolve the payload through LayerChart and anchor halfway down the chart, as Recharts does.
		untrack(() =>
			chart.tooltip.show({
				data: chartData[1],
				point: {
					...dataCoords(chart, chartData[1]),
					y: (chart.padding.top + chart.containerHeight) / 2,
				},
			})
		);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tooltip - Formatter</Card.Title>
		<Card.Description>Tooltip with custom formatter .</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
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
						motion: Chart.defaultBarMotion,
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
					<Chart.Tooltip hideLabel>
						{#snippet formatter({ name, value })}
							<div class="flex min-w-[130px] items-center text-xs text-muted-foreground">
								{chartConfig[name as keyof typeof chartConfig]?.label || name}
								<div
									class="ms-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums"
								>
									{value}
									<span class="font-normal text-muted-foreground"> kcal </span>
								</div>
							</div>
						{/snippet}
					</Chart.Tooltip>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
