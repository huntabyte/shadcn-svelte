<script lang="ts">
	import { AreaChart } from "layerchart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import { PeriodType, format } from "@layerstack/utils";
	import { curveNatural } from "d3-shape";
	import { scaleUtc } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
		{ date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
		{ date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
		{ date: new Date("2024-04-01"), desktop: 73, mobile: 190 },
		{ date: new Date("2024-05-01"), desktop: 209, mobile: 130 },
		{ date: new Date("2024-06-01"), desktop: 214, mobile: 140 },
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

	let tweened = true;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Area Chart - Legend</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<AreaChart
				legend
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
					},
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
					},
				]}
				seriesLayout="stack"
				props={{
					area: {
						curve: curveNatural,
						"fill-opacity": 0.4,
						line: { class: "stroke-1" },
						tweened,
					},
					xAxis: { format: PeriodType.Month },
					yAxis: { format: () => "" },
				}}
			>
				{#snippet tooltip({ tooltipContext })}
					<Chart.Tooltip
						tooltipLabel={format(tooltipContext.data.date, PeriodType.Month, {
							variant: "long",
						})}
						config={chartConfig}
						payload={tooltipContext.data}
						indicator="line"
					/>
				{/snippet}

				<!-- TODO: Add custom legends -->
				<!-- <svelte:fragment slot="legend">where is that data 🤔?</svelte:fragment> -->
			</AreaChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					January - June 2024
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
