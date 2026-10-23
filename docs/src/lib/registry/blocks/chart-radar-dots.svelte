<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import { curveLinearClosed } from "d3-shape";
	import { LineChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

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

	const gridAngles = Array.from({ length: 6 }, (_, i) => Math.PI / 3 + (i * Math.PI * 2) / 6);
	const gridRadius = 113;
	const gridTicks = [65, 130, 195, 260];
	const gridPolygons = gridTicks.map((tick) => {
		const r = (tick / maxValue) * gridRadius;
		return gridAngles.map((a) => `${r * Math.sin(a)},${-r * Math.cos(a)}`).join(" ");
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
				points={{ r: 4 }}
				padding={12}
				props={{
					spline: {
						curve: curveLinearClosed,
						fill: "var(--color-desktop)",
						fillOpacity: 0.6,
						stroke: "0",
						motion: Chart.defaultMotion,
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
					{#each gridPolygons as points (points)}
						<polygon {points} class="fill-none stroke-muted-foreground/20" stroke-width="1" />
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
		<div class="flex items-center gap-2 leading-none text-muted-foreground">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
