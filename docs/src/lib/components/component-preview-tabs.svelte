<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";

	let {
		class: className,
		previewClassName,
		align = "center",
		component,
		example,
		children,
		name,
		hideCode = false,
		chromeLessOnMobile = false,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		align?: "center" | "start" | "end";
		previewClassName?: string;
		hideCode?: boolean;
		chromeLessOnMobile?: boolean;
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
		<p class="text-muted-foreground text-sm">
			Component
			<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{name}
			</code>
			not found in registry.
		</p>
	{/if}
{/snippet}

<div
	data-slot="component-preview"
	class={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
	{...restProps}
>
	<Tabs.Root class="relative mr-auto w-full" bind:value>
		<div class="flex items-center justify-between" data-llm-ignore>
			{#if !hideCode}
				<Tabs.List class="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
					<Tabs.Trigger
						value="preview"
						class="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
					>
						Preview
					</Tabs.Trigger>
					<Tabs.Trigger
						value="code"
						class="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
					>
						Code
					</Tabs.Trigger>
				</Tabs.List>
			{/if}
		</div>
	</Tabs.Root>
	<div class="overflow-hidden rounded-xl border">
		<div
			data-slot="preview"
			data-active={hideCode || value === "preview"}
			data-align={align}
			data-chromeless={chromeLessOnMobile}
			class={cn(
				"preview relative hidden h-72 w-full justify-center p-10 data-[active=true]:flex data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0",
				previewClassName
			)}
			data-llm-ignore
		>
			{#if example}
				{@render example()}
			{:else}
				{@render ExampleFallback()}
			{/if}
		</div>
		{#if !hideCode}
			<div
				data-slot="code"
				data-active={value === "code"}
				class="relative hidden overflow-hidden data-[active=true]:block **:data-[slot=copy-button]:right-4 [&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_pre]:max-h-72"
			>
				{@render children?.()}
			</div>
		{/if}
	</div>
</div>
