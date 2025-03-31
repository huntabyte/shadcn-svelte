<script lang="ts">
	import { Arc, PieChart } from "layerchart";
	import TrendingUp from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";

	const desktopData = [
		{ month: "january", desktop: 186, color: "var(--color-january)" },
		{ month: "february", desktop: 305, color: "var(--color-february)" },
		{ month: "march", desktop: 237, color: "var(--color-march)" },
		{ month: "april", desktop: 173, color: "var(--color-april)" },
		{ month: "may", desktop: 209, color: "var(--color-may)" },
	];

	const mobileData = [
		{ month: "january", mobile: 80, color: "var(--color-january)" },
		{ month: "february", mobile: 200, color: "var(--color-february)" },
		{ month: "march", mobile: 120, color: "var(--color-march)" },
		{ month: "april", mobile: 190, color: "var(--color-april)" },
		{ month: "may", mobile: 130, color: "var(--color-may)" },
	];

	const chartConfig = {
		desktop: { label: "Desktop" },
		mobile: { label: "Mobile" },
		january: { label: "January", color: "var(--chart-1)" },
		february: { label: "February", color: "var(--chart-2)" },
		march: { label: "March", color: "var(--chart-3)" },
		april: { label: "April", color: "var(--chart-4)" },
		may: { label: "May", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Pie Chart - Stacked</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
			<PieChart
				label="month"
				c={(d) => {
					return d.color;
				}}
				props={{
					pie: {
						sort: (a, b) => {
							const monthOrder = ["january", "february", "march", "april", "may"];
							return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
						},
					},
				}}
				series={[
					// TODO: Ability to provide data in a more concise/compact format
					// e.g `series: { [ { key: "desktop", data: desktopData }, { key: "mobile", data: mobileData } ] }`
					{
						key: "desktop",
						value: "desktop",
						data: desktopData.map((d) => ({
							month: d.month,
							value: d.desktop,
							color: d.color,
							key: "desktop",
						})),
						props: { innerRadius: -20 },
					},
					{
						key: "mobile",
						value: "mobile",
						data: mobileData.map((d) => ({
							month: d.month,
							value: d.mobile,
							color: d.color,
							key: "mobile",
						})),
						props: { outerRadius: -30 },
					},
				]}
				padding={29}
			>
				{#snippet arc({ props })}
					<Arc {...props} fill={props.data.color} />
				{/snippet}
				{#snippet tooltip()}
					<Chart.Tooltip
						labelKey="visitors"
						nameKey="month"
						indicator="line"
						labelFormatter={(_, payload) => {
							return chartConfig[payload?.[0].key as keyof typeof chartConfig].label;
						}}
					/>
				{/snippet}
			</PieChart>
			<!-- TODO: How to programmatically apply a fill colour by indexing `chartConfig` -->
			<!-- TODO: Figure out a way to apply a custom tooltip that readily parses this chart data. Blocked my poor implementation of `getPayloadConfigFromPayload` -->
		</Chart.Container>
	</Card.Content>
	<Card.Footer class="flex-col gap-2 text-sm">
		<div class="flex items-center gap-2 font-medium leading-none">
			Trending up by 5.2% this month <TrendingUp class="size-4" />
		</div>
		<div class="text-muted-foreground leading-none">
			Showing total visitors for the last 6 months
		</div>
	</Card.Footer>
</Card.Root>
