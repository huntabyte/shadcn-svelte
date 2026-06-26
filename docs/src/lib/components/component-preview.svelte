<script lang="ts">
	import type { Component } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import ComponentPreviewTabs from "./component-preview-tabs.svelte";

	let {
		name,
		type = "example",
		class: className,
		previewClassName,
		align = "center",
		hideCode = false,
		direction = "ltr",
		caption,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		name: string;
		align?: "center" | "start" | "end";
		caption?: string;
		description?: string;
		direction?: "ltr" | "rtl";
		hideCode?: boolean;
		previewClassName?: string;
		type?: "block" | "component" | "example";
		component?: Component;
	} = $props();
</script>

{#if type === "block"}
	{#snippet BlockPreview()}
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
	{/snippet}

	{#if caption}
		<figure class="flex flex-col gap-4">
			{@render BlockPreview()}
			<figcaption class="text-muted-foreground text-center text-sm">
				{caption}
			</figcaption>
		</figure>
	{:else}
		{@render BlockPreview()}
	{/if}
{:else if type === "component" || type === "example"}
	{#snippet Preview()}
		<ComponentPreviewTabs
			{name}
			class={className}
			{align}
			{hideCode}
			{previewClassName}
			{direction}
			{...restProps}
		/>
	{/snippet}

	{#if caption}
		<figure data-hide-code={hideCode} class="flex flex-col data-[hide-code=true]:gap-4">
			{@render Preview()}
			<figcaption
				class="text-muted-foreground -mt-8 text-center text-sm data-[hide-code=true]:mt-0"
			>
				{caption}
			</figcaption>
		</figure>
	{:else}
		{@render Preview()}
	{/if}
{/if}
