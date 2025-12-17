<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	type Props = {
		title: string;
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
		"mx-auto flex w-full min-w-0 max-w-lg flex-col gap-1 self-stretch lg:max-w-none",
		containerClass
	)}
	{...restProps}
>
	<div class="text-muted-foreground px-1.5 py-2 text-xs font-medium">
		{title}
	</div>
	<div
		data-slot="example-content"
		class={cn(
			"bg-background text-foreground *:[div:not([class*='w-'])]:w-full flex min-w-0 flex-1 flex-col items-start gap-6 border border-dashed p-4 sm:p-6",
			className
		)}
	>
		{@render children?.()}
	</div>
</div>