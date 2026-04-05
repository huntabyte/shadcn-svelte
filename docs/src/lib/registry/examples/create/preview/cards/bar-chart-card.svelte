<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";

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

	const desktopTotal = barChartData.reduce((sum, item) => sum + item.desktop, 0);
	const mobileTotal = barChartData.reduce((sum, item) => sum + item.mobile, 0);
	const desktopDelta = Math.round(((desktopTotal - mobileTotal) / mobileTotal) * 100);
	const desktopDeltaPrefix = desktopDelta > 0 ? "+" : "";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Traffic Channels</Card.Title>
		<Card.Description>Desktop vs mobile over the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="pt-0">
		<Chart.Container
			config={barChartConfig}
			class="max-h-[180px] w-full [&_.lc-legend-swatch-group]:py-4"
		>
			<BarChart
				data={barChartData}
				xScale={scaleBand().padding(0.25)}
				x="month"
				axis="x"
				x1Scale={scaleBand().paddingInner(0.2)}
				seriesLayout="group"
				legend
				rule={false}
				props={{
					bars: {
						stroke: "none",
						rounded: "all",
					},
					xAxis: {
						format: (d: string) => d.slice(0, 3),
						tickLength: 0,
					},
				}}
				series={[
					{
						key: "desktop",
						label: barChartConfig.desktop.label,
						color: barChartConfig.desktop.color,
					},
					{
						key: "mobile",
						label: barChartConfig.mobile.label,
						color: barChartConfig.mobile.color,
					},
				]}
			>
				{#snippet tooltip()}
					<Chart.Tooltip indicator="dashed" />
				{/snippet}
			</BarChart>
		</Chart.Container>
		<div class="divide-border/60 grid w-full grid-cols-3 divide-x">
			<div class="px-2 text-center">
				<div class="text-muted-foreground text-[0.65rem] uppercase">Desktop</div>
				<div class="text-sm font-medium tabular-nums">
					{desktopTotal.toLocaleString()}
				</div>
			</div>
			<div class="px-2 text-center">
				<div class="text-muted-foreground text-[0.65rem] uppercase">Mobile</div>
				<div class="text-sm font-medium tabular-nums">
					{mobileTotal.toLocaleString()}
				</div>
			</div>
			<div class="px-2 text-center">
				<div class="text-muted-foreground text-[0.65rem] uppercase">Mix Delta</div>
				<div class="text-sm font-medium tabular-nums">
					{desktopDeltaPrefix}
					{desktopDelta}%
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">View report</Button>
	</Card.Footer>
</Card.Root>
