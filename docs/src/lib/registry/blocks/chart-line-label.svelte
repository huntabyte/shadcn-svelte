<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { scaleUtc } from "d3-scale";
	import { curveNatural } from "d3-shape";
	import { LineChart, Spline, RectClipPath, type ChartProps, Points } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [
		{ date: new Date("2024-01-01"), desktop: 186 },
		{ date: new Date("2024-02-01"), desktop: 305 },
		{ date: new Date("2024-03-01"), desktop: 237 },
		{ date: new Date("2024-04-01"), desktop: 73 },
		{ date: new Date("2024-05-01"), desktop: 209 },
		{ date: new Date("2024-06-01"), desktop: 214 },
	];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
	let context = $state<ChartProps<(typeof chartData)[number]>["context"]>();
	const reveal = Chart.createRevealAnimation(() => context?.isMeasured === true);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Line Chart - Label</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<LineChart
				bind:context
				labels={reveal.current === 1 ? { offset: 12 } : false}
				data={chartData}
				x="date"
				axis="x"
				xScale={scaleUtc()}
				series={[
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
					},
				]}
				props={{
					highlight: {
						points: {
							motion: "none",
							r: 6,
						},
					},
					xAxis: {
						format: (v: Date) => v.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
					},
				}}
			>
				{#snippet marks({ context })}
					<RectClipPath width={context.width * reveal.current} height={context.height}>
						{#each context.series.visibleSeries as s (s.key)}
							<Spline seriesKey={s.key} curve={curveNatural} strokeWidth={2} {...s.props} />
						{/each}
					</RectClipPath>
				{/snippet}
				{#snippet points({ context })}
					{#each context.series.visibleSeries as s (s.key)}
						<Points seriesKey={s.key} r={3} fill={s.color} stroke={s.color} strokeWidth={2} />
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) => {
							return v.toLocaleDateString("en-US", {
								month: "long",
								timeZone: "UTC",
							});
						}}
						indicator="line"
					/>
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-start gap-2 text-sm">
		<div class="flex gap-2 leading-none font-medium">
			Trending up by 5.2% this month <TrendingUpIcon class="h-4 w-4" />
		</div>
		<div class="leading-none text-muted-foreground">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
