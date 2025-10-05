<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
	} = $props();

	const hasContent = $derived(!!children);
</script>

<div
	data-slot="field-separator"
	data-content={hasContent}
	class={cn(
		"relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
		className
	)}
	{...restProps}
>
	<Separator class="absolute inset-0 top-1/2" />
	{#if children}
		<span
			class="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
			data-slot="field-separator-content"
		>
			{@render children()}
		</span>
	{/if}
</div>
