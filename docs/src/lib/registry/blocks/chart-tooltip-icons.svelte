<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import type { ChartState } from "layerchart";
	import FootprintsIcon from "@lucide/svelte/icons/footprints";
	import WavesIcon from "@lucide/svelte/icons/waves";

	const chartData = [
		{ date: "2024-07-15", running: 450, swimming: 300 },
		{ date: "2024-07-16", running: 380, swimming: 420 },
		{ date: "2024-07-17", running: 520, swimming: 120 },
		{ date: "2024-07-18", running: 140, swimming: 550 },
		{ date: "2024-07-19", running: 600, swimming: 350 },
		{ date: "2024-07-20", running: 480, swimming: 400 },
	];

	const chartConfig = {
		running: { label: "Running", color: "var(--chart-1)", icon: FootprintsIcon },
		swimming: { label: "Swimming", color: "var(--chart-2)", icon: WavesIcon },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartState>();

	$effect(() => {
		const t = setTimeout(() => {
			if (!context) return;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const xs = context.xScale as any;
			context.tooltip.x =
				xs(chartData[1].date) + (xs.bandwidth?.() ?? 0) / 2 + context.padding.left;
			context.tooltip.y = context.containerHeight / 3;
			context.tooltip.data = chartData[1];
			context.tooltip.series = [
				{
					key: "swimming",
					label: "Swimming",
					value: chartData[1].swimming,
					color: chartConfig.swimming.color,
					visible: true,
					config: {
						key: "swimming",
						label: "Swimming",
						color: chartConfig.swimming.color,
					},
				},
				{
					key: "running",
					label: "Running",
					value: chartData[1].running,
					color: chartConfig.running.color,
					visible: true,
					config: { key: "running", label: "Running", color: chartConfig.running.color },
				},
			];
		}, 650);
		return () => clearTimeout(t);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tooltip - Icons</Card.Title>
		<Card.Description>Tooltip with icons.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				bind:context
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="date"
				axis="x"
				rule={false}
				series={[
					{
						key: "running",
						label: "Running",
						color: chartConfig.running.color,
						props: { rounded: "bottom" },
					},
					{
						key: "swimming",
						label: "Swimming",
						color: chartConfig.swimming.color,
					},
				]}
				seriesLayout="stack"
				grid={false}
				highlight={false}
				props={{
					bars: {
						stroke: "none",
						motion: Chart.defaultBarMotion,
					},
					xAxis: {
						format: (d) =>
							new Date(d).toLocaleDateString("en-US", {
								weekday: "short",
							}),
						tickLabelProps: {
							svgProps: {
								y: 13,
							},
						},
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
