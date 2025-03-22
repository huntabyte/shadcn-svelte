<script lang="ts">
	import { PieChart } from "layerchart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
		{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
		{ browser: "other", visitors: 190, fill: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: { label: "Visitors" },
		chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
		safari: { label: "Safari", color: "hsl(var(--chart-2))" },
		firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
		edge: { label: "Edge", color: "hsl(var(--chart-4))" },
		other: { label: "Other", color: "hsl(var(--chart-5))" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Pie Chart</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<PieChart
				data={chartData}
				label="browser"
				value="visitors"
				series={[
					{
						key: "chrome",
						label: chartConfig.chrome.label,
						color: chartConfig.chrome.color,
					},
					{
						key: "safari",
						label: chartConfig.safari.label,
						color: chartConfig.safari.color,
					},
					{
						key: "firefox",
						label: chartConfig.firefox.label,
						color: chartConfig.firefox.color,
					},
					{
						key: "edge",
						label: chartConfig.edge.label,
						color: chartConfig.edge.color,
					},
					{
						key: "other",
						label: chartConfig.other.label,
						color: chartConfig.other.color,
					},
				]}
			>
				<!-- TODO: Figure out a way to apply a custom tooltip that readily parses this chart data. Blocked my poor implementation of `getPayloadConfigFromPayload` -->
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
