<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";

	const chartData = [
		{ browser: "chrome", visitors: 187 },
		{ browser: "safari", visitors: 200 },
		{ browser: "firefox", visitors: 275 },
		{ browser: "edge", visitors: 173 },
		{ browser: "other", visitors: 90 },
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

	type Series = NonNullable<(typeof BarChart)["prototype"]["$$prop_def"]["series"]>;

	function chartConfigToSeries(config: Chart.ChartConfig): Series {
		const res = Object.keys(config).map((key) => {
			const itemConfig = config[key];
			const result: Series[number] = {
				key: "visitors",
				label: itemConfig.label,
				color: itemConfig.color,
			};
			if (key === "visitors") {
				result.props = {
					strokeWidth: 2,
					radius: 8,
					stroke: "full",
				};
			}
			return result;
		});
		console.log(res);
		return res;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Active</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container>
			<BarChart
				data={chartData}
				x="browser"
				series={chartConfigToSeries(chartConfig)}
				xScale={scaleBand().padding(0.2)}
				props={{
					bars: { stroke: "none", radius: 8 },
					xAxis: { format: (d) => chartConfig[d as keyof typeof chartConfig].label },
					highlight: { area: { fill: "none" } },
				}}
			>
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip hideLabel config={chartConfig} payload={data} />
					</Tooltip.Root>
				</svelte:fragment>
			</BarChart>
			<!-- todo -->
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
