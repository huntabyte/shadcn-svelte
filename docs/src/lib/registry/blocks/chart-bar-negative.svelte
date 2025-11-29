<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ month: "January", visitors: 186 },
		{ month: "February", visitors: 205 },
		{ month: "March", visitors: -207 },
		{ month: "April", visitors: 173 },
		{ month: "May", visitors: -209 },
		{ month: "June", visitors: 214 },
	];

	const chartConfig = {
		visitors: { label: "Visitors" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Negative</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				labels={{
					offset: 5,
					value: (d) => d.month,
					fill: (d) => {
						if (d.visitors > 0) {
							return "var(--chart-1)";
						} else if (d.visitors < 0) {
							return "var(--chart-2)";
						}
					},
				}}
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="month"
				y="visitors"
				yNice={4}
				yBaseline={0}
				cRange={["var(--chart-1)", "var(--chart-2)"]}
				c={(d) => (d.visitors > 0 ? "var(--chart-1)" : "var(--chart-2)")}
				axis={false}
				props={{
					bars: { stroke: "none", radius: 0 },
					highlight: { area: { fill: "none" } },
					xAxis: { format: (d) => d.slice(0, 3) },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel hideIndicator nameKey="visitors" />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
