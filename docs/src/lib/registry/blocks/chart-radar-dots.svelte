<script lang="ts">
	import { LineChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveLinearClosed } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import { onMount } from "svelte";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 273 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	const maxValue = Math.max(...chartData.map((d) => d.desktop));
	let yEnd = $state(maxValue * 100);

	// Static hexagonal grid polygons — drawn in belowMarks so they don't react to yDomain changes.
	// 6 months → 6 vertices; scaleBand centers at angles [π/6, π/2, 5π/6, 7π/6, 3π/2, 11π/6]
	// (layerchart lineRadial convention: 0 = top, clockwise; band center = xScale(x) + bandwidth/2)
	// Effective radius: 250px container / 2 - 12px padding = 113px
	// d3 ticks for [0, maxValue] at count 5 → [50, 100, 150, 200, 250, 300]
	const gridAngles = Array.from({ length: 6 }, (_, i) => Math.PI / 3 + (i * Math.PI * 2) / 6);
	const gridRadius = 113;
	const gridTicks = [65, 130, 195, 260];
	const gridPolygons = gridTicks.map((tick) => {
		const r = (tick / maxValue) * gridRadius;
		return gridAngles.map((a) => `${r * Math.sin(a)},${-r * Math.cos(a)}`).join(" ");
	});

	onMount(() => {
		yEnd = maxValue;
	});
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Dots</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
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
				yDomain={[0, yEnd]}
				motion={Chart.defaultMotion}
				points={{ r: 4 }}
				padding={12}
				props={{
					spline: {
						curve: curveLinearClosed,
						fill: "var(--color-desktop)",
						fillOpacity: 0.6,
						stroke: "0",
					},
					xAxis: {
						tickLength: 0,
					},
					yAxis: {
						format: () => "",
					},
					grid: {
						y: false,
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
				{#snippet belowMarks()}
					{#each gridPolygons as points}
						<polygon
							{points}
							class="stroke-muted-foreground/20 fill-none"
							stroke-width="1"
						/>
					{/each}
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
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
