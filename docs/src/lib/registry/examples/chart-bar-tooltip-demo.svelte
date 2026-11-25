<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import * as Chart from "$lib/registry/ui/chart/index.js";

	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "#2563eb",
		},
		mobile: {
			label: "Mobile",
			color: "#60a5fa",
		},
	} satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
	<BarChart
		data={chartData}
		x="month"
		xScale={scaleBand().paddingInner(0.2).paddingOuter(0.1)}
		x1Scale={scaleBand().paddingInner(0.12)}
		x1Range={({ xScale }) => [0, xScale.bandwidth?.() ?? 0]}
		seriesLayout="group"
		series={[
			{ key: "desktop", label: chartConfig.desktop.label, color: "var(--color-desktop)" },
			{ key: "mobile", label: chartConfig.mobile.label, color: "var(--color-mobile)" },
		]}
		rule={false}
		padding={{ top: 5, right: 5, bottom: 35, left: 5 }}
		yDomain={[0, 320]}
		yNice={false}
		grid={{ x: false, y: true, yTicks: [0, 80, 160, 240, 320] }}
		axis="x"
		props={{
			bars: { rounded: "all", radius: 4, stroke: "none", motion: Chart.defaultBarMotion },
			xAxis: {
				format: (month) => month.slice(0, 3),
				tickMarks: false,
				tickLabelProps: { dy: 17.5, style: "fill: #666" },
			},
			highlight: { area: { class: "fill-muted" } },
		}}
	>
		{#snippet tooltip()}
			<Chart.Tooltip />
		{/snippet}
	</BarChart>
</Chart.Container>
