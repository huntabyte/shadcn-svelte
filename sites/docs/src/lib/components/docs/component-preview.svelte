<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import * as Icon from "./icons/index.js";
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import { Index } from "$lib/../__registry__/index.js";
	import { config } from "$lib/stores/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	import StyleSwitcher from "$lib/components/docs/style-switcher.svelte";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";

	let {
		name,
		align = "center",
		class: className,
		example,
		children,
		form,
		style,
		...restProps
	}: Omit<PrimitiveDivAttributes, "style" | "form"> & {
		name: keyof (typeof Index)["default"];
		align?: "center" | "start" | "end";
		style?: string;
		form?: unknown;
		example?: Snippet;
	} = $props();

	let component: Promise<Component> = $state() as Promise<Component>;

	$effect(() => {
		component = Index[$config.style][name]?.component() as Promise<Component>;
	});
</script>

{#snippet ExampleFallback()}
	{#if component}
		{#await component}
			<div class="text-muted-foreground flex items-center text-sm">
				<Icon.Spinner class="mr-2 size-4 animate-spin" />
				Loading...
			</div>
		{:then Component}
			<Component {form} />
		{:catch}
			<p class="text-muted-foreground text-sm">
				Component
				<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
					{name}
				</code>
				not found in registry.
			</p>
		{/await}
	{/if}
{/snippet}

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...restProps}>
	<Tabs.Root value="preview" class="relative mr-auto w-full">
		<div class="flex items-center justify-between pb-3">
			<Tabs.List class="w-full justify-start rounded-none border-b bg-transparent p-0">
				<Tabs.Trigger
					value="preview"
					class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
				>
					Preview
				</Tabs.Trigger>
				<Tabs.Trigger
					value="code"
					class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
				>
					Code
				</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="preview" class="relative rounded-md border">
			<div class="flex items-center justify-between p-4">
				<StyleSwitcher />
			</div>
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
		</Tabs.Content>
		<Tabs.Content value="code">
			<ThemeWrapper defaultTheme="zinc">
				<div
					class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
				>
					{@render children?.()}
				</div>
			</ThemeWrapper>
		</Tabs.Content>
	</Tabs.Root>
</div>
