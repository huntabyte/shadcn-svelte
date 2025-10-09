<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="card"
	class={cn(
		"flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
