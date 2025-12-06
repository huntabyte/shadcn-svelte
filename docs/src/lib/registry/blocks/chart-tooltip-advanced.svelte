<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { scaleBand } from "d3-scale";
	import { BarChart, type ChartContextValue } from "layerchart";
	import { cubicInOut } from "svelte/easing";

	const chartData = [
		{ date: "2024-07-15", running: 450, swimming: 300 },
		{ date: "2024-07-16", running: 380, swimming: 420 },
		{ date: "2024-07-17", running: 520, swimming: 120 },
		{ date: "2024-07-18", running: 140, swimming: 550 },
		{ date: "2024-07-19", running: 600, swimming: 350 },
		{ date: "2024-07-20", running: 480, swimming: 400 },
	];

	const chartConfig = {
		running: { label: "Running", color: "var(--chart-1)" },
		swimming: { label: "Swimming", color: "var(--chart-2)" },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartContextValue>();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tooltip - Advanced</Card.Title>
		<Card.Description>Tooltip with custom formatter and total.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				bind:context
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				x="date"
				axis="x"
				rule={false}
				series={[
					{
						key: "running",
						label: "Running",
						color: chartConfig.running.color,
						props: { rounded: "bottom" },
					},
					{
						key: "swimming",
						label: "Swimming",
						color: chartConfig.swimming.color,
					},
				]}
				seriesLayout="stack"
				grid={false}
				highlight={false}
				props={{
					bars: {
						stroke: "none",
						initialY: context?.height,
						initialHeight: 0,
						motion: {
							y: { type: "tween", duration: 500, easing: cubicInOut },
							height: { type: "tween", duration: 500, easing: cubicInOut },
						},
					},
					xAxis: {
						format: (d) =>
							new Date(d).toLocaleDateString("en-US", {
								weekday: "short",
							}),
						tickLabelProps: {
							svgProps: {
								y: 13,
							},
						},
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel class="w-[180px]">
						{#snippet formatter({ name, index, value, item })}
							<div
								style="--color-bg: var(--color-{name.toLowerCase()})"
								class="size-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
							></div>
							{chartConfig[name as keyof typeof chartConfig]?.label || name}
							<div
								class="text-foreground ms-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
							>
								{value}
								<span class="text-muted-foreground font-normal"> kcal </span>
							</div>
							<!-- Add this after the last item-->
							{#if index === 1}
								<div
									class="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium"
								>
									Total
									<div
										class="text-foreground ms-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
									>
										{item.payload.running + item.payload.swimming}
										<span class="text-muted-foreground font-normal">
											kcal
										</span>
									</div>
								</div>
							{/if}
						{/snippet}
					</Chart.Tooltip>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
