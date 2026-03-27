<script lang="ts">
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { scaleUtc } from "d3-scale";
	import { BarChart, type ChartContextValue, Highlight } from "layerchart";
	import { defaultBarMotion } from "$lib/registry/ui/chart/easing.js";

	const chartData = [
		{ date: new Date("2024-04-01"), desktop: 222, mobile: 150 },
		{ date: new Date("2024-04-02"), desktop: 97, mobile: 180 },
		{ date: new Date("2024-04-03"), desktop: 167, mobile: 120 },
		{ date: new Date("2024-04-04"), desktop: 242, mobile: 260 },
		{ date: new Date("2024-04-05"), desktop: 373, mobile: 290 },
		{ date: new Date("2024-04-06"), desktop: 301, mobile: 340 },
		{ date: new Date("2024-04-07"), desktop: 245, mobile: 180 },
		{ date: new Date("2024-04-08"), desktop: 409, mobile: 320 },
		{ date: new Date("2024-04-09"), desktop: 59, mobile: 110 },
		{ date: new Date("2024-04-10"), desktop: 261, mobile: 190 },
		{ date: new Date("2024-04-11"), desktop: 327, mobile: 350 },
		{ date: new Date("2024-04-12"), desktop: 292, mobile: 210 },
		{ date: new Date("2024-04-13"), desktop: 342, mobile: 380 },
		{ date: new Date("2024-04-14"), desktop: 137, mobile: 220 },
		{ date: new Date("2024-04-15"), desktop: 120, mobile: 170 },
		{ date: new Date("2024-04-16"), desktop: 138, mobile: 190 },
		{ date: new Date("2024-04-17"), desktop: 446, mobile: 360 },
		{ date: new Date("2024-04-18"), desktop: 364, mobile: 410 },
		{ date: new Date("2024-04-19"), desktop: 243, mobile: 180 },
		{ date: new Date("2024-04-20"), desktop: 89, mobile: 150 },
		{ date: new Date("2024-04-21"), desktop: 137, mobile: 200 },
		{ date: new Date("2024-04-22"), desktop: 224, mobile: 170 },
		{ date: new Date("2024-04-23"), desktop: 138, mobile: 230 },
		{ date: new Date("2024-04-24"), desktop: 387, mobile: 290 },
		{ date: new Date("2024-04-25"), desktop: 215, mobile: 250 },
		{ date: new Date("2024-04-26"), desktop: 75, mobile: 130 },
		{ date: new Date("2024-04-27"), desktop: 383, mobile: 420 },
		{ date: new Date("2024-04-28"), desktop: 122, mobile: 180 },
		{ date: new Date("2024-04-29"), desktop: 315, mobile: 240 },
		{ date: new Date("2024-04-30"), desktop: 454, mobile: 380 },
	];

	const chartConfig = {
		views: { label: "Page Views", color: "" },
		desktop: { label: "Desktop", color: "var(--chart-2)" },
		mobile: { label: "Mobile", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
	let context = $state<ChartContextValue>();

	let activeChart = $state<keyof typeof chartConfig>("desktop");

	const total = $derived({
		desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
		mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
	});

	const activeSeries = $derived([
		{
			key: activeChart,
			label: chartConfig[activeChart].label,
			color: chartConfig[activeChart].color,
		},
	]);
</script>

<Card.Root class="py-0">
	<Card.Header class="flex flex-col items-stretch border-b !p-0 sm:flex-row">
		<div class="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
			<Card.Title>Bar Chart - Interactive</Card.Title>
			<Card.Description>Showing total visitors for the last 3 months</Card.Description>
		</div>
		<div class="flex">
			{#each ["desktop", "mobile"] as key (key)}
				{@const chart = key as keyof typeof chartConfig}
				<button
					data-active={activeChart === chart}
					class="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-start even:border-s sm:border-s sm:border-t-0 sm:px-8 sm:py-6"
					onclick={() => (activeChart = chart)}
				>
					<span class="text-muted-foreground text-xs">
						{chartConfig[chart].label}
					</span>
					<span class="text-lg leading-none font-bold sm:text-3xl">
						{total[key as keyof typeof total].toLocaleString()}
					</span>
				</button>
			{/each}
		</div>
	</Card.Header>
	<Card.Content class="px-2 sm:p-6">
		<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
			<BarChart
				bind:context
				data={chartData}
				x="date"
				axis="x"
				series={activeSeries}
				props={{
					bars: {
						stroke: "none",
						rounded: "none",
						// use the height of the chart to animate the bars
						initialY: context?.height,
						initialHeight: 0,
						motion: defaultBarMotion,
					},
					highlight: { area: { fill: "none" } },
					xAxis: {
						format: (d: Date) => {
							return d.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							});
						},
						ticks: (scale) => scaleUtc(scale.domain(), scale.range()).ticks(),
					},
				}}
			>
				{#snippet belowMarks()}
					<Highlight area={{ class: "fill-muted" }} />
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						nameKey="views"
						labelFormatter={(v: Date) => {
							return v.toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							});
						}}
					/>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
