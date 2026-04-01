<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";

	const chartData = [
		{ hour: "6a", usage: 1.2 },
		{ hour: "8a", usage: 2.8 },
		{ hour: "10a", usage: 3.1 },
		{ hour: "12p", usage: 2.4 },
		{ hour: "2p", usage: 3.4 },
		{ hour: "4p", usage: 2.9 },
		{ hour: "6p", usage: 3.8 },
		{ hour: "8p", usage: 3.2 },
	];

	const chartConfig = {
		usage: { label: "Usage (kW)", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Power Usage</Card.Title>
		<Card.Description>Whole Home</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Chart.Container config={chartConfig} class="h-[140px] w-full">
			<BarChart
				data={chartData}
				x="hour"
				xScale={scaleBand().padding(0.2)}
				axis="x"
				rule={false}
				series={[
					{
						key: "usage",
						label: chartConfig.usage.label,
						color: chartConfig.usage.color,
					},
				]}
				props={{
					bars: { rounded: "top" },
					xAxis: { tickLength: 0, class: "text-xs" },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</BarChart>
		</Chart.Container>
		<Separator />
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-0.5">
				<span class="text-muted-foreground text-sm">Currently Using</span>
				<span class="text-lg font-semibold tabular-nums">3.4 kW</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="text-muted-foreground text-sm">Solar Gen</span>
				<span class="text-chart-1 text-lg font-semibold tabular-nums">+1.2 kW</span>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex-col items-start gap-1">
		<span class="text-muted-foreground text-sm">Battery Level</span>
		<div class="flex w-full items-center gap-2">
			<Progress value={85} class="flex-1" />
			<span class="text-sm font-medium tabular-nums">85%</span>
		</div>
	</Card.Footer>
</Card.Root>
