<script lang="ts">
	import { PieChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";

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
	const pieAngle = Chart.createPieAnimation();
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center pb-0">
		<Card.Title>Pie Chart - Legend</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1 pb-0">
		<Chart.Container
			config={chartConfig}
			class="relative mx-auto aspect-square w-full max-w-[300px]"
		>
			<PieChart
				outerRadius={0.8}
				padding={{ top: 5, right: 5, bottom: 57, left: 5 }}
				data={chartData}
				key="browser"
				value="visitors"
				cRange={chartData.map((d) => d.color)}
				props={{
					arc: { stroke: "transparent", strokeWidth: 1 },
					pie: {
						startAngle: Math.PI / 2,
						sort: null,
						endAngle: pieAngle.current,
						motion: "none",
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</PieChart>
			<div class="absolute inset-x-0 bottom-[13px] flex flex-wrap justify-center gap-2 pt-3">
				{#each chartData as item (item.browser)}
					<div class="flex basis-1/4 items-center justify-center gap-1.5">
						<span class="size-2 shrink-0 rounded-[2px]" style:background-color={item.color}></span>
						{chartConfig[item.browser as keyof typeof chartConfig].label}
					</div>
				{/each}
			</div>
		</Chart.Container>
	</Card.Content>
</Card.Root>
