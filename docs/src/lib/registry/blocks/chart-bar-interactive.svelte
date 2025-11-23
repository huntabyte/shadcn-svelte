<script lang="ts">
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { scaleUtc } from "d3-scale";
	import { BarChart, type ChartContextValue, Highlight } from "layerchart";
	import { cubicInOut } from "svelte/easing";

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
		{ date: new Date("2024-05-01"), desktop: 165, mobile: 220 },
		{ date: new Date("2024-05-02"), desktop: 293, mobile: 310 },
		{ date: new Date("2024-05-03"), desktop: 247, mobile: 190 },
		{ date: new Date("2024-05-04"), desktop: 385, mobile: 420 },
		{ date: new Date("2024-05-05"), desktop: 481, mobile: 390 },
		{ date: new Date("2024-05-06"), desktop: 498, mobile: 520 },
		{ date: new Date("2024-05-07"), desktop: 388, mobile: 300 },
		{ date: new Date("2024-05-08"), desktop: 149, mobile: 210 },
		{ date: new Date("2024-05-09"), desktop: 227, mobile: 180 },
		{ date: new Date("2024-05-10"), desktop: 293, mobile: 330 },
		{ date: new Date("2024-05-11"), desktop: 335, mobile: 270 },
		{ date: new Date("2024-05-12"), desktop: 197, mobile: 240 },
		{ date: new Date("2024-05-13"), desktop: 197, mobile: 160 },
		{ date: new Date("2024-05-14"), desktop: 448, mobile: 490 },
		{ date: new Date("2024-05-15"), desktop: 473, mobile: 380 },
		{ date: new Date("2024-05-16"), desktop: 338, mobile: 400 },
		{ date: new Date("2024-05-17"), desktop: 499, mobile: 420 },
		{ date: new Date("2024-05-18"), desktop: 315, mobile: 350 },
		{ date: new Date("2024-05-19"), desktop: 235, mobile: 180 },
		{ date: new Date("2024-05-20"), desktop: 177, mobile: 230 },
		{ date: new Date("2024-05-21"), desktop: 82, mobile: 140 },
		{ date: new Date("2024-05-22"), desktop: 81, mobile: 120 },
		{ date: new Date("2024-05-23"), desktop: 252, mobile: 290 },
		{ date: new Date("2024-05-24"), desktop: 294, mobile: 220 },
		{ date: new Date("2024-05-25"), desktop: 201, mobile: 250 },
		{ date: new Date("2024-05-26"), desktop: 213, mobile: 170 },
		{ date: new Date("2024-05-27"), desktop: 420, mobile: 460 },
		{ date: new Date("2024-05-28"), desktop: 233, mobile: 190 },
		{ date: new Date("2024-05-29"), desktop: 78, mobile: 130 },
		{ date: new Date("2024-05-30"), desktop: 340, mobile: 280 },
		{ date: new Date("2024-05-31"), desktop: 178, mobile: 230 },
		{ date: new Date("2024-06-01"), desktop: 178, mobile: 200 },
		{ date: new Date("2024-06-02"), desktop: 470, mobile: 410 },
		{ date: new Date("2024-06-03"), desktop: 103, mobile: 160 },
		{ date: new Date("2024-06-04"), desktop: 439, mobile: 380 },
		{ date: new Date("2024-06-05"), desktop: 88, mobile: 140 },
		{ date: new Date("2024-06-06"), desktop: 294, mobile: 250 },
		{ date: new Date("2024-06-07"), desktop: 323, mobile: 370 },
		{ date: new Date("2024-06-08"), desktop: 385, mobile: 320 },
		{ date: new Date("2024-06-09"), desktop: 438, mobile: 480 },
		{ date: new Date("2024-06-10"), desktop: 155, mobile: 200 },
		{ date: new Date("2024-06-11"), desktop: 92, mobile: 150 },
		{ date: new Date("2024-06-12"), desktop: 492, mobile: 420 },
		{ date: new Date("2024-06-13"), desktop: 81, mobile: 130 },
		{ date: new Date("2024-06-14"), desktop: 426, mobile: 380 },
		{ date: new Date("2024-06-15"), desktop: 307, mobile: 350 },
		{ date: new Date("2024-06-16"), desktop: 371, mobile: 310 },
		{ date: new Date("2024-06-17"), desktop: 475, mobile: 520 },
		{ date: new Date("2024-06-18"), desktop: 107, mobile: 170 },
		{ date: new Date("2024-06-19"), desktop: 341, mobile: 290 },
		{ date: new Date("2024-06-20"), desktop: 408, mobile: 450 },
		{ date: new Date("2024-06-21"), desktop: 169, mobile: 210 },
		{ date: new Date("2024-06-22"), desktop: 317, mobile: 270 },
		{ date: new Date("2024-06-23"), desktop: 480, mobile: 530 },
		{ date: new Date("2024-06-24"), desktop: 132, mobile: 180 },
		{ date: new Date("2024-06-25"), desktop: 141, mobile: 190 },
		{ date: new Date("2024-06-26"), desktop: 434, mobile: 380 },
		{ date: new Date("2024-06-27"), desktop: 448, mobile: 490 },
		{ date: new Date("2024-06-28"), desktop: 149, mobile: 200 },
		{ date: new Date("2024-06-29"), desktop: 103, mobile: 160 },
		{ date: new Date("2024-06-30"), desktop: 446, mobile: 400 },
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

<Card.Root>
	<Card.Header class="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
		<div class="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
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
					<span class="text-lg font-bold leading-none sm:text-3xl">
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
						motion: {
							y: { type: "tween", duration: 500, easing: cubicInOut },
							height: { type: "tween", duration: 500, easing: cubicInOut },
						},
					},
					highlight: { area: { fill: "none" } },
					xAxis: {
						format: (d: Date) => {
							return d.toLocaleDateString("en-US", {
								month: "short",
								day: "2-digit",
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
