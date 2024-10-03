<script lang="ts">
	import { ChartDisplay, ChartsNav } from "$lib/components/docs/index.js";
	import * as Charts from "$lib/registry/new-york/block/charts/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
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
					<Charts.ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-multiple">
					<Charts.ChartBarMultiple />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-text" class="[&_[data-chart]]:xl:max-h-[243px]">
					<Charts.ChartPieDonutText />
				</ChartDisplay>
			</div>
			<Separator />
			<div
				id="area-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Done" name="chart-area-default">
					<Charts.ChartAreaDefault />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-linear">
					<Charts.ChartAreaLinear />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-step">
					<Charts.ChartAreaStep />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-stacked">
					<Charts.ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-area-stacked-expand">
					<Charts.ChartAreaStackedExpand />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-area-legend">
					<Charts.ChartAreaLegend />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-area-icons">
					<Charts.ChartAreaIcons />
				</ChartDisplay>
				<ChartDisplay name="chart-area-gradient">
					<Charts.ChartAreaGradient />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-area-axes">
					<Charts.ChartAreaAxes />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-area-interactive">
						<Charts.ChartAreaInteractive />
					</ChartDisplay>
				</div>
			</div>
			<Separator />
			<div
				id="bar-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Done" name="chart-bar-default">
					<Charts.ChartBarDefault />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-horizontal">
					<Charts.ChartBarHorizontal />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-multiple">
					<Charts.ChartBarMultiple />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-bar-label">
					<Charts.ChartBarLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-bar-label-custom">
					<Charts.ChartBarLabelCustom />
				</ChartDisplay>
				<ChartDisplay status="Blocked (Internal)" name="chart-bar-mixed">
					<Charts.ChartBarMixed />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-bar-stacked">
					<Charts.ChartBarStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-bar-active">
					<Charts.ChartBarActive />
				</ChartDisplay>
				<ChartDisplay status="Blocked (External)" name="chart-bar-negative">
					<Charts.ChartBarNegative />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-bar-interactive">
						<Charts.ChartBarInteractive />
					</ChartDisplay>
				</div>
			</div>
			<Separator />
			<div
				id="line-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Done" name="chart-line-default">
					<Charts.ChartLineDefault />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-linear">
					<Charts.ChartLineLinear />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-step">
					<Charts.ChartLineStep />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-multiple">
					<Charts.ChartLineMultiple />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-dots">
					<Charts.ChartLineDots />
				</ChartDisplay>
				<ChartDisplay name="chart-line-dots-custom">
					<Charts.ChartLineDotsCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-line-dots-colors">
					<Charts.ChartLineDotsColors />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-line-label">
					<Charts.ChartLineLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-line-label-custom">
					<Charts.ChartLineLabelCustom />
				</ChartDisplay>
				<div class="md:col-span-2 lg:col-span-3">
					<ChartDisplay name="chart-line-interactive">
						<Charts.ChartLineInteractive />
					</ChartDisplay>
				</div>
			</div>
			<Separator />
			<div
				id="pie-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="In Progress" name="chart-pie-simple">
					<Charts.ChartPieSimple />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-separator-none">
					<Charts.ChartPieSeparatorNone />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label">
					<Charts.ChartPieLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label-custom">
					<Charts.ChartPieLabelCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-label-list">
					<Charts.ChartPieLabelList />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-legend">
					<Charts.ChartPieLegend />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut">
					<Charts.ChartPieDonut />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-active">
					<Charts.ChartPieDonutActive />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-text">
					<Charts.ChartPieDonutText />
				</ChartDisplay>
				<ChartDisplay status="Blocked (Internal)" name="chart-pie-stacked">
					<Charts.ChartPieStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-interactive">
					<Charts.ChartPieInteractive />
				</ChartDisplay>
			</div>
			<Separator />
			<div
				id="radar-chart"
				class="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="Needs Parity" name="chart-radar-default">
					<Charts.ChartRadarDefault />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-dots">
					<Charts.ChartRadarDots />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-multiple">
					<Charts.ChartRadarMultiple />
				</ChartDisplay>
				<ChartDisplay status="Needs Parity" name="chart-radar-lines-only">
					<Charts.ChartRadarLinesOnly />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-label-custom">
					<Charts.ChartRadarLabelCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-radius">
					<Charts.ChartRadarRadius />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-custom">
					<Charts.ChartRadarGridCustom />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-fill">
					<Charts.ChartRadarGridFill />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-none">
					<Charts.ChartRadarGridNone />
				</ChartDisplay>
				<ChartDisplay status="Done" name="chart-radar-grid-circle">
					<Charts.ChartRadarGridCircle />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-circle-no-lines">
					<Charts.ChartRadarGridCircleNoLines />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-grid-circle-fill">
					<Charts.ChartRadarGridCircleFill />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-legend">
					<Charts.ChartRadarLegend />
				</ChartDisplay>
				<ChartDisplay name="chart-radar-icons">
					<Charts.ChartRadarIcons />
				</ChartDisplay>
			</div>
			<Separator />
			<div
				id="radial-chart"
				class="grid flex-1 scroll-mt-20 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay status="In Progress" name="chart-radial-simple">
					<Charts.ChartRadialSimple />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-label">
					<Charts.ChartRadialLabel />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-grid">
					<Charts.ChartRadialGrid />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-text">
					<Charts.ChartRadialText />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-shape">
					<Charts.ChartRadialShape />
				</ChartDisplay>
				<ChartDisplay name="chart-radial-stacked">
					<Charts.ChartRadialStacked />
				</ChartDisplay>
			</div>
			<Separator />
		</div>
	</div>
</div>
