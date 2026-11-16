<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart, Highlight } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [
		{ date: "2024-04-01", desktop: 222, mobile: 150 },
		{ date: "2024-04-02", desktop: 97, mobile: 180 },
		{ date: "2024-04-03", desktop: 167, mobile: 120 },
		{ date: "2024-04-04", desktop: 242, mobile: 260 },
		{ date: "2024-04-05", desktop: 373, mobile: 290 },
		{ date: "2024-04-06", desktop: 301, mobile: 340 },
		{ date: "2024-04-07", desktop: 245, mobile: 180 },
		{ date: "2024-04-08", desktop: 409, mobile: 320 },
		{ date: "2024-04-09", desktop: 59, mobile: 110 },
		{ date: "2024-04-10", desktop: 261, mobile: 190 },
		{ date: "2024-04-11", desktop: 327, mobile: 350 },
		{ date: "2024-04-12", desktop: 292, mobile: 210 },
		{ date: "2024-04-13", desktop: 342, mobile: 380 },
		{ date: "2024-04-14", desktop: 137, mobile: 220 },
		{ date: "2024-04-15", desktop: 120, mobile: 170 },
		{ date: "2024-04-16", desktop: 138, mobile: 190 },
		{ date: "2024-04-17", desktop: 446, mobile: 360 },
		{ date: "2024-04-18", desktop: 364, mobile: 410 },
		{ date: "2024-04-19", desktop: 243, mobile: 180 },
		{ date: "2024-04-20", desktop: 89, mobile: 150 },
		{ date: "2024-04-21", desktop: 137, mobile: 200 },
		{ date: "2024-04-22", desktop: 224, mobile: 170 },
		{ date: "2024-04-23", desktop: 138, mobile: 230 },
		{ date: "2024-04-24", desktop: 387, mobile: 290 },
		{ date: "2024-04-25", desktop: 215, mobile: 250 },
		{ date: "2024-04-26", desktop: 75, mobile: 130 },
		{ date: "2024-04-27", desktop: 383, mobile: 420 },
		{ date: "2024-04-28", desktop: 122, mobile: 180 },
		{ date: "2024-04-29", desktop: 315, mobile: 240 },
		{ date: "2024-04-30", desktop: 454, mobile: 380 },
	];

	const dateLabels = new Map(
		chartData.slice(1).map(({ date }, index) => [date, chartData[index]!.date])
	);

	const chartConfig = {
		views: { label: "Page Views" },
		desktop: { label: "Desktop", color: "var(--chart-2)" },
		mobile: { label: "Mobile", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;

	let activeChart = $state<"desktop" | "mobile">("desktop");

	const total = $derived({
		desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
		mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
	});

	const activeSeries = $derived.by(() => {
		const selected = activeChart;
		return [
			{
				key: "views",
				value: (row: (typeof chartData)[number]) => row[selected],
				label: chartConfig[activeChart].label,
				color: chartConfig[activeChart].color,
			},
		];
	});
</script>

<Card.Root class="gap-6 py-0 pb-4 ring-0">
	<Card.Header class="flex flex-col items-stretch border-b p-0! sm:flex-row">
		<div class="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
			<Card.Title class="text-[15px] leading-none font-semibold">Bar Chart - Interactive</Card.Title
			>
			<Card.Description>Showing total visitors for the last 3 months</Card.Description>
		</div>
		<div class="flex">
			{#each ["desktop", "mobile"] as const as chart (chart)}
				<button
					data-active={activeChart === chart}
					class="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-start even:border-s data-[active=true]:bg-muted/50 sm:border-s sm:border-t-0 sm:px-8 sm:py-6"
					onclick={() => (activeChart = chart)}
				>
					<span class="text-xs text-muted-foreground">
						{chartConfig[chart].label}
					</span>
					<span class="text-lg leading-none font-bold sm:text-3xl">
						{total[chart].toLocaleString()}
					</span>
				</button>
			{/each}
		</div>
	</Card.Header>
	<Card.Content class="px-2 sm:p-6">
		<Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
			<BarChart
				data={chartData}
				x="date"
				xScale={scaleBand<string>().paddingInner(0.2).paddingOuter(0.1)}
				yDomain={[0, 600]}
				grid={{ x: false, y: true, yTicks: [0, 150, 300, 450, 600] }}
				rule={false}
				axis="x"
				series={activeSeries}
				padding={{ left: 12, right: 12, bottom: 30 }}
				props={{
					bars: {
						stroke: "none",
						rounded: "none",
						motion: Chart.defaultBarMotion,
					},
					highlight: { area: { fill: "none" } },
					xAxis: {
						format: (d: string) => {
							return new Date(dateLabels.get(d) ?? d).toLocaleDateString("en-US", {
								timeZone: "UTC",
								month: "short",
								day: "numeric",
							});
						},
						tickMarks: false,
						tickLabelProps: { dy: 15.5, textAnchor: "middle", style: "fill: #666" },
						// Keep the first label one band inside the plot, as in the reference.
						ticks: (scale) => {
							const bandWidth = scale.bandwidth?.() ?? 0;
							const step = Math.max(1, Math.ceil(60 / (bandWidth / 0.8)));
							return chartData
								.filter((_, index) => index > 0 && (index - 1) % step === 0)
								.map(({ date }) => date);
						},
					},
				}}
			>
				{#snippet belowMarks()}
					<Highlight area={{ class: "fill-muted" }} />
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						nameKey="views"
						class="w-[150px]"
						labelFormatter={(v: string) => {
							return new Date(v).toLocaleDateString("en-US", {
								timeZone: "UTC",
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
