<script lang="ts">
	import { cn } from "$lib/utils.js";
	import ChartCodeViewer from "./chart-code-viewer.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import AreaChartIcon from "@lucide/svelte/icons/area-chart";
	import BarChartBigIcon from "@lucide/svelte/icons/bar-chart-big";
	import HexagonIcon from "@lucide/svelte/icons/hexagon";
	import LineChartIcon from "@lucide/svelte/icons/line-chart";
	import MousePointer2Icon from "@lucide/svelte/icons/mouse-pointer-2";
	import PieChartIcon from "@lucide/svelte/icons/pie-chart";
	import RadarIcon from "@lucide/svelte/icons/radar";
	import ChartCopyButton from "./chart-copy-button.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { HighlightedBlock } from "../../routes/api/block/[block]/+server.js";

	let {
		chart,
		class: className,
		children,
	}: HTMLAttributes<HTMLDivElement> & { chart: HighlightedBlock } = $props();

	let code = $state("");

	$effect(() => {
		const file = chart?.files?.[0];
		if (!file) {
			code = "";
			return;
		}

		const highlighted = file?.highlightedContent ?? "";

		const pre = document.createElement("pre");
		pre.innerHTML = highlighted;
		code = pre.textContent ?? "";
	});
</script>

{#snippet ChartTitle(chart: HighlightedBlock)}
	{#if chart.name.includes("chart-line")}
		<LineChartIcon /> Line Chart
	{:else if chart.name.includes("chart-bar")}
		<BarChartBigIcon /> Bar Chart
	{:else if chart.name.includes("chart-pie")}
		<PieChartIcon /> Pie Chart
	{:else if chart.name.includes("chart-area")}
		<AreaChartIcon /> Area Chart
	{:else if chart.name.includes("chart-radar")}
		<HexagonIcon /> Radar Chart
	{:else if chart.name.includes("chart-radial")}
		<RadarIcon /> Radial Chart
	{:else if chart.name.includes("chart-tooltip")}
		<MousePointer2Icon /> Tooltip
	{:else}
		{chart.name}
	{/if}
{/snippet}

<div class={cn("flex items-center gap-2", className)}>
	<div
		class="text-muted-foreground flex items-center gap-1.5 ps-1 text-[13px] [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]"
	>
		{@render ChartTitle(chart)}
	</div>
	<div class="ms-auto flex items-center gap-2 [&>form]:flex">
		<ChartCopyButton
			{code}
			class="text-foreground hover:bg-muted dark:text-foreground h-6 w-6 rounded-[6px] bg-transparent shadow-none [&_svg]:h-3 [&_svg]:w-3"
		/>
		<Separator orientation="vertical" class="mx-0 hidden !h-4 md:flex" />
		<ChartCodeViewer {chart} {code}>{@render children?.()}</ChartCodeViewer>
	</div>
</div>
