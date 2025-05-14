<script lang="ts" module>
	import { registryItemSchema } from "@shadcn-svelte/registry";
	import * as v from "valibot";
	export type Chart = v.InferOutput<typeof registryItemSchema> & {
		highlightedCode: Promise<string>;
	};
</script>

<script lang="ts">
	import { getRegistryItem } from "$lib/registry-utils.js";
	import { cn } from "$lib/utils.js";
	import ChartToolbar from "./chart-toolbar.svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { highlightCode } from "$lib/blocks.js";

	let {
		name,
		class: className,
		children,
	}: HTMLAttributes<HTMLDivElement> & { name: string } = $props();
</script>

{#await getRegistryItem(name)}
	<div>Loading...</div>
{:then chart}
	{#if chart}
		<div
			class={cn(
				"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30",
				className
			)}
		>
			<ChartToolbar
				chart={{
					...chart,
					highlightedCode: highlightCode(chart.files?.[0]?.content ?? ""),
				}}
				class="bg-card text-card-foreground relative z-20 flex justify-end border-b px-3 py-2.5"
			>
				{@render children?.()}
			</ChartToolbar>
			<div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
				{@render children?.()}
			</div>
		</div>
	{/if}
{:catch}
	<div>Error loading the chart</div>
{/await}
