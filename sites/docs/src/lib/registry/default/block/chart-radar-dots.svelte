<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Chart from "$lib/registry/default/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { curveLinearClosed } from "d3-shape";
	import { LineChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";

	const chartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 273 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
	} satisfies Chart.ChartConfig;

	let tweened = true;
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Dots</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container class="mx-auto aspect-square max-h-[250px]">
			<!-- TODO: In shadcn/recharts, they call these kind of charts, `Dots` probably because it's easier to match name + prop. Whereas for us, the prop is called `points`. I wonder if it's better to change chart titles to be more descriptive? -->
			<LineChart
				radial
				points
				data={chartData}
				x="month"
				xScale={scaleBand()}
				tooltip={{ mode: "voronoi" }}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
						props: {
							// TODO: How to dynamically set the fill color? e.g. `fill-[${chartConfig.desktop.color}]/60` or is this a tailwindcss limitation?
							class: "fill-[hsl(var(--chart-1))]/60 stroke-0",
						},
					},
				]}
				props={{
					// TODO: How to draw hexagons instead of circles?
					spline: { curve: curveLinearClosed, tweened },
					yAxis: { format: () => "" },
				}}
			>
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip
							tooltipLabel={data.month}
							config={chartConfig}
							payload={data}
						/>
					</Tooltip.Root>
				</svelte:fragment>
			</LineChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground flex items-center gap-2 leading-none">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
