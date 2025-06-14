<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useChart } from "./chart-utils.js";
	import type { Snippet } from "svelte";

	interface LegendItem {
		key: string;
		label: string;
		color: string;
	}

	interface Props {
		items?: LegendItem[];
		children?: Snippet<[{ items: LegendItem[] }]>;
		class?: string;
	}

	let { items = [], children, class: className, ...restProps }: Props = $props();

	const { config } = useChart();

	// Convert config to legend items if no items provided
	const legendItems = $derived.by(() => {
		if (items.length > 0) {
			return items;
		}

		// Generate from config
		return Object.entries(config)
			.filter(([_, value]) => value.label && value.color)
			.map(([key, value]) => ({
				key,
				label: value.label!,
				color: value.color!,
			}));
	});
</script>

{#if children}
	{@render children({ items: legendItems })}
{:else}
	<div class={cn("flex flex-wrap justify-center gap-2 px-4", className)} {...restProps}>
		{#each legendItems as item}
			<div class="flex items-center gap-1.5 text-xs">
				<div
					class="size-2.5 flex-shrink-0 rounded-[2px]"
					style="background-color: {item.color}"
				></div>
				<span class="text-muted-foreground whitespace-nowrap">
					{item.label}
				</span>
			</div>
		{/each}
	</div>
{/if}
