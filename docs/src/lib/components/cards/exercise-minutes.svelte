<script lang="ts">
	import { LineChart } from "layerchart";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { curveNatural } from "d3-shape";

	const data = [
		{
			average: 400,
			today: 240,
			day: "Monday",
		},
		{
			average: 300,
			today: 139,
			day: "Tuesday",
		},
		{
			average: 200,
			today: 980,
			day: "Wednesday",
		},
		{
			average: 278,
			today: 390,
			day: "Thursday",
		},
		{
			average: 189,
			today: 480,
			day: "Friday",
		},
		{
			average: 239,
			today: 380,
			day: "Saturday",
		},
		{
			average: 349,
			today: 430,
			day: "Sunday",
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
				axis="x"
				data={data.map((d, i) => ({ ...d, index: i }))}
				x="index"
				series={[
					{
						key: "average",
						color: "var(--color-average)",
						label: "Average",
						props: {
							"stroke-opacity": 0.5,
						},
					},
					{
						key: "today",
						color: "var(--color-today)",
						label: "Today",
					},
				]}
				seriesLayout="stack"
				points
				props={{
					spline: { curve: curveNatural, strokeWidth: 2 },
					points: {
						r: 3,
						stroke: "var(--color-today)",
						strokeWidth: 2,
						fill: "var(--color-today)",
					},
					highlight: {
						points: {
							motion: { type: "none" },
							r: 5,
						},
					},
					xAxis: {
						format: (d) => data[d]?.day?.slice(0, 3),
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
