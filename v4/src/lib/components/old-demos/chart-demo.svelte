<script lang="ts">
	import ChartAreaDefault from "$lib/registry/charts-old/chart-area-default.svelte";
	import ChartBarMultiple from "$lib/registry/charts-old/chart-bar-multiple.svelte";
	import ChartLineDefault from "$lib/registry/charts-old/chart-line-default.svelte";
	import ChartBarMixed from "$lib/registry/charts-old/chart-bar-mixed.svelte";
</script>

<div
	class="@2xl:grid-cols-2 @6xl:grid-cols-3 grid w-full max-w-screen-2xl gap-4 *:data-[slot=card]:flex-1"
>
	<ChartAreaDefault />
	<ChartBarMultiple />
	<ChartBarMixed />
	<div class="@6xl:hidden">
		<ChartLineDefault />
	</div>
</div>
