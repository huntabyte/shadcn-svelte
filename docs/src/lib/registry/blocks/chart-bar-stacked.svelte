<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, Highlight, type ChartContextValue } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { cubicInOut } from "svelte/easing";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartContextValue>();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Stacked + Legend</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				bind:context
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="month"
				axis="x"
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
						initialHeight: 0,
						motion: {
							y: { type: "tween", duration: 500, easing: cubicInOut },
							height: { type: "tween", duration: 500, easing: cubicInOut },
						},
					},
					highlight: { area: false },
					xAxis: { format: (d) => d.slice(0, 3) },
				}}
				legend
			>
				{#snippet belowMarks()}
					<Highlight area={{ class: "fill-muted" }} />
				{/snippet}

				{#snippet tooltip()}
					<Chart.Tooltip />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
