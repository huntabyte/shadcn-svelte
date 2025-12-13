<script lang="ts">
	import { LineChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveLinearClosed } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 160 },
		{ month: "February", desktop: 185, mobile: 170 },
		{ month: "March", desktop: 207, mobile: 180 },
		{ month: "April", desktop: 173, mobile: 160 },
		{ month: "May", desktop: 160, mobile: 190 },
		{ month: "June", desktop: 174, mobile: 204 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radar Chart - Lines Only</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<LineChart
				radial
				data={chartData}
				x="month"
				xScale={scaleBand()}
				padding={12}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
						props: { class: "fill-none stroke-[2]" },
					},
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
						props: { class: "fill-none stroke-[2]" },
					},
				]}
				props={{
					spline: { curve: curveLinearClosed, motion: "tween" },
					grid: { radialY: "linear", x: false },
					yAxis: { format: () => "" },
					tooltip: { context: { mode: "voronoi" } },
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
