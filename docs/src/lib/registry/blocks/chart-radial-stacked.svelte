<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { ArcChart, Text } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
		mobile: { label: "Mobile", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
	const totalVisitors = chartData[0].desktop + chartData[0].mobile;
	const mobileEndAngle = 90 - (chartData[0].mobile / totalVisitors) * 180;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center pb-0">
		<Card.Title>Radial Chart - Stacked</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-1 items-center pb-0">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square w-full max-w-[250px]">
			<ArcChart
				key="platform"
				label="platform"
				value="visitors"
				innerRadius={83}
				outerRadius={107}
				padding={0}
				range={[90, -90]}
				series={[
					{
						key: "mobile",
						color: chartConfig.mobile.color,
						data: [{ platform: "mobile", visitors: chartData[0].mobile }],
						props: {
							domain: [0, chartData[0].mobile],
							range: [90, mobileEndAngle],
						},
					},
					{
						key: "desktop",
						color: chartConfig.desktop.color,
						data: [{ platform: "desktop", visitors: chartData[0].desktop }],
						props: {
							domain: [0, chartData[0].desktop],
							range: [mobileEndAngle, -90],
						},
					},
				]}
				cornerRadius={5}
				props={{
					arc: {
						track: false,
						stroke: "transparent",
						strokeWidth: 2,
						motion: Chart.defaultMotion,
					},
				}}
			>
				{#snippet aboveMarks()}
					<Text
						value={totalVisitors.toLocaleString()}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground text-2xl! font-bold"
						dy={-24}
					/>
					<Text
						value="Visitors"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-muted-foreground! text-muted-foreground"
						dy={-4}
					/>
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
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
