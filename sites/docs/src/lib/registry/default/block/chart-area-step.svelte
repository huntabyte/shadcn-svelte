<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Chart from "$lib/registry/default/ui/chart/index.js";
	import { PeriodType } from "@layerstack/utils";
	import { scaleUtc } from "d3-scale";
	import { curveStep } from "d3-shape";
	import { AreaChart, Tooltip } from "layerchart";
	import Activity from "lucide-svelte/icons/activity";
	import TrendingUp from "lucide-svelte/icons/trending-up";

	const chartData = [
		{ date: new Date("2024-01-01"), desktop: 186 },
		{ date: new Date("2024-02-01"), desktop: 305 },
		{ date: new Date("2024-03-01"), desktop: 237 },
		{ date: new Date("2024-04-01"), desktop: 73 },
		{ date: new Date("2024-05-01"), desktop: 209 },
		{ date: new Date("2024-06-01"), desktop: 214 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
			icon: Activity,
		},
	} satisfies Chart.ChartConfig;

	let tweened = true;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Area Chart - Step</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container>
			<AreaChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
					},
				]}
				seriesLayout="stack"
				props={{
					area: {
						curve: curveStep,
						"fill-opacity": 0.4,
						line: { class: "stroke-1" },
						tweened,
					},
					xAxis: { format: PeriodType.Month },
					yAxis: { format: () => "" },
				}}
			>
				<Tooltip.Root let:data variant="none" slot="tooltip">
					<Chart.Tooltip config={chartConfig} payload={data} hideLabel />
				</Tooltip.Root>
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
