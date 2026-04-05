<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HighlightedBlock } from "$lib/types/block.js";
	import ChartToolbar from "./chart-toolbar.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		name,
		class: className,
		children,
		chartData,
	}: HTMLAttributes<HTMLDivElement> & {
		name: string;
		chartData: HighlightedBlock[];
	} = $props();

	const chart = $derived(chartData.find((c) => c.name === name));
</script>

{#if chart}
	<div
		class={cn(
			"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl transition-all duration-200 ease-in-out hover:z-30",
			className
		)}
	>
		<ChartToolbar {chart} class="relative z-20 flex justify-end px-3 py-2.5">
			{@render children?.()}
		</ChartToolbar>
		<div class="bg-background relative z-10 overflow-hidden rounded-xl">
			{@render children?.()}
		</div>
	</div>
{/if}
