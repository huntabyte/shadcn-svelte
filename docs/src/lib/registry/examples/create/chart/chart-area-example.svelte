<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { AreaChart } from "layerchart";
	import { curveNatural } from "d3-shape";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const areaChartData = [
		{ month: "January", desktop: 186 },
		{ month: "February", desktop: 305 },
		{ month: "March", desktop: 237 },
		{ month: "April", desktop: 73 },
		{ month: "May", desktop: 209 },
		{ month: "June", desktop: 214 },
	];

	const areaChartConfig = {
		desktop: {
			label: "Desktop",
			color: "var(--chart-1)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Example title="Area Chart">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Area Chart</Card.Title>
			<Card.Description>Showing total visitors for the last 6 months</Card.Description>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={areaChartConfig}>
				<AreaChart
					data={areaChartData}
					x="month"
					xScale={scaleBand()}
					axis="x"
					series={[
						{
							key: "desktop",
							label: "Desktop",
							color: areaChartConfig.desktop.color,
						},
					]}
					props={{
						area: {
							curve: curveNatural,
							"fill-opacity": 0.4,
							motion: "tween",
						},
						xAxis: {
							format: (d) => d.slice(0, 3),
							tickLength: 0,
						},
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip indicator="line" />
					{/snippet}
				</AreaChart>
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
						January - June 2024
					</div>
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
