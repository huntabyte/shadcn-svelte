<script lang="ts">
	import ChartDisplay from "$lib/components/chart-display.svelte";
	import { cn } from "$lib/utils.js";
	import { charts } from "../charts.js";

	let { data } = $props();

	const chartList = $derived(charts[data.type]);
</script>

<div class="grid flex-1 gap-12 lg:gap-24">
	<h2 class="sr-only">
		{data.type.charAt(0).toUpperCase() + data.type.slice(1)} Charts
	</h2>
	<div
		class="grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
	>
		{#each { length: 12 } as _, index (index)}
			{@const chart = chartList[index]}
			{#if chart}
				<ChartDisplay
					name={chart.id}
					class={cn(chart.fullWidth && "md:col-span-2 lg:col-span-3")}
					chartData={data.charts}
				>
					<chart.component />
				</ChartDisplay>
			{:else}
				<div
					class="hidden aspect-square w-full rounded-lg border border-dashed xl:block"
				></div>
			{/if}
		{/each}
	</div>
</div>
