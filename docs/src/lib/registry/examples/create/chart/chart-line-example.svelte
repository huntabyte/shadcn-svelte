<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { LineChart } from "layerchart";
	import { scaleBand } from "d3-scale";
	import { curveMonotoneX } from "d3-shape";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const lineChartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const lineChartConfig = {
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

<Example title="Line Chart">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Line Chart - Multiple</Card.Title>
			<Card.Description>January - June 2024</Card.Description>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={lineChartConfig}>
				<LineChart
					data={lineChartData}
					x="month"
					xScale={scaleBand()}
					axis="x"
					series={[
						{
							key: "desktop",
							label: "Desktop",
							color: lineChartConfig.desktop.color,
						},
						{
							key: "mobile",
							label: "Mobile",
							color: lineChartConfig.mobile.color,
						},
					]}
					props={{
						spline: {
							curve: curveMonotoneX,
							strokeWidth: 2,
							motion: "tween",
						},
						xAxis: {
							format: (d) => d.slice(0, 3),
							tickLength: 0,
						},
						highlight: { points: false },
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip />
					{/snippet}
				</LineChart>
			</Chart.Container>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full items-start gap-2">
				<div class="grid gap-2">
					<div class="flex items-center gap-2 leading-none font-medium">
						Trending up by 5.2% this month
						<IconPlaceholder
							lucide="TrendingUpIcon"
							tabler="IconTrendingUp"
							hugeicons="ChartUpIcon"
							phosphor="TrendUpIcon"
							class="size-4"
						/>
					</div>
					<div class="text-muted-foreground flex items-center gap-2 leading-none">
						Showing total visitors for the last 6 months
					</div>
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
