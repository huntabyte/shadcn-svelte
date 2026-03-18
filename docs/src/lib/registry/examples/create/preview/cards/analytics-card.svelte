<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { AreaChart } from "layerchart";
	import { curveLinear } from "d3-shape";

	const chartData = [
		{ month: "Jan", visitors: 186 },
		{ month: "Feb", visitors: 305 },
		{ month: "Mar", visitors: 237 },
		{ month: "Apr", visitors: 73 },
		{ month: "May", visitors: 209 },
		{ month: "Jun", visitors: 214 },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
			color: "var(--chart-1)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="data-[size=sm]:pb-0" size="sm">
	<Card.Header>
		<Card.Title>Analytics</Card.Title>
		<Card.Description>
			418.2K Visitors <Badge>+10%</Badge>
		</Card.Description>
		<Card.Action>
			<Button variant="outline" size="sm">View Analytics</Button>
		</Card.Action>
	</Card.Header>
	<Chart.Container config={chartConfig} class="aspect-[1/0.35]">
		<AreaChart
			data={chartData}
			x="month"
			series={[
				{
					key: "visitors",
					label: "Visitors",
					color: chartConfig.visitors.color,
				},
			]}
			props={{
				area: {
					curve: curveLinear,
					"fill-opacity": 0.4,
					line: { class: "stroke-1" },
				},
				xAxis: { format: () => "" },
				yAxis: { format: () => "" },
			}}
		>
			{#snippet tooltip()}
				<Chart.Tooltip indicator="line" hideLabel />
			{/snippet}
		</AreaChart>
	</Chart.Container>
</Card.Root>
