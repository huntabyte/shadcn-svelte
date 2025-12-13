<script lang="ts">
	import type { Component } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import ComponentPreviewTabs from "./component-preview-tabs.svelte";

	let {
		name,
		type = "example",
		class: className,
		align = "center",
		hideCode = false,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		name: string;
		align?: "center" | "start" | "end";
		description?: string;
		hideCode?: boolean;
		type?: "block" | "component" | "example";
		component?: Component;
	} = $props();
</script>

{#if type === "block"}
	<div
		class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-4"
		data-llm-ignore
	>
		<img
			src="/img/registry/{name}-light.png"
			alt={name}
			width={1440}
			height={900}
			class="bg-background absolute start-0 top-0 z-20 w-[970px] max-w-none sm:w-7xl md:hidden dark:hidden md:dark:hidden"
		/>
		<img
			src="/img/registry/{name}-dark.png"
			alt={name}
			width={1440}
			height={900}
			class="bg-background absolute start-0 top-0 z-20 hidden w-[970px] max-w-none sm:w-7xl md:hidden dark:block md:dark:hidden"
		/>
		<div class="bg-background absolute inset-0 hidden w-[1600px] md:block">
			<iframe src="/view/{name}" class="size-full" title={name}></iframe>
		</div>
	</div>
{:else if type === "component" || type === "example"}
	<ComponentPreviewTabs {name} class={className} {align} {hideCode} {...restProps} />
{/if}
