<script lang="ts">
	import ComponentPreviewTabs from "./component-preview-tabs.svelte";
	import type { PresetConfig } from "shadcn-svelte/preset";
	import type { Component } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		name,
		type = "example",
		class: className,
		align = "center",
		hideCode = false,
		previewClassName,
		previewStyle,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		name: string;
		align?: "center" | "start" | "end";
		description?: string;
		hideCode?: boolean;
		previewClassName?: string;
		previewStyle?: PresetConfig["style"];
		type?: "block" | "component" | "example";
		component?: Component;
	} = $props();
</script>

{#if type === "block"}
	<div
		data-not-typeset
		class="relative mt-6 aspect-[4/2.5] w-full overflow-hidden rounded-2xl border md:-mx-1"
		data-llm-ignore
	>
		<img
			src="/img/registry/{name}-light.png"
			alt={name}
			width={1440}
			height={900}
			class="absolute top-0 left-0 z-20 h-full w-[1600px] max-w-none bg-background object-cover object-left-top md:hidden dark:hidden md:dark:hidden"
		/>
		<img
			src="/img/registry/{name}-dark.png"
			alt={name}
			width={1440}
			height={900}
			class="absolute top-0 left-0 z-20 hidden h-full w-[1600px] max-w-none bg-background object-cover object-left-top md:hidden dark:block md:dark:hidden"
		/>
		<div class="absolute inset-0 hidden w-[1600px] bg-background md:block">
			<iframe src="/view/{name}" class="size-full" title={name}></iframe>
		</div>
	</div>
{:else if type === "component" || type === "example"}
	<ComponentPreviewTabs
		{name}
		class={className}
		{align}
		{hideCode}
		{previewClassName}
		{previewStyle}
		{...restProps}
	/>
{/if}
