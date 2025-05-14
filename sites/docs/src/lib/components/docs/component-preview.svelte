<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { Index } from "$lib/../__registry__/index.js";
	import * as DocTabs from "$lib/components/docs/doc-tabs/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";

	let {
		name,
		align = "center",
		class: className,
		example,
		children,
		form,
		style,
		component,
		hideCode = false,
		...restProps
	}: Omit<PrimitiveDivAttributes, "style" | "form"> & {
		name: keyof typeof Index;
		align?: "center" | "start" | "end";
		style?: string;
		form?: unknown;
		example?: Snippet;
		component?: Component;
		hideCode?: boolean;
	} = $props();
</script>

{#snippet ExampleFallback()}
	{#if component}
		{@const Component = component}
		<Component {form} />
	{:else}
		<p class="text-muted-foreground text-sm">
			Component
			<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{name}
			</code>
			not found in registry.
		</p>
	{/if}
{/snippet}

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...restProps}>
	<DocTabs.Root value="preview" class="relative mr-auto w-full">
		<div class="flex items-center justify-between pb-3">
			{#if !hideCode}
				<DocTabs.List class="w-full justify-start rounded-none border-b bg-transparent p-0">
					<DocTabs.Trigger
						value="preview"
						class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
					>
						Preview
					</DocTabs.Trigger>
					<DocTabs.Trigger
						value="code"
						class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
					>
						Code
					</DocTabs.Trigger>
				</DocTabs.List>
			{/if}
		</div>
		<DocTabs.Content value="preview" class="preview relative rounded-md border">
			<ThemeWrapper defaultTheme="zinc">
				<div
					class={cn(
						"preview flex min-h-[350px] w-full justify-center p-10",
						{
							"items-center": align === "center",
							"items-start": align === "start",
							"items-end": align === "end",
						},
						className
					)}
					{style}
				>
					{#if example}
						{@render example()}
					{:else}
						{@render ExampleFallback()}
					{/if}
				</div>
			</ThemeWrapper>
		</DocTabs.Content>
		<DocTabs.Content value="code">
			<ThemeWrapper defaultTheme="zinc">
				<div
					class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
				>
					{@render children?.()}
				</div>
			</ThemeWrapper>
		</DocTabs.Content>
	</DocTabs.Root>
</div>
