<script lang="ts">
	import { PieChart } from "layerchart";
	import TrendingUp from "lucide-svelte/icons/trending-up";
	import * as Chart from "$lib/registry/new-york/ui/chart/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	const desktopData = [
		{ month: "january", desktop: 186, fill: "var(--color-january)" },
		{ month: "february", desktop: 305, fill: "var(--color-february)" },
		{ month: "march", desktop: 237, fill: "var(--color-march)" },
		{ month: "april", desktop: 173, fill: "var(--color-april)" },
		{ month: "may", desktop: 209, fill: "var(--color-may)" },
	];

	const mobileData = [
		{ month: "january", mobile: 80, fill: "var(--color-january)" },
		{ month: "february", mobile: 200, fill: "var(--color-february)" },
		{ month: "march", mobile: 120, fill: "var(--color-march)" },
		{ month: "april", mobile: 190, fill: "var(--color-april)" },
		{ month: "may", mobile: 130, fill: "var(--color-may)" },
	];

	// const chartConfig = {
	// 	visitors: {
	// 		label: "Visitors",
	// 	},
	// 	desktop: {
	// 		label: "Desktop",
	// 	},
	// 	mobile: {
	// 		label: "Mobile",
	// 	},
	// 	january: {
	// 		label: "January",
	// 		color: "hsl(var(--chart-1))",
	// 	},
	// 	february: {
	// 		label: "February",
	// 		color: "hsl(var(--chart-2))",
	// 	},
	// 	march: {
	// 		label: "March",
	// 		color: "hsl(var(--chart-3))",
	// 	},
	// 	april: {
	// 		label: "April",
	// 		color: "hsl(var(--chart-4))",
	// 	},
	// 	may: {
	// 		label: "May",
	// 		color: "hsl(var(--chart-5))",
	// 	},
	// } satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Pie Chart - Stacked</Card.Title>
		<Card.Description>January - June 2024</Card.Description>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container class="mx-auto aspect-square max-h-[250px]">
			<PieChart
				label="month"
				series={[
					// TODO: Ability to provide data in a more concise/compact format
					// e.g `series: { [ { key: "desktop", data: desktopData }, { key: "mobile", data: mobileData } ] }`
					{
						key: "desktop",
						value: "desktop",
						data: desktopData.map((d) => ({ month: d.month, value: d.desktop })),
						props: { innerRadius: -20 },
					},
					{
						key: "mobile",
						value: "mobile",
						data: mobileData.map((d) => ({ month: d.month, value: d.mobile })),
						props: { outerRadius: -30 },
					},
				]}
				cRange={[
					"hsl(var(--chart-1))",
					"hsl(var(--chart-2))",
					"hsl(var(--chart-3))",
					"hsl(var(--chart-4))",
					"hsl(var(--chart-5))",
				]}
			/>
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
