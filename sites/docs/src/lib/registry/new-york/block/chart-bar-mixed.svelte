<script lang="ts">
	import { BarChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
		{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
		{ browser: "other", visitors: 90, fill: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		chrome: {
			label: "Chrome",
			color: "hsl(var(--chart-1))",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
		firefox: {
			label: "Firefox",
			color: "hsl(var(--chart-3))",
		},
		edge: {
			label: "Edge",
			color: "hsl(var(--chart-4))",
		},
		other: {
			label: "Other",
			color: "hsl(var(--chart-5))",
		},
	} satisfies Chart.ChartConfig;

	function getAxisTickLabel(d: string) {
		return chartConfig[d as keyof typeof chartConfig]?.label;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Mixed</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container>
			<BarChart
				data={chartData}
				orientation="horizontal"
				seriesLayout="group"
				yScale={scaleBand().padding(0.2)}
				y="browser"
				series={[
					{ key: "chrome", label: "Chrome", color: chartConfig.chrome.color },
					{ key: "safari", label: "Safari", color: chartConfig.safari.color },
					{ key: "firefox", label: "Firefox", color: chartConfig.firefox.color },
					{ key: "edge", label: "Edge", color: chartConfig.edge.color },
					{ key: "other", label: "Other", color: chartConfig.other.color },
				]}
				padding={{ left: 20 }}
				props={{
					bars: { stroke: "none", radius: 5 },
					highlight: { area: { fill: "none" } },
					xAxis: { format: () => "", grid: false },
					yAxis: { format: (d) => getAxisTickLabel(d) },
				}}
			>
				<!-- TODO: How to add `tweened` to bars? -->
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip hideLabel config={chartConfig} payload={data} />
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
