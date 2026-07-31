<script lang="ts">
	import ComponentPreviewTabs from "./component-preview-tabs.svelte";
	import type { Component } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

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
		class="relative mt-6 aspect-[4/2.5] w-full overflow-hidden rounded-2xl border md:-mx-1"
		data-llm-ignore
	>
		<img
			src="/img/registry/{name}-light.png"
			alt={name}
			width={1440}
			height={900}
			class="absolute start-0 top-0 z-20 w-[970px] max-w-none bg-background sm:w-7xl md:hidden dark:hidden md:dark:hidden"
		/>
		<img
			src="/img/registry/{name}-dark.png"
			alt={name}
			width={1440}
			height={900}
			class="absolute start-0 top-0 z-20 hidden w-[970px] max-w-none bg-background sm:w-7xl md:hidden dark:block md:dark:hidden"
		/>
		<div class="absolute inset-0 hidden w-[1600px] bg-background md:block">
			<iframe src="/view/{name}" class="size-full" title={name}></iframe>
		</div>
	</div>
{:else if type === "component" || type === "example"}
	<ComponentPreviewTabs {name} class={className} {align} {hideCode} {...restProps} />
{/if}
