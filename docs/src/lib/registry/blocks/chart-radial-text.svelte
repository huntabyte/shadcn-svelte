<script lang="ts">
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { Arc, ArcChart, Text } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [{ browser: "safari", visitors: 200, color: "var(--color-safari)" }];

	const chartConfig = {
		visitors: { label: "Visitors" },
		safari: { label: "Safari", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center pb-0">
		<Card.Title>Radial Chart - Text</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 pb-0">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<ArcChart
				label="browser"
				value="visitors"
				outerRadius={89}
				innerRadius={81}
				padding={0}
				range={[90, -160]}
				maxValue={chartData[0].visitors}
				cornerRadius={20}
				series={chartData.map((d) => ({
					key: d.browser,
					color: d.color,
					data: [d],
				}))}
				props={{
					arc: { track: { fill: "var(--muted)" }, motion: Chart.defaultMotion },
					tooltip: { context: { hideDelay: 350 } },
				}}
				tooltipContext={false}
			>
				{#snippet belowMarks()}
					<Arc
						startAngle={0}
						endAngle={2 * Math.PI}
						outerRadius={90}
						innerRadius={80}
						fill="var(--muted)"
					/>
				{/snippet}

				{#snippet aboveMarks()}
					<Text
						value={chartData[0].visitors.toLocaleString()}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground text-4xl! font-bold"
						dy={3}
					/>
					<Text
						value="Visitors"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-muted-foreground!"
						dy={22}
					/>
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
