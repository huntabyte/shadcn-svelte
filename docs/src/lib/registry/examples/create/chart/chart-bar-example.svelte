<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const barChartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const barChartConfig = {
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

<Example title="Bar Chart">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Bar Chart - Multiple</Card.Title>
			<Card.Description>January - June 2024</Card.Description>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={barChartConfig}>
				<BarChart
					data={barChartData}
					xScale={scaleBand().padding(0.25)}
					x="month"
					axis="x"
					series={[
						{
							key: "desktop",
							label: "Desktop",
							color: barChartConfig.desktop.color,
						},
						{
							key: "mobile",
							label: "Mobile",
							color: barChartConfig.mobile.color,
						},
					]}
					x1Scale={scaleBand().paddingInner(0.2)}
					seriesLayout="group"
					rule={false}
					props={{
						bars: {
							stroke: "none",
							rounded: "all",
						},
						xAxis: {
							format: (d) => d.slice(0, 3),
							tickLength: 0,
						},
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip indicator="dashed" />
					{/snippet}
				</BarChart>
			</Chart.Container>
		</Card.Content>
		<Card.Footer class="flex-col items-start gap-2">
			<div class="flex gap-2 leading-none font-medium">
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
			<div class="text-muted-foreground leading-none">
				Showing total visitors for the last 6 months
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
