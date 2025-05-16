<script lang="ts">
	import { BarChart, LineChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { curveNatural } from "d3-shape";
	import { scaleBand } from "d3-scale";

	const data = [
		{
			revenue: 10400,
			subscription: 240,
		},
		{
			revenue: 14405,
			subscription: 300,
		},
		{
			revenue: 9400,
			subscription: 200,
		},
		{
			revenue: 8200,
			subscription: 278,
		},
		{
			revenue: 7000,
			subscription: 189,
		},
		{
			revenue: 9600,
			subscription: 239,
		},
		{
			revenue: 11244,
			subscription: 278,
		},
		{
			revenue: 26475,
			subscription: 189,
		},
	];

	const chartConfig = {
		revenue: {
			label: "Revenue",
			color: "var(--primary)",
		},
		subscription: {
			label: "Subscriptions",
			color: "var(--primary)",
		},
	} satisfies Chart.ChartConfig;
</script>

<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
	<Card.Root class="gap-2">
		<Card.Header class="flex flex-row items-center justify-between space-y-0">
			<Card.Title class="text-sm font-normal">Total Revenue</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">$15,231.89</div>
			<p class="text-muted-foreground text-xs">+20.1% from last month</p>
			<Chart.Container config={chartConfig} class="mt-4 h-[80px] w-full">
				<LineChart
					axis={false}
					data={data.map((d, i) => ({ ...d, index: i }))}
					x="index"
					y="revenue"
					points={true}
					grid={false}
					tooltip={false}
					highlight={false}
					props={{
						spline: {
							curve: curveNatural,
							strokeWidth: 2,
							stroke: "var(--color-revenue)",
						},
						points: {
							r: 4,
						},
					}}
				/>
			</Chart.Container>
		</Card.Content>
	</Card.Root>
	<Card.Root class="gap-2">
		<Card.Header class="flex flex-row items-center justify-between space-y-0">
			<Card.Title class="text-sm font-normal">Subscriptions</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">+2350</div>
			<p class="text-muted-foreground text-xs">+180.1% from last month</p>
			<Chart.Container config={chartConfig} class="mt-4 h-[80px] w-full">
				<BarChart
					data={data.map((d, i) => ({ ...d, index: i }))}
					x="index"
					xScale={scaleBand().padding(0.25)}
					y="subscription"
					axis={false}
					tooltip={false}
					props={{
						bars: {
							stroke: "none",
							rounded: "all",
						},
					}}
				/>
				<!-- <Bar dataKey="subscription" fill="var(--color-subscription)" radius={4} /> -->
				<!-- </BarChart> -->
			</Chart.Container>
		</Card.Content>
	</Card.Root>
</div>
