<script lang="ts">
	import ChartDisplay from "$lib/components/docs/chart-display.svelte";
	import ChartsNav from "$lib/components/docs/charts-nav.svelte";
	import ChartAreaAxes from "$lib/registry/block/chart-area-axes.svelte";
	import ChartAreaDefault from "$lib/registry/block/chart-area-default.svelte";
	import ChartAreaGradient from "$lib/registry/block/chart-area-gradient.svelte";
	import ChartAreaIcons from "$lib/registry/block/chart-area-icons.svelte";
	import ChartAreaInteractive from "$lib/registry/block/chart-area-interactive.svelte";
	import ChartAreaLegend from "$lib/registry/block/chart-area-legend.svelte";
	import ChartAreaLinear from "$lib/registry/block/chart-area-linear.svelte";
	import ChartAreaStackedExpand from "$lib/registry/block/chart-area-stacked-expand.svelte";
	import ChartAreaStacked from "$lib/registry/block/chart-area-stacked.svelte";
	import ChartAreaStep from "$lib/registry/block/chart-area-step.svelte";
	import ChartBarActive from "$lib/registry/block/chart-bar-active.svelte";
	import ChartBarDefault from "$lib/registry/block/chart-bar-default.svelte";
	import ChartBarHorizontal from "$lib/registry/block/chart-bar-horizontal.svelte";
	import ChartBarInteractive from "$lib/registry/block/chart-bar-interactive.svelte";
	import ChartBarLabelCustom from "$lib/registry/block/chart-bar-label-custom.svelte";
	import ChartBarLabel from "$lib/registry/block/chart-bar-label.svelte";
	import ChartBarMixed from "$lib/registry/block/chart-bar-mixed.svelte";
	import ChartBarMultiple from "$lib/registry/block/chart-bar-multiple.svelte";
	import ChartBarNegative from "$lib/registry/block/chart-bar-negative.svelte";
	import ChartBarStacked from "$lib/registry/block/chart-bar-stacked.svelte";
	import ChartLineDefault from "$lib/registry/block/chart-line-default.svelte";
	import ChartLineDotsColors from "$lib/registry/block/chart-line-dots-colors.svelte";
	import ChartLineDotsCustom from "$lib/registry/block/chart-line-dots-custom.svelte";
	import ChartLineDots from "$lib/registry/block/chart-line-dots.svelte";
	import ChartLineInteractive from "$lib/registry/block/chart-line-interactive.svelte";
	import ChartLineLabelCustom from "$lib/registry/block/chart-line-label-custom.svelte";
	import ChartLineLabel from "$lib/registry/block/chart-line-label.svelte";
	import ChartLineLinear from "$lib/registry/block/chart-line-linear.svelte";
	import ChartLineMultiple from "$lib/registry/block/chart-line-multiple.svelte";
	import ChartLineStep from "$lib/registry/block/chart-line-step.svelte";
	import ChartPieDonutActive from "$lib/registry/block/chart-pie-donut-active.svelte";
	import ChartPieDonutText from "$lib/registry/block/chart-pie-donut-text.svelte";
	import ChartPieDonut from "$lib/registry/block/chart-pie-donut.svelte";
	import ChartPieInteractive from "$lib/registry/block/chart-pie-interactive.svelte";
	import ChartPieLabelCustom from "$lib/registry/block/chart-pie-label-custom.svelte";
	import ChartPieLabelList from "$lib/registry/block/chart-pie-label-list.svelte";
	import ChartPieLabel from "$lib/registry/block/chart-pie-label.svelte";
	import ChartPieLegend from "$lib/registry/block/chart-pie-legend.svelte";
	import ChartPieSeparatorNone from "$lib/registry/block/chart-pie-separator-none.svelte";
	import ChartPieSimple from "$lib/registry/block/chart-pie-simple.svelte";
	import ChartPieStacked from "$lib/registry/block/chart-pie-stacked.svelte";
	import ChartRadarDefault from "$lib/registry/block/chart-radar-default.svelte";
	import ChartRadarDots from "$lib/registry/block/chart-radar-dots.svelte";
	import ChartRadarGridCircleFill from "$lib/registry/block/chart-radar-grid-circle-fill.svelte";
	import ChartRadarGridCircleNoLines from "$lib/registry/block/chart-radar-grid-circle-no-lines.svelte";
	import ChartRadarGridCircle from "$lib/registry/block/chart-radar-grid-circle.svelte";
	import ChartRadarGridCustom from "$lib/registry/block/chart-radar-grid-custom.svelte";
	import ChartRadarGridFill from "$lib/registry/block/chart-radar-grid-fill.svelte";
	import ChartRadarGridNone from "$lib/registry/block/chart-radar-grid-none.svelte";
	import ChartRadarIcons from "$lib/registry/block/chart-radar-icons.svelte";
	import ChartRadarLabelCustom from "$lib/registry/block/chart-radar-label-custom.svelte";
	import ChartRadarLegend from "$lib/registry/block/chart-radar-legend.svelte";
	import ChartRadarLinesOnly from "$lib/registry/block/chart-radar-lines-only.svelte";
	import ChartRadarMultiple from "$lib/registry/block/chart-radar-multiple.svelte";
	import ChartRadarRadius from "$lib/registry/block/chart-radar-radius.svelte";
	import ChartRadialGrid from "$lib/registry/block/chart-radial-grid.svelte";
	import ChartRadialLabel from "$lib/registry/block/chart-radial-label.svelte";
	import ChartRadialShape from "$lib/registry/block/chart-radial-shape.svelte";
	import ChartRadialSimple from "$lib/registry/block/chart-radial-simple.svelte";
	import ChartRadialStacked from "$lib/registry/block/chart-radial-stacked.svelte";
	import ChartRadialText from "$lib/registry/block/chart-radial-text.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
</script>

<div class="grid gap-4">
	<ChartsNav
		class="[&>a:first-child]:bg-muted [&>a:first-child]:text-primary [&>a:first-child]:font-medium"
	/>
	<!-- <ThemesStyle /> -->
	<div class="gap-6 md:flex md:flex-row-reverse md:items-start">
		<!-- <ThemesSwitcher
          themes={THEMES}
          class="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
        /> -->
		<div class="grid flex-1 gap-12">
			<h2 class="sr-only">Examples</h2>
			<div
				id="examples"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Done" name="chart-area-stacked">
					<ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-multiple">
					<ChartBarMultiple />
				</ChartDisplay>

				<ChartDisplay
					status="Needs Parity"
					name="chart-pie-donut-text"
					class="[&_[data-chart]]:xl:max-h-[243px]"
					description="Need more flexible text primitive. Notice how it is weird to try to center it in the middle of the pie with multiple lines."
				>
					<ChartPieDonutText />
				</ChartDisplay>
			</div>
			<Separator />
			<div
				id="area-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Done" name="chart-area-default">
					<ChartAreaDefault />
				</ChartDisplay>
				<!--
				<ChartDisplay status="Done" name="chart-area-linear">
					<ChartAreaLinear />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-step">
					<ChartAreaStep />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-stacked">
					<ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-stacked-expand">
					<ChartAreaStackedExpand />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-area-legend">
					<ChartAreaLegend />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-area-icons">
					<ChartAreaIcons />
				</ChartDisplay>
				<ChartDisplay name="chart-area-gradient">
					<ChartAreaGradient />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-area-axes">
					<ChartAreaAxes />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-area-interactive">
						<ChartAreaInteractive />
					</ChartDisplay>
				</div> -->
			</div>
			<Separator />
			<div
				id="bar-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<!-- <ChartDisplay status="Done" name="chart-bar-default">
					<ChartBarDefault />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-horizontal">
					<ChartBarHorizontal />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-multiple">
					<ChartBarMultiple />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-label">
					<ChartBarLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-bar-label-custom">
					<ChartBarLabelCustom />
				</ChartDisplay>
				<ChartDisplay status="Blocked (Internal)" name="chart-bar-mixed">
					<ChartBarMixed />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-bar-stacked">
					<ChartBarStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-bar-active" status="Done">
					<ChartBarActive />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-bar-negative">
					<ChartBarNegative />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-bar-interactive">
						<ChartBarInteractive />
					</ChartDisplay>
				</div> -->
			</div>
			<Separator />
			<div
				id="line-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<!-- <ChartDisplay status="Done" name="chart-line-default">
					<ChartLineDefault />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-linear">
					<ChartLineLinear />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-step">
					<ChartLineStep />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-multiple">
					<ChartLineMultiple />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-dots">
					<ChartLineDots />
				</ChartDisplay>
				<ChartDisplay name="chart-line-dots-custom">
					<ChartLineDotsCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-line-dots-colors">
					<ChartLineDotsColors />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-label">
					<ChartLineLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-line-label-custom">
					<ChartLineLabelCustom />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-line-interactive">
						<ChartLineInteractive />
					</ChartDisplay>
				</div> -->
			</div>
			<Separator />
			<div
				id="pie-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<!-- <ChartDisplay status="In Progress" name="chart-pie-simple">
					<ChartPieSimple />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-separator-none">
					<ChartPieSeparatorNone />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label">
					<ChartPieLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label-custom">
					<ChartPieLabelCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label-list">
					<ChartPieLabelList />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-legend">
					<ChartPieLegend />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut">
					<ChartPieDonut />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-active">
					<ChartPieDonutActive />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-text">
					<ChartPieDonutText />
				</ChartDisplay>
				<ChartDisplay status="Blocked (Internal)" name="chart-pie-stacked">
					<ChartPieStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-interactive">
					<ChartPieInteractive />
				</ChartDisplay> -->
			</div>
			<Separator />
			<div
				id="radar-chart"
				class="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
			>
				<!-- <ChartDisplay status="Needs Parity" name="chart-radar-default">
					<ChartRadarDefault />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-dots">
					<ChartRadarDots />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-multiple">
					<ChartRadarMultiple />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-lines-only">
					<ChartRadarLinesOnly />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-label-custom">
					<ChartRadarLabelCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-radius">
					<ChartRadarRadius />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-custom">
					<ChartRadarGridCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-fill">
					<ChartRadarGridFill />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-none">
					<ChartRadarGridNone />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-radar-grid-circle">
					<ChartRadarGridCircle />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-circle-no-lines">
					<ChartRadarGridCircleNoLines />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-circle-fill">
					<ChartRadarGridCircleFill />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-legend">
					<ChartRadarLegend />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-icons">
					<ChartRadarIcons />
				</ChartDisplay> -->
			</div>
			<Separator />
			<div
				id="radial-chart"
				class="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
			>
				<!-- <ChartDisplay status="In Progress" name="chart-radial-simple">
					<ChartRadialSimple />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-label">
					<ChartRadialLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-grid">
					<ChartRadialGrid />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-text">
					<ChartRadialText />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-shape">
					<ChartRadialShape />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-stacked">
					<ChartRadialStacked />
				</ChartDisplay> -->
			</div>
			<Separator />
		</div>
	</div>
</div>
