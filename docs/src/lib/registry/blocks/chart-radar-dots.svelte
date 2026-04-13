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

	// With padding={12} and a 250px container:
	// effective radius ≈ 125 - 12 = 113px
	// yDomain at rest: [0, 305] (maxValue)
	// d3 ticks for [0, 305] at count 5 → [50, 100, 150, 200, 250, 300]
	// circle radii = tick/305 * 113
	const gridRadii = [19, 37, 56, 74, 93, 111];

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
					{#each gridRadii as r}
						<circle cx="0" cy="0" {r} class="fill-none stroke-muted-foreground/20" stroke-width="1" />
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
