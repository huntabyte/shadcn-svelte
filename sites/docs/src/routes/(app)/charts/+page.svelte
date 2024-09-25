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
				<ChartDisplay name="chart-area-stacked">
					<Charts.ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-bar-multiple">
					<Charts.ChartBarMultiple />
				</ChartDisplay>
				<ChartDisplay name="chart-pie-donut-text">
					<Charts.ChartPieDonutText />
				</ChartDisplay>
			</div>
			<Separator />
			<div
				id="area-chart"
				class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
			>
				<ChartDisplay name="chart-area-default">
					<Charts.ChartAreaDefault />
				</ChartDisplay>
				<ChartDisplay name="chart-area-linear">
					<Charts.ChartAreaLinear />
				</ChartDisplay>
				<ChartDisplay name="chart-area-step">
					<Charts.ChartAreaStep />
				</ChartDisplay>
				<ChartDisplay name="chart-area-stacked">
					<Charts.ChartAreaStacked />
				</ChartDisplay>
				<ChartDisplay name="chart-area-stacked-expand">
					<Charts.ChartAreaStackedExpand />
				</ChartDisplay>
				<ChartDisplay name="chart-area-legend">
					<Charts.ChartAreaLegend />
				</ChartDisplay>
				<ChartDisplay name="chart-area-icons">
					<Charts.ChartAreaIcons />
				</ChartDisplay>
				<ChartDisplay name="chart-area-gradient">
					<Charts.ChartAreaGradient />
				</ChartDisplay>
				<ChartDisplay name="chart-area-axes">
					<Charts.ChartAreaAxes />
				</ChartDisplay>
			</div>
		</div>
	</div>
</div>
