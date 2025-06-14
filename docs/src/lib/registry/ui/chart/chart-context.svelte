<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { setChartContext, type ChartConfig } from "./chart-utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	interface Props extends HTMLAttributes<HTMLElement> {
		config: ChartConfig;
		children: Snippet;
		class?: string;
	}

	let { config, children, class: className, ...restProps }: Props = $props();

	setChartContext({
		get config() {
			return config;
		},
	});
</script>

<div class={cn(className)} {...restProps}>
	{@render children()}
</div>
