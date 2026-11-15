<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = {
		title?: string;
		containerClass?: string;
	};
	let {
		title,
		containerClass,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & Props = $props();
</script>

<div
	data-slot="example"
	class={cn(
		"mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none",
		containerClass
	)}
	{...restProps}
>
	{#if title}
		<div class="px-1.5 py-2 text-xs font-medium text-muted-foreground">
			{title}
		</div>
	{/if}
	<div
		data-slot="example-content"
		class={cn(
			"flex min-w-0 flex-1 flex-col items-start gap-6 rounded-xl bg-card p-12 text-foreground *:[div:not([class*='w-'])]:w-full",
			className
		)}
	>
		{@render children?.()}
	</div>
</div>
