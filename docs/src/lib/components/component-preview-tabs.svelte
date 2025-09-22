<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";

	let {
		class: className,
		align = "center",
		hideCode = false,
		component,
		example,
		children,
		name,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		align?: "center" | "start" | "end";
		hideCode?: boolean;
		example?: Snippet;
		component?: Component;
		name: string;
	} = $props();

	let value: "code" | "preview" = $state("preview");
</script>

{#snippet ExampleFallback()}
	{#if component}
		{@const Component = component}
		<Component />
	{:else}
		<p class="text-sm text-muted-foreground">
			Component
			<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{name}
			</code>
			not found in registry.
		</p>
	{/if}
{/snippet}

<div class={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)} {...restProps}>
	<Tabs.Root class="relative mr-auto w-full" bind:value>
		<div class="flex items-center justify-between">
			{#if !hideCode}
				<Tabs.List class="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
					<Tabs.Trigger
						value="preview"
						class="px-0 text-base text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
					>
						Preview
					</Tabs.Trigger>
					<Tabs.Trigger
						value="code"
						class="px-0 text-base text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
					>
						Code
					</Tabs.Trigger>
				</Tabs.List>
			{/if}
		</div>
	</Tabs.Root>
	<div data-tab={value} class="relative rounded-lg border data-[tab=code]:border-code md:-mx-4">
		<div
			data-slot="preview"
			data-active={value === "preview"}
			class="invisible data-[active=true]:visible"
		>
			<div
				data-align={align}
				class="preview flex h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
			>
				{#if example}
					{@render example()}
				{:else}
					{@render ExampleFallback()}
				{/if}
			</div>
		</div>
		<div
			data-slot="code"
			data-active={value === "code"}
			class="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:m-0! **:[pre]:h-[450px]"
		>
			{@render children?.()}
		</div>
	</div>
</div>
