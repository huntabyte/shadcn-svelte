<script lang="ts">
	import { PieChart, Tooltip } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	const chartData = [
		{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
		{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
		{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
		{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
		{ browser: "other", visitors: 90, fill: "var(--color-other)" },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		chrome: {
			label: "Chrome",
			color: "hsl(var(--chart-1))",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
		firefox: {
			label: "Firefox",
			color: "hsl(var(--chart-3))",
		},
		edge: {
			label: "Edge",
			color: "hsl(var(--chart-4))",
		},
		other: {
			label: "Other",
			color: "hsl(var(--chart-5))",
		},
	} satisfies Chart.ChartConfig;

	let tweened = true;

	function getColorFromConfig(v: string) {
		// @ts-expect-error - still blocked by my poor implementation of getPayloadConfigFromPayload
		return chartConfig[v as keyof typeof chartConfig].color;
	}
</script>

<Card.Root>
	<Card.Header class="items-center">
		<Card.Title>Radial Chart</Card.Title>
		<Card.Description>Showing total visitors for the last 6 months</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container class="mx-auto aspect-square max-h-[250px]">
			<PieChart
				label="browser"
				value="visitors"
				outerRadius={-20}
				innerRadius={-12.5}
				series={chartData.map((d) => ({
					key: d.browser,
					color: getColorFromConfig(d.browser),
					data: [d],
				}))}
				props={{
					arc: { track: { fill: "hsl(var(--muted))" }, tweened },
				}}
			>
				<svelte:fragment slot="tooltip">
					<Tooltip.Root let:data variant="none">
						<Chart.Tooltip hideLabel config={chartConfig} payload={data} />
					</Tooltip.Root>
				</svelte:fragment>
			</PieChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground flex items-center gap-2 leading-none">
			January - June 2024
		</div>
	</Card.Footer>
</Card.Root>
