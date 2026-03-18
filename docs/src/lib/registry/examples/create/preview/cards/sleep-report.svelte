<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";

	const sleepChartData = [
		{ hour: "10pm", deep: 0, light: 30, rem: 0 },
		{ hour: "11pm", deep: 20, light: 10, rem: 0 },
		{ hour: "12am", deep: 40, light: 0, rem: 10 },
		{ hour: "1am", deep: 30, light: 5, rem: 15 },
		{ hour: "2am", deep: 10, light: 20, rem: 30 },
		{ hour: "3am", deep: 25, light: 10, rem: 20 },
		{ hour: "4am", deep: 15, light: 25, rem: 10 },
		{ hour: "5am", deep: 5, light: 35, rem: 15 },
		{ hour: "6am", deep: 0, light: 20, rem: 25 },
	];

	const sleepChartConfig = {
		deep: {
			label: "Deep",
			color: "var(--chart-1)",
		},
		light: {
			label: "Light",
			color: "var(--chart-2)",
		},
		rem: {
			label: "REM",
			color: "var(--chart-3)",
		},
	} satisfies Chart.ChartConfig;

	const stats = [
		{ label: "Deep", value: "2h 10m" },
		{ label: "Light", value: "3h 48m" },
		{ label: "REM", value: "1h 26m" },
		{ label: "Score", value: "84" },
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Sleep Report</Card.Title>
		<Card.Description>Last night · 7h 24m</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-3">
		<Chart.Container config={sleepChartConfig} class="h-32 w-full">
			<BarChart
				data={sleepChartData}
				xScale={scaleBand().padding(0.4)}
				x="hour"
				rule={false}
				series={[
					{
						key: "deep",
						label: "Deep",
						color: sleepChartConfig.deep.color,
						props: { rounded: "none" },
					},
					{
						key: "light",
						label: "Light",
						color: sleepChartConfig.light.color,
						props: { rounded: "none" },
					},
					{
						key: "rem",
						label: "REM",
						color: sleepChartConfig.rem.color,
						props: { rounded: "top" },
					},
				]}
				seriesLayout="stack"
				props={{
					bars: { stroke: "none" },
				}}
				axis={false}
				tooltip={false}
			/>
		</Chart.Container>
		<div class="grid grid-cols-4 gap-2">
			{#each stats as { label, value } (label)}
				<div class="text-center">
					<div class="text-sm font-medium tabular-nums">{value}</div>
					<div class="text-muted-foreground text-xs">{label}</div>
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<Badge variant="outline">Good</Badge>
		<Button variant="outline" size="sm" class="ml-auto">Details</Button>
	</Card.Footer>
</Card.Root>
