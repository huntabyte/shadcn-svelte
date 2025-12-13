<script lang="ts">
	import { Axis, LineChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveLinearClosed } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Radius Axis</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<LineChart
				data={chartData}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
						props: {
							fill: chartConfig.desktop.color,
							fillOpacity: 0.6,
						},
					},
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
						props: {
							fill: chartConfig.mobile.color,
						},
					},
				]}
				radial
				x="month"
				y="desktop"
				xScale={scaleBand()}
				padding={12}
				props={{
					spline: {
						curve: curveLinearClosed,
						stroke: "0",
						motion: "tween",
					},
					xAxis: {
						placement: "angle",
						format: () => "",
					},
					yAxis: {
						format: "metric",

						tickLabelProps: {
							class: "fill-background!",
						},
					},
					grid: {
						yTicks: 6,
						radialY: "linear",
					},
					tooltip: {
						context: {
							mode: "voronoi",
						},
					},
					highlight: {
						lines: false,
						points: { r: 4 },
					},
				}}
			>
				{#snippet axis({ getAxisProps })}
					<Axis {...getAxisProps("x")} />
					<Axis {...getAxisProps("y")} />
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 leading-none font-medium">
			Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
		</div>
		<div class="text-muted-foreground flex items-center gap-2 leading-none">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
