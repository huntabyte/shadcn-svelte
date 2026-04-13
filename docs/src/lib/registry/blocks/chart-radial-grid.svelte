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

	// With outerRadius={-17}, innerRadius={-12.5}, padding={20}, and a 250px container:
	// usable radius ≈ (250/2) - 20 = 105
	// outermost arc outer edge ≈ 105 - 17 = 88
	// each band is 12.5 wide, so 5 bands span radii from ~26 to ~88
	// grid circles at each band's outer edge (skip center hole at ~26)
	const gridRadii = [31, 48, 65, 82, 99];
	// 12 evenly spaced spokes (every 30°) from center to outer radius
	const spokeAngles = Array.from({ length: 14 }, (_, i) => (i * 24.5 * Math.PI) / 180);
	const innerR = 23;
	const outerR = 108;
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
					arc: { track: { fill: "transparent" }, motion: Chart.defaultMotion },
					tooltip: { context: { hideDelay: 350 } },
				}}
			>
				{#snippet belowMarks()}
					{#each gridRadii as r (r)}
						<circle
							cx="0"
							cy="0"
							{r}
							class="stroke-muted-foreground/20 fill-none"
							stroke-width="1"
						/>
					{/each}
					{#each spokeAngles as angle (angle)}
						<line
							x1={innerR * Math.cos(angle)}
							y1={innerR * Math.sin(angle)}
							x2={outerR * Math.cos(angle)}
							y2={outerR * Math.sin(angle)}
							class="stroke-muted-foreground/20"
							stroke-width="1"
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
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
