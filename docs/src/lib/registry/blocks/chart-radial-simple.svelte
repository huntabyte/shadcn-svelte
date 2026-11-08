<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { ArcChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [
		{ browser: "other", visitors: 90, color: "var(--color-other)" },
		{ browser: "edge", visitors: 173, color: "var(--color-edge)" },
		{ browser: "firefox", visitors: 187, color: "var(--color-firefox)" },
		{ browser: "safari", visitors: 200, color: "var(--color-safari)" },
		{ browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
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
	<Card.Header class="items-center pb-0">
		<Card.Title>Radial Chart</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 pb-0">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<ArcChart
				label="browser"
				value="visitors"
				outerRadius={-17}
				innerRadius={-12.5}
				padding={20}
				range={[90, -270]}
				maxValue={300}
				series={chartData.map((d) => ({
					key: d.browser,
					color: d.color,
					data: [d],
				}))}
				props={{
					arc: { track: { fill: "var(--muted)" }, motion: Chart.defaultMotion },
					tooltip: { context: { hideDelay: 350 } },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey="browser" />
				{/snippet}
			</ArcChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 leading-none font-medium">
			Trending up by 5.2% this month <TrendingUpIcon class="h-4 w-4" />
		</div>
		<div class="leading-none text-muted-foreground">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
