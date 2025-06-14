<script lang="ts">
	import { PieChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, color: "var(--color-safari)" },
		{ browser: "firefox", visitors: 187, color: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, color: "var(--color-edge)" },
		{ browser: "other", visitors: 90, color: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: { label: "Visitors" },
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Pie Chart - Legend</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Context config={chartConfig} class="flex flex-col h-[250px]">
			<Chart.Container class="mx-auto aspect-square flex-1 min-h-0">
				<PieChart
					data={chartData}
					key="browser"
					value="visitors"
					label={(d) =>
						d.browser
							.split("")
							.map((c, i) => (i === 0 ? c.toUpperCase() : c))
							.join("")}
					cRange={chartData.map((d) => d.color)}
					props={{
						pie: {
							motion: "tween",
						},
					}}
					legend={false}
				>
					{#snippet tooltip()}
						<Chart.Tooltip hideLabel />
					{/snippet}
				</PieChart>
			</Chart.Container>
			
			<!-- Custom legend positioned outside chart container to prevent overflow (issue #2038) -->
			<!-- LayerChart's built-in legend can overflow when chart space is constrained -->
			<Chart.Legend class="mt-2" />
		</Chart.Context>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
