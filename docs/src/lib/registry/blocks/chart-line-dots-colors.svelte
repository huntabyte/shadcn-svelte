<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { scaleBand } from "d3-scale";
	import { curveNatural } from "d3-shape";
	import { LineChart, Spline, ChartClipPath, Points, Circle } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, color: "var(--color-safari)" },
		{ browser: "firefox", visitors: 187, color: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, color: "var(--color-edge)" },
		{ browser: "other", visitors: 90, color: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: { label: "Visitors", color: "var(--chart-2)" },
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Line Chart - Dots Colors</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<LineChart
				data={chartData}
				y="visitors"
				yPadding={[25, 0]}
				padding={{ left: 24, right: 24 }}
				highlight={{ points: { r: 6 } }}
				x="browser"
				axis={false}
				xScale={scaleBand()}
				props={{
					spline: {
						curve: curveNatural,
						strokeWidth: 2,
						stroke: "var(--color-visitors)",
					},
				}}
			>
				{#snippet marks()}
					<ChartClipPath initialWidth={0} motion={Chart.defaultClipMotion}>
						<Spline curve={curveNatural} strokeWidth={2} stroke="var(--color-visitors)" />
					</ChartClipPath>
				{/snippet}
				{#snippet points()}
					<Points>
						{#snippet children({ points })}
							{#each points as point, i (i)}
								<Circle
									cx={point.x}
									cy={point.y}
									r={5}
									fill={point.data.color}
									stroke={point.data.color}
								/>
							{/each}
						{/snippet}
					</Points>
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel indicator="line" nameKey="visitors" />
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
