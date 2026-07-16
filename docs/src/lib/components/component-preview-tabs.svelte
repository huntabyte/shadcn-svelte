<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		align = "center",
		component,
		example,
		children,
		name,
		hideCode = false,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		align?: "center" | "start" | "end";
		hideCode?: boolean;
		example?: Snippet;
		component?: Component;
		name: string;
	} = $props();

	let codeVisible = $state(false);
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
	class={cn(
		"group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-2xl border",
		className
	)}
	{...restProps}
>
	<div
		data-slot="preview"
		class="preview flex w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
		data-llm-ignore
	>
		<div
			data-align={align}
			class="preview flex min-h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
		>
			{#if example}
				{@render example()}
			{:else}
				{@render ExampleFallback()}
			{/if}
		</div>
	</div>
	{#if !hideCode}
		<div
			data-slot="code"
			data-code-visible={codeVisible}
			class="relative overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t data-[code-visible=false]:**:data-rehype-pretty-code-figure:max-h-22 data-[code-visible=false]:**:data-rehype-pretty-code-figure:overflow-hidden **:data-[slot=copy-button]:right-4 **:data-[slot=copy-button]:hidden data-[code-visible=true]:**:data-[slot=copy-button]:flex data-[code-visible=true]:[&_pre]:max-h-72"
		>
			{@render children?.()}
			{#if !codeVisible}
				<div class="absolute inset-0 flex items-center justify-center pb-4">
					<div
						class="absolute inset-0"
						style="background: linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)"
					></div>
					<Button
						type="button"
						size="sm"
						variant="outline"
						class="bg-background text-foreground hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted relative z-10 rounded-lg shadow-none"
						onclick={() => {
							codeVisible = true;
						}}
					>
						View Code
					</Button>
				</div>
			{/if}
		</div>
	{/if}
</div>
