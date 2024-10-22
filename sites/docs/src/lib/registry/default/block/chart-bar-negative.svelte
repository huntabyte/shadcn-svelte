<script lang="ts">
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Chart from "$lib/registry/default/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";

	const chartData = [
		{ month: "January", visitors: 186 },
		{ month: "February", visitors: 205 },
		{ month: "March", visitors: -207 },
		{ month: "April", visitors: 173 },
		{ month: "May", visitors: -209 },
		{ month: "June", visitors: 214 },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Negative</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container>
			<!-- TODO: How to add `month` labels to bars and give them a custom color? -->
			<BarChart
				data={chartData}
				xScale={scaleBand().padding(0.2)}
				x="month"
				series={[
					{
						key: "visitors",
						label: "month",
						// TODO: How to apply a color based on a condition? e.g. if visitors > 0, color: "hsl(var(--chart-1))", else color: "hsl(var(--chart-2))"
						color: "hsl(var(--chart-1))",
					},
				]}
				props={{
					bars: { stroke: "none", inset: 5, radius: 0 },
					highlight: { area: { fill: "none" } },
					xAxis: { format: (d) => d.slice(0, 3) },
					yAxis: { format: () => "" },
				}}
			>
				<!-- TODO: How to add `tweened` to bars? -->
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip
							config={chartConfig}
							payload={data}
							hideLabel
							hideIndicator
						/>
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
