<script lang="ts">
	import { BarChart } from "layerchart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { cubicInOut } from "svelte/easing";

	const chartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 73 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Horizontal</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				data={chartData}
				orientation="horizontal"
				yScale={scaleBand().padding(0.25)}
				y="month"
				series={[{ key: "desktop", label: "Desktop", color: chartConfig.desktop.color }]}
				padding={{ left: 20 }}
				grid={false}
				rule={false}
				props={{
					bars: {
						stroke: "none",
						radius: 5,
						insets: {
							left: 12,
						},
						rounded: "all",
						initialWidth: 0,
						initialX: 0,
						tweened: {
							x: { duration: 500, easing: cubicInOut },
							width: { duration: 500, easing: cubicInOut },
						},
					},
					highlight: { area: { fill: "none" } },
					xAxis: { format: () => "", ticks: 0 },
					yAxis: { format: (d) => d.slice(0, 3) },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
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
