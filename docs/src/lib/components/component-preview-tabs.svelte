<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		align = "center",
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
	class={cn("group relative mb-12 mt-4 flex flex-col gap-2 rounded-lg border", className)}
	{...restProps}
>
	<div>
		<div
			data-slot="preview"
			class="preview flex w-full justify-center data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center"
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
			class="**:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t overflow-hidden [&_pre]:max-h-[400px]"
		>
			{@render children?.()}
		</div>
	</div>
</div>
