<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { LineChart } from "layerchart";
	import { curveLinearClosed } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const radarChartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const radarChartConfig = {
		desktop: {
			label: "Desktop",
			color: "var(--chart-1)",
		},
		mobile: {
			label: "Mobile",
			color: "var(--chart-2)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Example title="Radar Chart">
	<Card.Root class="w-full">
		<Card.Header class="items-center pb-4">
			<Card.Title>Radar Chart - Multiple</Card.Title>
			<Card.Description>Showing total visitors for the last 6 months</Card.Description>
		</Card.Header>
		<Card.Content class="pb-0">
			<Chart.Container config={radarChartConfig} class="mx-auto aspect-square max-h-[250px]">
				<LineChart
					data={radarChartData}
					series={[
						{
							key: "desktop",
							label: "Desktop",
							color: radarChartConfig.desktop.color,
							props: {
								fill: radarChartConfig.desktop.color,
								fillOpacity: 0.6,
							},
						},
						{
							key: "mobile",
							label: "Mobile",
							color: radarChartConfig.mobile.color,
							props: {
								fill: radarChartConfig.mobile.color,
							},
						},
					]}
					radial
					x="month"
					xScale={scaleBand()}
					padding={12}
					props={{
						spline: {
							curve: curveLinearClosed,
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
							radialY: "linear",
						},
						tooltip: {
							context: {
								mode: "voronoi",
							},
						},
						highlight: {
							lines: false,
							points: { r: 4 },
						},
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip indicator="line" />
					{/snippet}
				</LineChart>
			</Chart.Container>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<div class="flex items-center gap-2 leading-none font-medium">
				Trending up by 5.2% this month
				<IconPlaceholder
					lucide="TrendingUpIcon"
					tabler="IconTrendingUp"
					hugeicons="ChartUpIcon"
					phosphor="TrendUpIcon"
					remixicon="RiLineChartLine"
					class="size-4"
				/>
			</div>
			<div class="text-muted-foreground flex items-center gap-2 leading-none">
				January - June 2024
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
