<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import Button from "$lib/registry/ui/button/button.svelte";

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

	let isMobileCodeVisible = $state(false);
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
	class={cn(
		"group relative mt-4 mb-12 flex flex-col gap-2 overflow-hidden rounded-xl border",
		className
	)}
	{...restProps}
>
	<div data-slot="preview">
		<div
			data-align={align}
			data-chromeless={chromeLessOnMobile}
			class={cn(
				"preview relative flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0",
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
				data-mobile-code-visible={isMobileCodeVisible}
				class="relative overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t [&_[data-rehype-pretty-code-figure]]:!m-0 [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t data-[mobile-code-visible=false]:[&_[data-slot=copy-button]]:hidden [&_pre]:max-h-72"
			>
				{#if isMobileCodeVisible}
					{@render children?.()}
				{:else}
					<div class="relative h-25">
						{@render children?.()}
						<div class="absolute inset-0 flex items-center justify-center pb-4">
							<div
								class="absolute inset-0"
								style="background: linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent);"
							></div>
							<Button
								type="button"
								size="sm"
								variant="outline"
								class="bg-background text-foreground dark:bg-background dark:text-foreground hover:bg-muted dark:hover:bg-muted relative z-10 rounded-lg shadow-none"
								onclick={() => (isMobileCodeVisible = true)}
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
