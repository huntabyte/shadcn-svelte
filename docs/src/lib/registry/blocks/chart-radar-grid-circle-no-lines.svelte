<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import { curveLinearClosed } from "d3-shape";
	import { Circle, LineChart, Points, Spline } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

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
	const radarScale = Chart.createRevealAnimation();
</script>

<Card.Root>
	<Card.Header class="items-center pb-4">
		<Card.Title>Radar Chart - Grid Circle - No Lines</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="pb-0">
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
				padding={12}
				props={{
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
							radius: 250,
						},
					},
					highlight: {
						lines: false,
						points: false,
					},
				}}
			>
				{#snippet marks({ context })}
					{#each context.series.visibleSeries as series (series.key)}
						<g transform={`scale(${radarScale.current})`}>
							<Spline
								seriesKey={series.key}
								curve={curveLinearClosed}
								fill={series.color}
								fillOpacity={0.6}
								stroke="none"
							/>
						</g>
						<Points seriesKey={series.key}>
							{#snippet children({ points })}
								{#each points as point, i (i)}
									<Circle
										cx={point.x * radarScale.current}
										cy={point.y * radarScale.current}
										r={4}
										fill={series.color}
										class="lc-point"
									/>
								{/each}
							{/snippet}
						</Points>
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
			Trending up by 5.2% this month <TrendingUpIcon class="h-4 w-4" />
		</div>
		<div class="flex items-center gap-2 leading-none text-muted-foreground">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
