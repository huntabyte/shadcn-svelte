<script lang="ts">
	import ComponentWrapper from "$lib/components/component-wrapper.svelte";
	import * as Charts from "./charts.js";
	import AlertCircle from "@lucide/svelte/icons/alert-circle";
</script>

<div class="flex flex-col gap-4 p-4">
	<div
		class="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200"
	>
		<AlertCircle class="h-5 w-5" />
		<div class="flex-1">
			<p class="font-medium">Experimental Feature</p>
			<p class="text-sm">
				Charts are a work in progress and still require some features in the underlying
				library, LayerChart. Monitor progress in <a
					href="https://github.com/techniq/layerchart/pull/458"
					class="underline hover:text-yellow-900 dark:hover:text-yellow-100">PR #458</a
				>.
			</p>
		</div>
	</div>

	<div class="grid flex-1 grid-cols-3 items-start gap-4 2xl:grid-cols-4">
		{#each Object.entries(Charts).sort() as [key, Component] (key)}
			<ComponentWrapper
				name={key}
				class="**:data-[slot=card]:w-full w-auto data-[name=chartareainteractive]:col-span-3 data-[name=chartbarinteractive]:col-span-3 data-[name=chartlineinteractive]:col-span-3"
			>
				<Component />
			</ComponentWrapper>
		{/each}
	</div>
</div>
