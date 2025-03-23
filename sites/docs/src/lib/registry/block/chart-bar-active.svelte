<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { Bar, BarChart } from "layerchart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";

	const chartData = [
		{ browser: "chrome", visitors: 187, color: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, color: "var(--color-safari)" },
		{ browser: "firefox", visitors: 275, color: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, color: "var(--color-edge)" },
		{ browser: "other", visitors: 90, color: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		chrome: {
			label: "Chrome",
			color: "hsl(var(--chart-1))",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
		firefox: {
			label: "Firefox",
			color: "hsl(var(--chart-3))",
		},
		edge: {
			label: "Edge",
			color: "hsl(var(--chart-4))",
		},
		other: {
			label: "Other",
			color: "hsl(var(--chart-5))",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Bar Chart - Active</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				data={chartData}
				x="browser"
				c="color"
				y="visitors"
				cRange={chartData.map((c) => c.color)}
				xScale={scaleBand().padding(0.25)}
				axis="x"
				rule={false}
				props={{
					bars: { stroke: "none", radius: 8, rounded: "all" },
					xAxis: {
						format: (d) => chartConfig[d as keyof typeof chartConfig].label,
					},
					highlight: { area: { fill: "none" } },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey="visitors" />
				{/snippet}
				{#snippet marks({ getBarsProps, visibleSeries })}
					{@const baseBarProps = getBarsProps(visibleSeries[0], 0)}
					{#each chartData as d, i (i)}
						{#if i === 2}
							<!-- The "active" bar -->
							<Bar
								{...baseBarProps}
								fill={d.color}
								bar={d}
								fillOpacity={0.8}
								stroke={d.color}
								strokeWidth={2}
								stroke-dasharray={4}
								stroke-dashoffset={4}
							/>
						{:else}
							<Bar {...baseBarProps} fill={d.color} bar={d} />
						{/if}
					{/each}
				{/snippet}
			</BarChart>
			<!-- todo -->
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Showing total visitors for the last 6 months
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
