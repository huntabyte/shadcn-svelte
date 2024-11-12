<script lang="ts">
	import { BarChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, color: "hsl(var(--chart-1))" },
		{ browser: "safari", visitors: 200, color: "hsl(var(--chart-2))" },
		{ browser: "firefox", visitors: 187, color: "hsl(var(--chart-3))" },
		{ browser: "edge", visitors: 173, color: "hsl(var(--chart-4))" },
		{ browser: "other", visitors: 90, color: "hsl(var(--chart-5))" },
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

	const cDomain = Object.keys(chartConfig);
	const cRange = cDomain
		.map((key) => {
			const item = chartConfig[key as keyof typeof chartConfig];
			if ("color" in item) return item.color;
			return " ";
		})
		.filter((v): v is string => Boolean(v));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Mixed</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container class="[&_.tickLabel]:ml-4">
			<BarChart
				data={chartData}
				orientation="horizontal"
				yScale={scaleBand().padding(0.2)}
				y="browser"
				c="browser"
				x="visitors"
				{cDomain}
				{cRange}
				padding={{ left: 20 }}
				props={{
					bars: { stroke: "none", radius: 5 },
					highlight: { area: { fill: "none" } },
					xAxis: { format: () => "", grid: false },
					yAxis: { format: (d) => getAxisTickLabel(d), classes: { label: "pl-4" } },
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
