<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import AssetTable from "./components/asset-table.svelte";
	import FilterLibrary from "./components/filter-library.svelte";
	import PreviewHeader from "./components/preview-header.svelte";
</script>

<div
	class="preview theme-taupe bg-muted ring-foreground/5 @container/preview w-full flex-1 pt-4 font-sans ring-1 [--gap:--spacing(4)] sm:pt-0 md:[--gap:--spacing(6)] xl:[--gap:--spacing(8)] 2xl:py-8 **:[.container]:px-(--gap)"
>
	<PreviewHeader />
	<Separator class="hidden sm:block" />
	<div
		class="container grid grid-cols-1 items-start gap-(--gap) py-(--gap) xl:grid-cols-[minmax(0,1fr)_320px]"
	>
		<AssetTable />
		<FilterLibrary />
	</div>
</div>
