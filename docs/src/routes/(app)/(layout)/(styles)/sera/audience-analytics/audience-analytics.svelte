<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import Demographics from "./components/demographics.svelte";
	import MetricsGrid from "./components/metrics-grid.svelte";
	import PreviewHeader from "./components/preview-header.svelte";
	import TopEditorial from "./components/top-editorial.svelte";
	import TrafficOverviewDeferred from "./components/traffic-overview-deferred.svelte";
</script>

<div
	class="preview theme-taupe bg-muted ring-foreground/5 @container/preview w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8 **:[.container]:px-(--gap)"
>
	<PreviewHeader />
	<Separator class="hidden sm:block" />
	<div class="container grid grid-cols-12 gap-(--gap) py-(--gap)">
		<MetricsGrid />
		<TrafficOverviewDeferred class="col-span-full md:col-span-6 lg:col-span-8" />
		<Demographics class="col-span-full md:col-span-6 lg:col-span-4" />
		<TopEditorial class="col-span-full" />
	</div>
</div>
