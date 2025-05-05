<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, type ChartContextValue } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { cubicInOut } from "svelte/easing";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 346, mobile: 140 },
		{ month: "July", desktop: 321, mobile: 275 },
		{ month: "August", desktop: 132, mobile: 95 },
		{ month: "September", desktop: 189, mobile: 225 },
		{ month: "October", desktop: 302, mobile: 248 },
		{ month: "November", desktop: 342, mobile: 285 },
		{ month: "December", desktop: 328, mobile: 290 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "var(--chart-1)",
		},
		mobile: {
			label: "Mobile",
			color: "var(--chart-2)",
		},
	} satisfies Chart.ChartConfig;
	let context = $state<ChartContextValue>();
</script>

<Card.Root>
	<Card.Header>
		<Card.Description>January - June 2024</Card.Description>
		<Card.Title class="text-3xl font-bold tracking-tight">$45,231.89</Card.Title>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="aspect-[3/1]">
			<BarChart
				bind:context
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="month"
				rule={false}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
						props: { rounded: "bottom" },
					},
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
					},
				]}
				seriesLayout="stack"
				props={{
					bars: {
						stroke: "none",
						initialY: context?.height,
						motion: {
							type: "tween",
							duration: 500,
							easing: cubicInOut,
						},
					},
					highlight: { area: false },
					xAxis: { format: (d) => d.slice(0, 3) },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-start gap-2 text-sm">
		<div class="flex gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
