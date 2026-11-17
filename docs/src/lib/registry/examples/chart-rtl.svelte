<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import * as Chart from "$lib/registry/ui/chart/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				january: "January",
				february: "February",
				march: "March",
				april: "April",
				may: "May",
				june: "June",
				desktop: "Desktop",
				mobile: "Mobile",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				january: "يناير",
				february: "فبراير",
				march: "مارس",
				april: "أبريل",
				may: "مايو",
				june: "يونيو",
				desktop: "سطح المكتب",
				mobile: "الجوال",
			},
		},
		he: {
			dir: "rtl",
			values: {
				january: "ינואר",
				february: "פברואר",
				march: "מרץ",
				april: "אפריל",
				may: "מאי",
				june: "יוני",
				desktop: "מחשב",
				mobile: "נייד",
			},
		},
	} as const;
	const t = useTranslation(translations, "ar");
	const chartData = [
		{ month: "january", desktop: 186, mobile: 80 },
		{ month: "february", desktop: 305, mobile: 200 },
		{ month: "march", desktop: 237, mobile: 120 },
		{ month: "april", desktop: 73, mobile: 190 },
		{ month: "may", desktop: 209, mobile: 130 },
		{ month: "june", desktop: 214, mobile: 140 },
	];
	const chartConfig = $derived({
		desktop: { label: t.values.desktop, color: "var(--chart-2)" },
		mobile: { label: t.values.mobile, color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig);
	const monthLabel = (month: string) => t.values[month as keyof typeof t.values];
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
	<BarChart
		data={chartData}
		xScale={scaleBand().padding(0.25)}
		x="month"
		axis="x"
		grid={{ x: false, y: true }}
		xReverse={t.dir === "rtl"}
		seriesLayout="group"
		legend
		series={[
			{
				key: "desktop",
				label: chartConfig.desktop.label,
				color: chartConfig.desktop.color,
			},
			{
				key: "mobile",
				label: chartConfig.mobile.label,
				color: chartConfig.mobile.color,
			},
		]}
		props={{
			xAxis: { format: (month) => monthLabel(month).slice(0, 3) },
			bars: { radius: 4 },
		}}
	>
		{#snippet tooltip()}
			<Chart.Tooltip labelFormatter={(month) => monthLabel(month)} labelClassName="w-32" />
		{/snippet}
	</BarChart>
</Chart.Container>
