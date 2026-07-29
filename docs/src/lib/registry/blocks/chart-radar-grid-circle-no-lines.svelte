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
		{ month: "April", desktop: 203 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	const maxValue = Math.max(...chartData.map((d) => d.desktop));
	let yEnd = $state(maxValue * 100);

	// Static circular grid — drawn in belowMarks so they don't react to yDomain changes.
	// Effective radius: 250px container / 2 - 12px padding = 113px
	const gridRadius = 113;
	const gridTicks = [65, 130, 195, 260];

	onMount(() => {
		yEnd = maxValue;
	});
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Grid Circle - No Lines</Card.Title>
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
				points={{ r: 4 }}
				padding={12}
				motion={Chart.defaultMotion}
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
				{#snippet belowMarks()}
					{#each gridTicks as tick (tick)}
						{@const r = (tick / maxValue) * gridRadius}
						<circle
							cx="0"
							cy="0"
							{r}
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
