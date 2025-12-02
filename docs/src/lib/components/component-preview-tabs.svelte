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
		<p class="text-muted-foreground text-sm">
			Component
			<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
				{name}
			</code>
			not found in registry.
		</p>
	{/if}
{/snippet}

<div class={cn("group relative mb-12 mt-4 flex flex-col gap-2", className)} {...restProps}>
	<Tabs.Root class="relative me-auto w-full" bind:value>
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
	<div
		data-tab={value}
		class="data-[tab=code]:border-code relative min-h-[450px] rounded-lg border md:-mx-4"
	>
		<div
			data-slot="preview"
			data-active={value === "preview"}
			class="hidden data-[active=true]:block"
			data-llm-ignore
		>
			<div
				data-align={align}
				class="preview flex min-h-[450px] w-full justify-center p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center"
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
			class="**:[figure]:!m-0 **:[pre]:h-[450px] absolute inset-0 hidden overflow-hidden data-[active=true]:block"
		>
			{@render children?.()}
		</div>
	</div>
</div>
