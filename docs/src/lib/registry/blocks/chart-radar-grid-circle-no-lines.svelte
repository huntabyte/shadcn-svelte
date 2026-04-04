<script lang="ts">
	import { LineChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveLinearClosed } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 203 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Grid Circle - No Lines</Card.Title>
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
					},
				]}
				radial
				x="month"
				xScale={scaleBand()}
				points={{ r: 4 }}
				padding={12}
				props={{
					spline: {
						curve: curveLinearClosed,
						fill: "var(--color-desktop)",
						fillOpacity: 0.6,
						stroke: "0",
						motion: "tween",
					},
					xAxis: {
						tickLength: 0,
					},
					yAxis: {
						format: () => "",
					},
					grid: {
						radialY: "circle",
						x: false,
					},
					tooltip: {
						context: {
							mode: "voronoi",
						},
					},
					highlight: {
						lines: false,
						points: false,
					},
				}}
			>
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
