<script lang="ts">
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { scaleUtc } from "d3-scale";
	import { LineChart, Spline, ChartClipPath } from "layerchart";
	import type { HTMLAttributes } from "svelte/elements";

	let { ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const rawData = [
		{ date: "2025-10-01", views: 2600, unique: 1600 },
		{ date: "2025-10-04", views: 4500, unique: 3000 },
		{ date: "2025-10-08", views: 3500, unique: 2500 },
		{ date: "2025-10-10", views: 6400, unique: 4500 },
		{ date: "2025-10-13", views: 5400, unique: 4000 },
		{ date: "2025-10-15", views: 8300, unique: 6500 },
		{ date: "2025-10-17", views: 7400, unique: 6000 },
		{ date: "2025-10-18", views: 9240, unique: 7105 },
		{ date: "2025-10-22", views: 7700, unique: 6400 },
		{ date: "2025-10-26", views: 8800, unique: 7000 },
		{ date: "2025-10-29", views: 9800, unique: 8400 },
	];

	const trafficData = rawData.map((d) => ({
		...d,
		date: new Date(`${d.date}T00:00:00Z`),
	}));

	const xAxisFormatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});

	function formatYAxis(value: number) {
		if (value === 0) return "0";
		return `${value / 1000}k`;
	}

	const chartConfig = {
		views: {
			label: "Views",
			theme: {
				light: "var(--chart-5)",
				dark: "var(--chart-1)",
			},
		},
		unique: {
			label: "Unique",
			theme: {
				light: "var(--chart-1)",
				dark: "var(--chart-2)",
			},
		},
	} satisfies Chart.ChartConfig;

	const series = [
		{
			key: "views",
			label: chartConfig.views.label,
			color: "var(--color-views)",
			props: { strokeWidth: 2.2 },
		},
		{
			key: "unique",
			label: chartConfig.unique.label,
			color: "var(--color-unique)",
			props: { strokeWidth: 2, strokeDasharray: "4 6" },
		},
	];
</script>

<Card.Root {...restProps}>
	<Card.Header>
		<Card.Title class="text-2xl">Traffic Overview</Card.Title>
		<Card.Description>
			Traffic for the last 30 days has increased by 12.4% compared to the previous period.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="h-82 w-full">
			<LineChart
				data={trafficData}
				x="date"
				xScale={scaleUtc()}
				axis="x"
				{series}
				props={{
					xAxis: {
						format: (v: Date) => xAxisFormatter.format(v),
					},
					yAxis: {
						format: formatYAxis,
					},
				}}
			>
				{#snippet marks({ context })}
					<ChartClipPath>
						{#each context.series.visibleSeries as s (s.key)}
							<Spline seriesKey={s.key} {...s.props} />
						{/each}
					</ChartClipPath>
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
