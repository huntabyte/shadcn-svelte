<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { PieChart, Text } from "layerchart";

	const pieChartData = [
		{ browser: "Chrome", visitors: 275, color: "var(--color-Chrome)" },
		{ browser: "Safari", visitors: 200, color: "var(--color-Safari)" },
		{ browser: "Firefox", visitors: 287, color: "var(--color-Firefox)" },
		{ browser: "Edge", visitors: 173, color: "var(--color-Edge)" },
		{ browser: "Other", visitors: 190, color: "var(--color-Other)" },
	];

	const pieChartConfig = {
		Visitors: { label: "Visitors" },
		Chrome: { label: "Chrome", color: "var(--chart-1)" },
		Safari: { label: "Safari", color: "var(--chart-2)" },
		Firefox: { label: "Firefox", color: "var(--chart-3)" },
		Edge: { label: "Edge", color: "var(--chart-4)" },
		Other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;

	const totalVisitors = $derived(pieChartData.reduce((sum, item) => sum + item.visitors, 0));
	const topBrowser = $derived(
		pieChartData.reduce((max, item) => (item.visitors > max.visitors ? item : max))
	);
	const topBrowserShare = $derived(Math.round((topBrowser.visitors / totalVisitors) * 100));
	const topBrowserLabel = $derived(
		pieChartConfig[topBrowser.browser as keyof typeof pieChartConfig]?.label ?? "Top"
	);
</script>

<Card.Root>
	<Card.Header class="pb-0">
		<Card.Title>Browser Share</Card.Title>
		<Card.Description>January - June 2026</Card.Description>
		<Card.Action>
			<Badge variant="outline">{topBrowserLabel}</Badge>
		</Card.Action>
	</Card.Header>
	<Card.Content class="pt-0">
		<Chart.Container config={pieChartConfig} class="mx-auto aspect-square max-h-[190px]">
			<PieChart
				data={pieChartData}
				key="browser"
				value="visitors"
				c="color"
				innerRadius={50}
				padding={28}
				legend
				props={{ pie: { motion: "tween" } }}
			>
				{#snippet aboveMarks()}
					<Text
						value={totalVisitors.toLocaleString()}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground text-2xl font-bold"
						dy={3}
					/>
					<Text
						value="Visitors"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-muted-foreground text-xs"
						dy={22}
					/>
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col items-stretch gap-2">
		<div class="flex items-center text-xs">
			<span class="font-medium">{topBrowserLabel}</span>
			<span class="text-muted-foreground ml-auto tabular-nums">
				{topBrowserShare}%
			</span>
		</div>
		<Progress value={topBrowserShare} class="**:data-[slot=progress-indicator]:bg-chart-3" />
	</Card.Footer>
</Card.Root>
