<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
		mobile: {
			label: "Mobile",
			color: "hsl(var(--chart-2))",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Stacked + Legend</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container>
			<BarChart
				data={chartData}
				xScale={scaleBand().padding(0.2)}
				x="month"
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
					},
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
						// TODO: How to specify radii for different corners. e.g radius: [4, 4, 0, 0], or better yet, class: "rounded-t-none"
						props: { class: "rounded-b-none z-20" },
					},
				]}
				seriesLayout="stack"
				props={{
					bars: { stroke: "none", inset: 5 },
					// TODO: How to take this fill to the behind the actual bars?

					highlight: { area: { class: "fill-muted/25 z-0" } },
					xAxis: { format: (d) => d.slice(0, 3) },
					yAxis: { format: () => "" },
				}}
			>
				<!-- TODO: How to add `tweened` to bars? -->
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip
							tooltipLabel={data.month}
							config={chartConfig}
							payload={data}
							indicator="dashed"
						/>
					</Tooltip.Root>
				</svelte:fragment>
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
