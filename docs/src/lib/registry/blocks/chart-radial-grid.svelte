<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { ArcChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";

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

	// Grid geometry: concentric circles and radial spokes
	const gridRadii = [18, 36, 54, 72, 90];
	const spokeCount = 6;
	const spokeLength = 95;
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radial Chart - Grid</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<ArcChart
				label="browser"
				value="visitors"
				outerRadius={-17}
				innerRadius={-12.5}
				padding={20}
				range={[90, -270]}
				maxValue={Math.max(...chartData.map((d) => d.visitors))}
				series={chartData.map((d) => ({
					key: d.browser,
					color: d.color,
					data: [d],
				}))}
				props={{
					arc: { track: { fill: "var(--muted)" } },
					tooltip: { context: { hideDelay: 350 } },
				}}
			>
				{#snippet belowMarks()}
					{#each gridRadii as r}
						<circle cx="0" cy="0" {r} fill="none" class="stroke-border" />
					{/each}
					{#each Array(spokeCount) as _, i}
						{@const angle = (i / spokeCount) * Math.PI * 2}
						<line
							x1="0"
							y1="0"
							x2={Math.cos(angle) * spokeLength}
							y2={Math.sin(angle) * spokeLength}
							class="stroke-border"
						/>
					{/each}
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel nameKey="browser" />
				{/snippet}
			</ArcChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 leading-none font-medium">
			Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
		</div>
		<div class="text-muted-foreground flex items-center gap-2 leading-none">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
