import ChartAreaAxes from "$lib/registry/blocks/chart-area-axes.svelte";
import ChartAreaDefault from "$lib/registry/blocks/chart-area-default.svelte";
import ChartAreaGradient from "$lib/registry/blocks/chart-area-gradient.svelte";
import ChartAreaIcons from "$lib/registry/blocks/chart-area-icons.svelte";
import ChartAreaInteractive from "$lib/registry/blocks/chart-area-interactive.svelte";
import ChartAreaLegend from "$lib/registry/blocks/chart-area-legend.svelte";
import ChartAreaLinear from "$lib/registry/blocks/chart-area-linear.svelte";
import ChartAreaStackedExpand from "$lib/registry/blocks/chart-area-stacked-expand.svelte";
import ChartAreaStacked from "$lib/registry/blocks/chart-area-stacked.svelte";
import ChartAreaStep from "$lib/registry/blocks/chart-area-step.svelte";
import ChartBarActive from "$lib/registry/blocks/chart-bar-active.svelte";
import ChartBarDefault from "$lib/registry/blocks/chart-bar-default.svelte";
import ChartBarHorizontal from "$lib/registry/blocks/chart-bar-horizontal.svelte";
import ChartBarInteractive from "$lib/registry/blocks/chart-bar-interactive.svelte";
import ChartBarLabelCustom from "$lib/registry/blocks/chart-bar-label-custom.svelte";
import ChartBarLabel from "$lib/registry/blocks/chart-bar-label.svelte";
import ChartBarMixed from "$lib/registry/blocks/chart-bar-mixed.svelte";
import ChartBarMultiple from "$lib/registry/blocks/chart-bar-multiple.svelte";
import ChartBarNegative from "$lib/registry/blocks/chart-bar-negative.svelte";
import ChartBarStacked from "$lib/registry/blocks/chart-bar-stacked.svelte";
import ChartLineDefault from "$lib/registry/blocks/chart-line-default.svelte";
import ChartLineDotsColors from "$lib/registry/blocks/chart-line-dots-colors.svelte";
import ChartLineDotsCustom from "$lib/registry/blocks/chart-line-dots-custom.svelte";
import ChartLineDots from "$lib/registry/blocks/chart-line-dots.svelte";
import ChartLineInteractive from "$lib/registry/blocks/chart-line-interactive.svelte";
import ChartLineLabelCustom from "$lib/registry/blocks/chart-line-label-custom.svelte";
import ChartLineLabel from "$lib/registry/blocks/chart-line-label.svelte";
import ChartLineLinear from "$lib/registry/blocks/chart-line-linear.svelte";
import ChartLineMultiple from "$lib/registry/blocks/chart-line-multiple.svelte";
import ChartLineStep from "$lib/registry/blocks/chart-line-step.svelte";
import ChartPieDonutActive from "$lib/registry/blocks/chart-pie-donut-active.svelte";
import ChartPieDonutText from "$lib/registry/blocks/chart-pie-donut-text.svelte";
import ChartPieDonut from "$lib/registry/blocks/chart-pie-donut.svelte";
import ChartPieInteractive from "$lib/registry/blocks/chart-pie-interactive.svelte";
import ChartPieLabelCustom from "$lib/registry/blocks/chart-pie-label-custom.svelte";
import ChartPieLabelList from "$lib/registry/blocks/chart-pie-label-list.svelte";
import ChartPieLabel from "$lib/registry/blocks/chart-pie-label.svelte";
import ChartPieLegend from "$lib/registry/blocks/chart-pie-legend.svelte";
// import ChartPieSeparatorNone from "$lib/registry/blocks/chart-pie-separator-none.svelte";
import ChartPieSimple from "$lib/registry/blocks/chart-pie-simple.svelte";
import ChartPieStacked from "$lib/registry/blocks/chart-pie-stacked.svelte";
import ChartRadarDefault from "$lib/registry/blocks/chart-radar-default.svelte";
import ChartRadarDots from "$lib/registry/blocks/chart-radar-dots.svelte";
import ChartRadarGridCircleFill from "$lib/registry/blocks/chart-radar-grid-circle-fill.svelte";
import ChartRadarGridCircleNoLines from "$lib/registry/blocks/chart-radar-grid-circle-no-lines.svelte";
import ChartRadarGridCircle from "$lib/registry/blocks/chart-radar-grid-circle.svelte";
import ChartRadarGridCustom from "$lib/registry/blocks/chart-radar-grid-custom.svelte";
import ChartRadarGridFill from "$lib/registry/blocks/chart-radar-grid-fill.svelte";
import ChartRadarGridNone from "$lib/registry/blocks/chart-radar-grid-none.svelte";
import ChartRadarIcons from "$lib/registry/blocks/chart-radar-icons.svelte";
import ChartRadarLabelCustom from "$lib/registry/blocks/chart-radar-label-custom.svelte";
import ChartRadarLegend from "$lib/registry/blocks/chart-radar-legend.svelte";
import ChartRadarLinesOnly from "$lib/registry/blocks/chart-radar-lines-only.svelte";
import ChartRadarMultiple from "$lib/registry/blocks/chart-radar-multiple.svelte";
import ChartRadarRadius from "$lib/registry/blocks/chart-radar-radius.svelte";
// import ChartRadialGrid from "$lib/registry/blocks/chart-radial-grid.svelte";
import ChartRadialLabel from "$lib/registry/blocks/chart-radial-label.svelte";
import ChartRadialShape from "$lib/registry/blocks/chart-radial-shape.svelte";
import ChartRadialSimple from "$lib/registry/blocks/chart-radial-simple.svelte";
import ChartRadialStacked from "$lib/registry/blocks/chart-radial-stacked.svelte";
import ChartRadialText from "$lib/registry/blocks/chart-radial-text.svelte";
import ChartTooltipAdvanced from "$lib/registry/blocks/chart-tooltip-advanced.svelte";
import ChartTooltipDefault from "$lib/registry/blocks/chart-tooltip-default.svelte";
import ChartTooltipFormatter from "$lib/registry/blocks/chart-tooltip-formatter.svelte";
import ChartTooltipIcons from "$lib/registry/blocks/chart-tooltip-icons.svelte";
import ChartTooltipIndicatorLine from "$lib/registry/blocks/chart-tooltip-indicator-line.svelte";
import ChartTooltipIndicatorNone from "$lib/registry/blocks/chart-tooltip-indicator-none.svelte";
import ChartTooltipLabelCustom from "$lib/registry/blocks/chart-tooltip-label-custom.svelte";
import ChartTooltipLabelFormatter from "$lib/registry/blocks/chart-tooltip-label-formatter.svelte";
import ChartTooltipLabelNone from "$lib/registry/blocks/chart-tooltip-label-none.svelte";
import type { Component } from "svelte";

interface ChartItem {
	id: string;
	component: Component;
	fullWidth?: boolean;
}

interface ChartGroups {
	area: ChartItem[];
	bar: ChartItem[];
	line: ChartItem[];
	pie: ChartItem[];
	radar: ChartItem[];
	radial: ChartItem[];
	tooltip: ChartItem[];
}

export const charts: ChartGroups = {
	area: [
		{
			id: "chart-area-interactive",
			component: ChartAreaInteractive,
			fullWidth: true,
		},
		{ id: "chart-area-default", component: ChartAreaDefault },
		{ id: "chart-area-linear", component: ChartAreaLinear },
		{ id: "chart-area-step", component: ChartAreaStep },
		{ id: "chart-area-legend", component: ChartAreaLegend },
		{ id: "chart-area-stacked", component: ChartAreaStacked },
		{ id: "chart-area-stacked-expand", component: ChartAreaStackedExpand },
		{ id: "chart-area-icons", component: ChartAreaIcons },
		{ id: "chart-area-gradient", component: ChartAreaGradient },
		{ id: "chart-area-axes", component: ChartAreaAxes },
	],
	bar: [
		{
			id: "chart-bar-interactive",
			component: ChartBarInteractive,
			fullWidth: true,
		},
		{ id: "chart-bar-default", component: ChartBarDefault },
		{ id: "chart-bar-horizontal", component: ChartBarHorizontal },
		{ id: "chart-bar-multiple", component: ChartBarMultiple },
		{ id: "chart-bar-stacked", component: ChartBarStacked },
		{ id: "chart-bar-label", component: ChartBarLabel },
		{ id: "chart-bar-label-custom", component: ChartBarLabelCustom },
		{ id: "chart-bar-mixed", component: ChartBarMixed },
		{ id: "chart-bar-active", component: ChartBarActive },
		{ id: "chart-bar-negative", component: ChartBarNegative },
	],
	line: [
		{
			id: "chart-line-interactive",
			component: ChartLineInteractive,
			fullWidth: true,
		},
		{ id: "chart-line-default", component: ChartLineDefault },
		{ id: "chart-line-linear", component: ChartLineLinear },
		{ id: "chart-line-step", component: ChartLineStep },
		{ id: "chart-line-multiple", component: ChartLineMultiple },
		{ id: "chart-line-dots", component: ChartLineDots },
		{ id: "chart-line-dots-custom", component: ChartLineDotsCustom },
		{ id: "chart-line-dots-colors", component: ChartLineDotsColors },
		{ id: "chart-line-label", component: ChartLineLabel },
		{ id: "chart-line-label-custom", component: ChartLineLabelCustom },
	],
	pie: [
		{ id: "chart-pie-simple", component: ChartPieSimple },
		// { id: "chart-pie-separator-none", component: ChartPieSeparatorNone },
		{ id: "chart-pie-label", component: ChartPieLabel },
		{ id: "chart-pie-label-custom", component: ChartPieLabelCustom },
		{ id: "chart-pie-label-list", component: ChartPieLabelList },
		{ id: "chart-pie-legend", component: ChartPieLegend },
		{ id: "chart-pie-donut", component: ChartPieDonut },
		{ id: "chart-pie-donut-active", component: ChartPieDonutActive },
		{ id: "chart-pie-donut-text", component: ChartPieDonutText },
		{ id: "chart-pie-stacked", component: ChartPieStacked },
		{ id: "chart-pie-interactive", component: ChartPieInteractive },
	],
	radar: [
		{ id: "chart-radar-default", component: ChartRadarDefault },
		{ id: "chart-radar-dots", component: ChartRadarDots },
		{ id: "chart-radar-lines-only", component: ChartRadarLinesOnly },
		{ id: "chart-radar-label-custom", component: ChartRadarLabelCustom },
		{ id: "chart-radar-grid-custom", component: ChartRadarGridCustom },
		{ id: "chart-radar-grid-none", component: ChartRadarGridNone },
		{ id: "chart-radar-grid-circle", component: ChartRadarGridCircle },
		{
			id: "chart-radar-grid-circle-no-lines",
			component: ChartRadarGridCircleNoLines,
		},
		{ id: "chart-radar-grid-circle-fill", component: ChartRadarGridCircleFill },
		{ id: "chart-radar-grid-fill", component: ChartRadarGridFill },
		{ id: "chart-radar-multiple", component: ChartRadarMultiple },
		{ id: "chart-radar-legend", component: ChartRadarLegend },
		{ id: "chart-radar-icons", component: ChartRadarIcons },
		{ id: "chart-radar-radius", component: ChartRadarRadius },
	],
	radial: [
		{ id: "chart-radial-simple", component: ChartRadialSimple },
		{ id: "chart-radial-label", component: ChartRadialLabel },
		// { id: "chart-radial-grid", component: ChartRadialGrid },
		{ id: "chart-radial-text", component: ChartRadialText },
		{ id: "chart-radial-shape", component: ChartRadialShape },
		{ id: "chart-radial-stacked", component: ChartRadialStacked },
	],
	tooltip: [
		{ id: "chart-tooltip-default", component: ChartTooltipDefault },
		{
			id: "chart-tooltip-indicator-line",
			component: ChartTooltipIndicatorLine,
		},
		{
			id: "chart-tooltip-indicator-none",
			component: ChartTooltipIndicatorNone,
		},
		{ id: "chart-tooltip-label-custom", component: ChartTooltipLabelCustom },
		{
			id: "chart-tooltip-label-formatter",
			component: ChartTooltipLabelFormatter,
		},
		{ id: "chart-tooltip-label-none", component: ChartTooltipLabelNone },
		{ id: "chart-tooltip-formatter", component: ChartTooltipFormatter },
		{ id: "chart-tooltip-icons", component: ChartTooltipIcons },
		{ id: "chart-tooltip-advanced", component: ChartTooltipAdvanced },
	],
};
