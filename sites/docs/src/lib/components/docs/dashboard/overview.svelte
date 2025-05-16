<script lang="ts">
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	const data = [
		{
			name: "Jan",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Feb",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Mar",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Apr",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "May",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Jun",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Jul",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Aug",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Sep",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Oct",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Nov",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
		{
			name: "Dec",
			total: Math.floor(Math.random() * 5000) + 1000,
		},
	];

	const chartConfig = {
		total: {
			label: "Total",
			color: "var(--primary)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="h-[300px] w-full">
	<BarChart
		data={data.map((d, i) => ({ ...d, index: i }))}
		xScale={scaleBand().padding(0.21)}
		x="name"
		y="total"
		tooltip={false}
		grid={false}
		padding={{ left: 40 }}
		props={{
			yAxis: {
				format: (v) =>
					// remove decimals from end
					new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
						minimumFractionDigits: 0,
					}).format(v),
			},
		}}
	/>
</Chart.Container>
