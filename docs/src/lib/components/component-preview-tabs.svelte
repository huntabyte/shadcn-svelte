<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		previewClassName,
		align = "center",
		component,
		example,
		hideCode = false,
		integratedCode = false,
		children,
		name,
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		align?: "center" | "start" | "end";
		hideCode?: boolean;
		integratedCode?: boolean;
		example?: Snippet;
		component?: Component;
		name: string;
		previewClassName?: string;
	} = $props();

	let isCodeVisible = $state(false);
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
	data-integrated-code={integratedCode}
	class={cn(
		"group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border",
		className
	)}
	{...restProps}
>
	<div>
		<div
			data-slot="preview"
			class="preview flex w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
			data-llm-ignore
		>
			<div
				data-align={align}
				class={cn(
					"preview flex min-h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
					previewClassName
				)}
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
				data-code-visible={isCodeVisible}
				class="relative overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t **:data-[slot=copy-button]:hidden data-[code-visible=true]:**:data-[slot=copy-button]:flex [&_pre]:max-h-72"
			>
				{#if isCodeVisible}
					{@render children?.()}
				{:else}
					<div class="relative max-h-28 overflow-hidden">
						{@render children?.()}
						<div class="absolute inset-0 flex items-center justify-center pb-4">
							<div
								class="from-code via-code/60 absolute inset-0 bg-linear-to-t to-transparent"
							></div>
							<Button
								type="button"
								size="sm"
								variant="outline"
								class="bg-background text-foreground hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted relative z-10 rounded-lg shadow-none"
								onclick={() => {
									isCodeVisible = true;
								}}
							>
								View Code
							</Button>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
