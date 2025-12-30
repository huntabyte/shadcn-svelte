<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { ArcChart, Text } from "layerchart";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const radialChartData = [{ browser: "safari", visitors: 1260, fill: "var(--color-safari)" }];

	const radialChartConfig = {
		visitors: {
			label: "Visitors",
		},
		safari: {
			label: "Safari",
			color: "var(--chart-2)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Example title="Radial Chart">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Radial Chart - Shape</Card.Title>
			<Card.Description>January - June 2024</Card.Description>
		</Card.Header>
		<Card.Content class="flex-1 pb-0">
			<Chart.Container config={radialChartConfig} class="mx-auto aspect-square max-h-[210px]">
				<ArcChart
					label="browser"
					value="visitors"
					outerRadius={88}
					innerRadius={66}
					trackOuterRadius={83}
					trackInnerRadius={72}
					padding={40}
					range={[90, -270]}
					maxValue={radialChartData[0].visitors * 4}
					series={radialChartData.map((d) => ({
						key: d.browser,
						color: d.fill,
						data: [d],
					}))}
					props={{
						arc: { track: { fill: "var(--muted)" }, motion: "tween" },
						tooltip: { context: { hideDelay: 350 } },
					}}
					tooltip={false}
				>
					{#snippet belowMarks()}
						<circle cx="0" cy="0" r="80" class="fill-background" />
					{/snippet}
					{#snippet aboveMarks()}
						<Text
							value={String(radialChartData[0].visitors)}
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
		<Card.Footer class="flex-col gap-2">
			<div class="flex items-center gap-2 leading-none font-medium">
				Trending up by 5.2% this month
				<IconPlaceholder
					lucide="TrendingUpIcon"
					tabler="IconTrendingUp"
					hugeicons="ChartUpIcon"
					phosphor="TrendUpIcon"
					class="size-4"
				/>
			</div>
			<div class="text-muted-foreground leading-none">
				Showing total visitors for the last 6 months
			</div>
		</Card.Footer>
	</Card.Root>
</Example>
