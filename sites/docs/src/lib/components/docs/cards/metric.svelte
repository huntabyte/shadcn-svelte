<script lang="ts">
	import { LineChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { curveNatural } from "d3-shape";

	const data = [
		{
			average: 400,
			today: 240,
		},
		{
			average: 300,
			today: 139,
		},
		{
			average: 200,
			today: 980,
		},
		{
			average: 278,
			today: 390,
		},
		{
			average: 189,
			today: 480,
		},
		{
			average: 239,
			today: 380,
		},
		{
			average: 349,
			today: 430,
		},
	];

	const chartConfig = {
		today: {
			label: "Today",
			color: "var(--primary)",
		},
		average: {
			label: "Average",
			color: "var(--primary)",
		},
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Exercise Minutes</Card.Title>
		<Card.Description>
			Your exercise minutes are ahead of where you normally are.
		</Card.Description>
	</Card.Header>
	<Card.Content class="pb-4">
		<Chart.Container
			config={chartConfig}
			class="w-full md:h-[200px] [&_.lc-highlight-line]:stroke-1"
		>
			<LineChart
				axis={false}
				data={data.map((d, i) => ({ ...d, index: i }))}
				x="index"
				series={[
					{
						key: "average",
						color: "var(--color-average)",
						label: "Average",
						props: {
							"stroke-opacity": 0.5,
							fill: "none",
						},
					},
					{
						key: "today",
						color: "var(--color-today)",
						label: "Today",
					},
				]}
				seriesLayout="stack"
				grid={false}
				points
				props={{
					spline: { curve: curveNatural, strokeWidth: 2 },
					points: {
						r: 3,
						stroke: "var(--color-today)",
						strokeWidth: 2,
						fill: "var(--foreground)",
					},
					highlight: {
						points: {
							motion: { type: "none" },
							r: 8,
						},
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip label="Minutes" />
				{/snippet}
			</LineChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
